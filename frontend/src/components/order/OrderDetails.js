import React, { useEffect } from "react";
import { Loading, MetaData } from "../../components";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import SummaryProduct from "../cart/SummaryProduct";

const OrderDetails = ({ match }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        error,
        order = {},
    } = useSelector((state) => state.orderDetails);
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        user,
        totalPrice,
        orderStatus,
    } = order;

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert, match.params.id]);

    const shippingDetails =
        shippingInfo &&
        `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.district}, ${shippingInfo.state}, ${shippingInfo.country}`;

    const isPaid =
        paymentInfo && paymentInfo.status === "success" ? true : false;
    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"Order Details"} />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="flex flex-col p-5 space-y-6 bg-white max-w-screen-md mx-auto shadow-md">
                        <h1 className="text-2xl">
                            <p className="mb-2">Order # {order._id}</p>
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
                                        order &&
                                        String(orderStatus).includes(
                                            "Delivered",
                                        )
                                            ? "text-green-500"
                                            : "text-red-500"
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
                        <h1 className="text-2xl text-right border-b pb-4">
                            Total Price:
                            <span className="ml-2">
                                ₹ {order && totalPrice}
                            </span>
                        </h1>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderDetails;
