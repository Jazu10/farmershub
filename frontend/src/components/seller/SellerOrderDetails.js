import React, { useEffect } from "react";
import { Loading, MetaData } from "../../components";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrderDetails, clearErrors } from "../../actions/orderActions";
import SummaryProduct from "../cart/SummaryProduct";
import { Sidebar, SellerSidebar } from "../";

import { checkPayout, newPayout } from "../../actions/payoutActions";
import { NEW_PAYOUT_RESET } from "../../constants/payoutConstants";
const SellerOrderDetails = ({ match, history }) => {
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
        orderStatus,
        totalPrice,
    } = order;
    const { user: admin } = useSelector((state) => state.auth);

    const {
        payoutDetails,
        error: payoutError,
        isCreated,
    } = useSelector((state) => state.payout);

    useEffect(() => {
        dispatch(getSellerOrderDetails(match.params.id, admin._id));
        dispatch(checkPayout(match.params.id, admin._id));
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (payoutError) {
            alert.error(payoutError);
            dispatch(clearErrors());
        }

        if (isCreated) {
            alert.success("Payout Requested");
            dispatch({ type: NEW_PAYOUT_RESET });
            history.push(`/seller/orders/${admin._id}`);
        }
    }, [
        dispatch,
        error,
        payoutError,
        alert,
        isCreated,
        match.params.id,
        history,
        admin._id,
    ]);

    const shippingDetails =
        shippingInfo &&
        `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.district}, ${shippingInfo.state}, ${shippingInfo.country}`;

    const isPaid =
        paymentInfo && paymentInfo.status === "success" ? true : false;

    const print = () => {
        let printContents = document.getElementById("print").innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };

    let displayPrice = totalPrice;
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("order", match.params.id);
        formData.set("user", admin._id);
        formData.set("amount", totalPrice);
        dispatch(newPayout(formData));
    };

    return (
        <div className="max-w-screen-2xl mx-auto mb-5">
            <MetaData title={"Order Details"} />
            {admin && admin.role === "admin" && <Sidebar />}
            {admin && admin.role === "seller" && <SellerSidebar />}

            {loading ? (
                <Loading />
            ) : (
                <div className="flex flex-col p-5 space-y-6 bg-white max-w-screen-md mx-auto shadow-md">
                    <div id="print" className="space-y-4">
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
                                    <h1 className="italic text-gray-700 ml-[2.6rem]">
                                        {shippingInfo && shippingInfo.phone}
                                    </h1>
                                </div>
                                <div className="w-full flex flex-row">
                                    <h1 className="font-semibold">Address: </h1>
                                    <h1 className=" italic text-gray-700 ml-[1.6rem]">
                                        {shippingDetails}
                                    </h1>
                                </div>
                                <div className="w-full flex flex-row">
                                    <h1 className="font-semibold">Razorpay:</h1>
                                    <h1 className=" italic text-gray-700 ml-[1rem]">
                                        {paymentInfo && paymentInfo.id}
                                    </h1>
                                </div>
                                {paymentInfo && paymentInfo.refund_id !== "" && (
                                    <div className="w-full flex flex-row">
                                        <h1 className="font-semibold">
                                            Refund:
                                        </h1>
                                        <h1 className=" italic text-gray-700 ml-[2rem]">
                                            {paymentInfo &&
                                                paymentInfo.refund_id}
                                        </h1>
                                    </div>
                                )}
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
                                {order && orderStatus === "Refunded" && (
                                    <>
                                        <h1 className="font-semibold text-xl">
                                            Order Status
                                        </h1>

                                        <p
                                            className={`mt-2 ${
                                                order &&
                                                orderStatus === "Refunded" &&
                                                "text-red-500"
                                            }`}>
                                            <b>
                                                {order &&
                                                orderStatus === "Refunded"
                                                    ? "Cancelled"
                                                    : ""}
                                            </b>
                                        </p>
                                    </>
                                )}
                                {order && orderStatus === "Delivered" && (
                                    <>
                                        <h1 className="font-semibold text-xl">
                                            Order Status
                                        </h1>

                                        <p
                                            className={`mt-2 ${
                                                order &&
                                                orderStatus === "Delivered" &&
                                                "text-green-400"
                                            }`}>
                                            <b>
                                                {order &&
                                                orderStatus === "Delivered"
                                                    ? "Delivered"
                                                    : ""}
                                            </b>
                                        </p>
                                    </>
                                )}

                                {/* <p
                                    className={`mt-2 ${
                                        (order &&
                                            orderStatus === "Delivered" &&
                                            "text-green-400") ||
                                        (order &&
                                            orderStatus === "Shipped" &&
                                            "text-yellow-400") ||
                                        (order &&
                                            orderStatus === "Processing" &&
                                            "text-red-500") ||
                                        (order &&
                                            orderStatus === "Refunded" &&
                                            "text-red-500")
                                    }`
                                    <b>Refunded</b>
                                </p>*/}
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
                        {/* <h1 className="text-xl text-right border-b pb-4">
                            Shipping Price:
                            <span className="ml-2">
                                ₹ {totalPrice > 5000 ? "250" : "500"}
                            </span>
                        </h1> */}
                        <h1 className="text-2xl text-right border-b pb-4">
                            Total Price:
                            <span className="ml-2">
                                ₹ {order && displayPrice}
                            </span>
                        </h1>
                    </div>
                    {order && ["Delivered", "Shipped"].includes(orderStatus) && (
                        <div className="flex flex-row space-x-4">
                            {payoutDetails === null && (
                                <button
                                    onClick={submitHandler}
                                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Request Payout
                                </button>
                            )}
                            <button
                                onClick={print}
                                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                Print
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SellerOrderDetails;
