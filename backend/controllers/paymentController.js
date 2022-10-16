const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorHandler");

//process payments => /api/va/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_API,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: req.body.amount, // amount in smallest currency unit
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
            notes: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                postalCode: req.body.postalCode,
                district: req.body.district,
                state: req.body.state,
                country: req.body.country,
            },
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.status(200).json({ order: order });
    } catch (error) {
        return next(new ErrorHandler(error.message, "500"));
    }
});

exports.sendApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        apiKey: process.env.RAZORPAY_API,
    });
});

exports.verify = catchAsyncErrors(async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({
                razorpay_payment_id,
                status: "success",
                message: "Payment successfull",
            });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
});
