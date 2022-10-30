import React from "react";
import { MetaData } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import CurrencyFormat from "react-currency-format";
import SummaryProduct from "./SummaryProduct";
import { savePriceInfo } from "../../actions/cartActions";

const ConfirmOrder = ({ history }) => {
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const itemPrice = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
    );

    const locDict = {
        Kasargod: shippingInfo && shippingInfo.location === "Kasargod" ? 1 : 14,
        Kannur: 13,
        Wayanad: 12,
        Kozhikode: 11,
        Malappuram: 10,
        Palakkad: 9,
        Thrissur: 8,
        Ernakulam: 7,
        Idukki: 6,
        Kottayam: 5,
        Alappuzha: 4,
        Pathanamthitta: 3,
        Kollam: 2,
        Thiruvananthapuram: 1,
    };

    let location = [];
    let locationValue = 0;
    let counter = 0;
    cartItems.forEach((item) => {
        !location.includes(item.location) && location.push(item.location);
        locationValue += locDict[item.location];
        counter++;
    });

    const locPoint = locationValue / counter;
    const shippingVal =
        shippingInfo && Math.abs(locPoint - locDict[shippingInfo.district]);

    const shippingPrice = Math.round((shippingVal + location.length) * 500);
    const taxPrice = (itemPrice * 3) / 100;

    const totalPrice = Math.round(shippingPrice + itemPrice + taxPrice);

    const proceedToPayment = (e) => {
        e.preventDefault();
        const data = {
            itemPrice,
            shippingPrice,
            totalPrice,
            taxPrice: taxPrice,
        };
        dispatch(savePriceInfo(data));

        history.push("/payment");
    };
    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"Confirm Order"} />
            <div className="flex w-full md:-mb-4 lg:-mb-8">
                <CheckoutSteps shipping confirmOrder />
            </div>
            <div className="lg:flex lg:mt-4">
                <div
                    className={`flex-grow md:mx-0 md:px-6  mx-auto m-5 lg:mb-5 ${
                        cartItems.length === 0 ? "lg:px-16" : "lg:pl-16"
                    }`}>
                    <div className="flex flex-col p-5 space-y-6 bg-white shadow-md">
                        <h1 className="text-2xl">
                            <p className="mb-2">Shipping Info</p>
                            <hr />
                        </h1>
                        <div className="grid grid-cols-6 text-lg md:text-xl">
                            <div className="col-span-6 md:col-span-4 lg:col-span-3 space-y-4">
                                <div className="w-full flex flex-row">
                                    <h1 className="font-semibold">Name:</h1>
                                    <h1 className="italic text-gray-700 ml-[2.9rem]">
                                        {user.name}
                                    </h1>
                                </div>
                                <div className="w-full flex flex-row">
                                    <h1 className="font-semibold">Email:</h1>
                                    <h1 className="italic text-gray-700 ml-[3.3rem]">
                                        {user.email}
                                    </h1>
                                </div>
                                <div className="w-full flex flex-row">
                                    <h1 className="font-semibold">Phone: </h1>
                                    <h1 className="italic text-gray-700 ml-10">
                                        {shippingInfo.phone}
                                    </h1>
                                </div>
                                <div className="w-full flex flex-row">
                                    <h1 className="font-semibold">Address: </h1>
                                    <h1 className=" italic text-gray-700 ml-6">
                                        {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.district}, ${shippingInfo.state}, ${shippingInfo.country}`}
                                    </h1>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <h1 className="text-2xl border-b pb-4">
                            Your Cart Items: (
                            {cartItems.reduce(
                                (acc, item) => acc + Number(item.quantity),
                                0,
                            )}
                            <span className="ml-2">Unit</span> )
                        </h1>
                        {cartItems.map((item, i) => (
                            <SummaryProduct
                                key={i}
                                id={item.product}
                                name={item.name}
                                quantity={item.quantity}
                                stock={item.stock}
                                image={item.image}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
                {cartItems.length > 0 && (
                    <div className="bg-white lg:w-[100vw] xl:w-[50vw] p-6 md:my-5  md:mx-6 lg:mr-16 h-fit shadow-md items-center lg:top-28 lg:sticky">
                        <>
                            <h2 className="text-2xl mb-4 ">Order Summary</h2>
                            <hr />

                            <div className="flex">
                                <p className="flex text-xl mt-4">Subtotal:</p>
                                <p className="flex flex-grow"></p>
                                <p className="flex text-xl mt-4">
                                    (
                                    {cartItems.reduce(
                                        (acc, item) =>
                                            acc + Number(item.quantity),
                                        0,
                                    )}
                                    <span className="ml-2">Unit</span> )
                                </p>
                            </div>
                            <div className="flex my-4">
                                <p className="flex text-xl mt-1">
                                    Estt. total:
                                </p>
                                <p className="flex flex-grow"></p>
                                <CurrencyFormat
                                    value={itemPrice}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                    className="text-blue-600 text-xl font-bold px-2 py-1 bg-gray-200 rounded-md"
                                />
                            </div>
                            <div className="flex my-4">
                                <p className="flex text-xl">Shipping:</p>
                                <p className="flex flex-grow"></p>
                                <CurrencyFormat
                                    value={shippingPrice}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                    className="text-blue-600 text-xl font-bold px-2 py-1 bg-gray-200 rounded-md"
                                />
                            </div>
                            <div className="flex my-4">
                                <p className="flex text-xl">Tax:</p>
                                <p className="flex flex-grow"></p>
                                <CurrencyFormat
                                    value={taxPrice}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                    className="text-red-500 text-xl font-bold px-2 py-1 bg-gray-200 rounded-md"
                                />
                            </div>
                            <div className="flex my-4">
                                <p className="flex text-xl">Payable:</p>
                                <p className="flex flex-grow"></p>
                                <CurrencyFormat
                                    value={totalPrice}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                    className="text-green-500 text-xl font-bold px-2 py-1 bg-gray-200 rounded-md"
                                />
                            </div>
                            <hr />
                            <button
                                onClick={proceedToPayment}
                                className="w-full mt-4 bg-blue-600 rounded-md hover:bg-blue-700 p-2 text-white font-bold">
                                Confirm Order
                            </button>
                        </>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmOrder;
