import React, { useState, useEffect } from "react";
import { MetaData } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import axios from "axios";
import { useAlert } from "react-alert";
import { createOrder, clearErrors } from "../../actions/orderActions";

const Payment = ({ history }) => {
    const [razorpayApiKey, setRazorpayApiKey] = useState("");

    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const [orderInfo, setOrderInfo] = useState(
        sessionStorage.getItem("orderInfo")
            ? JSON.parse(sessionStorage.getItem("orderInfo"))
            : "",
    );
    const dispatch = useDispatch();

    const { error } = useSelector((state) => state.newOrder);
    const alert = useAlert();

    sessionStorage.clear();

    let payable = orderInfo.totalPrice;

    const order = {
        orderItems: cartItems,
        shippingInfo,
    };

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemPrice;
        order.shippingPrice = orderInfo.shippingPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.totalPrice = orderInfo.totalPrice;
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (!orderInfo) history.push("/");
        async function getRazorPayKey() {
            const { data } = await axios.get("/api/v1/razorpayapi");
            setRazorpayApiKey(data.apiKey);
        }
        getRazorPayKey();
    }, [dispatch, alert, error, history]);

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const initPayment = (data) => {
        const options = {
            key: razorpayApiKey,
            amount: data.amount,
            currency: "INR",
            name: user.name,
            email: user.email,
            phone: shippingInfo.phone,
            address: {
                address: shippingInfo.address,
                city: shippingInfo.city,
                postalCode: shippingInfo.postalCode,
                district: shippingInfo.district,
                state: shippingInfo.state,
                country: shippingInfo.country,
            },
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyUrl = "/api/v1/payment/verify";
                    const { data } = await axios.post(
                        verifyUrl,
                        response,
                        config,
                    );
                    alert.success(data.message);
                    order.paymentInfo = {
                        id: data.razorpay_payment_id,
                        status: data.status,
                    };
                    dispatch(createOrder(order));
                    history.push("/success");
                } catch (error) {
                    alert.error(error.message);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `/api/v1/payment/process`,
                {
                    amount: orderInfo.totalPrice * 100,
                    name: user.name,
                    email: user.email,
                    phone: shippingInfo.phone,
                    address: shippingInfo.address,
                    city: shippingInfo.city,
                    postalCode: shippingInfo.postalCode,
                    district: shippingInfo.district,
                    state: shippingInfo.state,
                    country: shippingInfo.country,
                },
                config,
            );
            initPayment(data.order);
        } catch (error) {
            alert.error(error.message);
        }
    };
    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"Confirm Order"} />
            <div className="flex w-full md:-mb-4 lg:-mb-8">
                <CheckoutSteps shipping confirmOrder payment />
            </div>
            <div className="w-[90%] md:h-auto max-w-lg mx-auto md:my-16 md:p-10 p-5 bg-white md:border md:shadow-lg md:rounded-md">
                <form onSubmit={handlePayment}>
                    <h1 className="text-center font-bold text-xl pb-5 text-gray-700">
                        Payment
                    </h1>
                    <button
                        className={`w-full p-3 my-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow-md`}>
                        $ {payable} - Pay now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
