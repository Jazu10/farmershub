import React, { useState, useEffect } from "react";
import { Loading, MetaData } from "../../components";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrderDetails,
    updateOrder,
    clearErrors,
} from "../../actions/orderActions";
import SummaryProduct from "../cart/SummaryProduct";
import { Sidebar } from "../";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = ({ match }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector((state) => state.orderDetails);
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        user,
        totalPrice,
        orderStatus,
    } = order;
    const { error, isUpdated } = useSelector((state) => state.order);

    const orderId = match.params.id;

    const [status, setStatus] = useState(order ? orderStatus : "");

    useEffect(() => {
        dispatch(getOrderDetails(orderId));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Order updated successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }
    }, [dispatch, alert, error, isUpdated, orderId]);

    const updateOrderHandler = (id) => {
        const formData = new FormData();
        formData.set("status", status);

        dispatch(updateOrder(id, formData));
    };

    const shippingDetails =
        shippingInfo &&
        `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.district}, ${shippingInfo.state}, ${shippingInfo.country}`;

    const isPaid =
        paymentInfo && paymentInfo.status === "success" ? true : false;

    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"Order Details"} />
            <Sidebar />

            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="flex flex-col p-5 space-y-6 bg-white max-w-screen-md mx-auto shadow-md mb-6">
                        <h1 className="text-2xl">
                            <p className="mb-2">Process Order # {order._id}</p>
                            <hr />
                        </h1>
                        <div className="grid grid-cols-6 text-lg">
                            <div className="col-span-6">
                                <div className="w-full flex flex-row">
                                    <h1 className="font-semibold">Name:</h1>
                                    <h1 className="italic text-gray-700 ml-[2.9rem]">
                                        {user && user.name}
                                    </h1>
                                </div>
                                <div className="w-full flex flex-row">
                                    <h1 className="font-semibold">Phone: </h1>
                                    <h1 className="italic text-gray-700 ml-10">
                                        {shippingInfo && shippingInfo.phone}
                                    </h1>
                                </div>
                                <div className="w-full flex flex-row">
                                    <h1 className="font-semibold">Address: </h1>
                                    <h1 className=" italic text-gray-700 ml-6">
                                        {shippingDetails}
                                    </h1>
                                </div>
                                <div className="w-full flex flex-row">
                                    <h1 className="font-semibold">Razorpay:</h1>
                                    <h1 className=" italic text-gray-700 ml-3">
                                        {paymentInfo && paymentInfo.id}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-row">
                            <div className="w-1/2 flex flex-col">
                                <h1 className="font-semibold text-xl">
                                    Payment
                                </h1>
                                <p
                                    className={`mt-2 ${
                                        isPaid
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}>
                                    <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                                </p>
                            </div>
                            <div>
                                <h1 className="font-semibold text-xl">
                                    Order Status
                                </h1>
                                <p
                                    className={`mt-2 ${
                                        (order &&
                                            orderStatus === "Delivered" &&
                                            "text-green-400") ||
                                        (order &&
                                            orderStatus === "Shipped" &&
                                            "text-yellow-400") ||
                                        (order &&
                                            orderStatus === "Processing" &&
                                            "text-red-500")
                                    }`}>
                                    <b>{order && orderStatus}</b>
                                </p>
                            </div>
                        </div>
                        <hr />

                        <h1 className="text-lg border-b pb-4">
                            Order Items: (
                            {orderItems &&
                                orderItems.reduce(
                                    (acc, item) => acc + Number(item.quantity),
                                    0,
                                )}
                            <span className="ml-2">Unit</span> )
                        </h1>
                        {orderItems &&
                            orderItems.map((item) => (
                                <SummaryProduct
                                    key={item.product}
                                    id={item.product}
                                    name={item.name}
                                    quantity={item.quantity}
                                    image={item.image}
                                    price={item.price}
                                />
                            ))}
                        <h1 className="text-xl text-right border-b pb-4">
                            Shipping Price:
                            <span className="ml-2">
                                ₹ {totalPrice > 5000 ? "250" : "500"}
                            </span>
                        </h1>
                        <h1 className="text-2xl text-right border-b pb-4">
                            Total Price:
                            <span className="ml-2">
                                ₹ {order && totalPrice}
                            </span>
                        </h1>
                        <div className="flex flex-row text-xl items-center justify-evenly">
                            <h2 className="font-bold text-blue-500">Status</h2>
                            <select
                                className="focus:outline-none p-2 text-lg bg-gray-200 rounded-md"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                            <button
                                className="bg-blue-500 text-lg hover:bg-blue-600 p-2 rounded text-white"
                                onClick={() => updateOrderHandler(order._id)}>
                                Update Order
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProcessOrder;
