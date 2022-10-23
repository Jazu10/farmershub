const Order = require("../models/order");
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    });

    order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
    });

    res.status(200).json({
        success: true,
        order,
    });
});

// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email",
    );

    if (!order) {
        return next(new ErrorHandler("No Order found with this ID", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders,
    });
});

// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find().populate("user", "name");

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === "Delivered") {
        return next(
            new ErrorHandler("You have already delivered this order", 400),
        );
    }

    // order.orderItems.forEach(async (item) => {
    //     await updateStock(item.product, item.quantity);
    // });

    (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

    await order.save();

    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}

async function addStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock + quantity;

    await product.save({ validateBeforeSave: false });
}

// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("No Order found with this ID", 404));
    }

    if (order.paymentInfo.refund_id !== "") {
        return next(
            new ErrorHandler("You have already refunded this order", 400),
        );
    } else {
        order.orderItems.forEach(async (item) => {
            await addStock(item.product, item.quantity);
        });

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_API,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        let refundPrice =
            order.totalPrice - Math.round((order.totalPrice * 3) / 100);

        await instance.payments
            .refund(order.paymentInfo.id, {
                amount: refundPrice * 100,
                speed: "optimum",
                receipt: crypto.randomBytes(10).toString("hex"),
            })
            .then(async (resp) => {
                order.paymentInfo.refund_id = resp.id;
                order.orderStatus = "Refunded";
                order.totalPrice = order.totalPrice - refundPrice;
                await order.save();
            });
    }

    res.status(200).json({
        success: true,
        order,
    });
});

exports.getSellerOrders = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.find({ user: req.params.id });
    const orders = await Order.find().populate("user", "name");

    let orderList = [];
    let productId = [];
    let totalAmount = 0;

    product.forEach((item) => productId.push(item._id.toString()));

    orders.forEach((item) => {
        let order = { orderItems: [], totalPrice: 0 };
        item.orderItems.forEach((i) => {
            if (productId.includes(i.product.toString())) {
                order._id = item._id;
                order.shippingInfo = item.shippingInfo;
                order.user = item.user;
                order.createdAt = item.createdAt;
                order.orderItems = [...order.orderItems, i];
                order.orderStatus = item.orderStatus;
                if (item.orderStatus === "Refunded") {
                    order.totalPrice = 0;
                } else {
                    order.totalPrice += i.price * i.quantity;
                    totalAmount += i.price * i.quantity;
                }

                orderList.push(order);
            }
        });
    });

    const key = "_id";

    const unique = [
        ...new Map(orderList.map((item) => [item[key], item])).values(),
    ];

    res.status(200).json({
        success: true,
        orders: unique,
        totalAmount: totalAmount,
    });
});

exports.sellerOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.find({ user: req.body.userid });
    const orders = await Order.findOne({ _id: req.body.id }).populate(
        "user",
        "name",
    );

    let productId = [];
    let order = { orderItems: [], totalPrice: 0 };

    product.forEach((item) => productId.push(item._id.toString()));
    order.shippingInfo = orders.shippingInfo;
    order.user = orders.user;
    order.paymentInfo = orders.paymentInfo;
    order.orderStatus = orders.orderStatus;
    order.createdAt = orders.createdAt;
    orders.orderItems.forEach((item) => {
        if (productId.includes(item.product.toString())) {
            order._id = item._id;
            order.orderItems = [...order.orderItems, item];
            if (orders.orderStatus === "Refunded") {
                order.totalPrice = 0;
            } else {
                order.totalPrice += item.price * item.quantity;
            }
        }
    });

    res.status(200).json({
        success: true,
        order: order,
    });
});
