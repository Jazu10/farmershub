import React from "react";
import { Link } from "react-router-dom";
import { MetaData } from "../../components";
import { useSelector } from "react-redux";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

const Cart = ({history}) => {
    const { cartItems } = useSelector((state) => state.cart);

    const checkoutHandler = () => {
        history.push(`/login?redirect=shipping`)
    }
    return (
        <div className="lg:flex max-w-screen-2xl mx-auto">
            <MetaData title={"Cart"} />
            <div
                className={`flex-grow md:mx-0 md:px-6  mx-auto m-5 mb-0 ${
                    cartItems.length === 0 ? "lg:px-16" : "lg:pl-16"
                }`}>
                <div className="flex flex-col p-5 space-y-10 bg-white shadow-md">
                    <h1 className="text-3xl border-b pb-4">
                        {cartItems.length === 0 ? (
                            <Link to="/" className="hover:text-blue-600">
                                Your Cart is empty, Start Purchasing
                            </Link>
                        ) : (
                            `Your Shopping Cart: ${cartItems.length} items`
                        )}
                    </h1>
                    {cartItems.map((item, i) => (
                        <CheckoutProduct
                            key={i}
                            id={item.product}
                            name={item.name}
                            quantity={item.quantity}
                            stock={item.stock}
                            image={item.image}
                            price={item.price}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
            {cartItems.length > 0 && (
                <div className="bg-white lg:w-[180vw] xl:w-[120vw] p-6 md:my-5  md:mx-6 lg:mr-16 h-fit shadow-md items-center lg:top-28 lg:sticky">
                    <>
                        <h2 className="text-2xl mb-4 ">Order Summary</h2>
                        <hr />
                        <div className="flex">
                            <p className="flex text-xl mt-4">Subtotal:</p>
                            <p className="flex flex-grow"></p>
                            <p className="flex text-xl mt-4">
                                (
                                {cartItems.reduce(
                                    (acc, item) => acc + Number(item.quantity),
                                    0,
                                )}
                                <span className="ml-2">Unit</span> )
                            </p>
                        </div>
                        <div className="flex my-4">
                            <p className="flex text-xl">Estt. total:</p>
                            <p className="flex flex-grow"></p>
                            <CurrencyFormat
                                value={`${cartItems.reduce(
                                    (acc, item) =>
                                        acc + item.quantity * item.price,
                                    0,
                                )}`}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                className="text-blue-600 text-xl font-bold px-2 py-1 bg-gray-200 rounded-md"
                            />
                        </div>
                        <hr />
                        <button
                            onClick={checkoutHandler}
                            className="w-full mt-4 bg-blue-600 rounded-md hover:bg-blue-700 p-2 text-white font-bold">
                            Checkout
                        </button>
                    </>
                </div>
            )}
        </div>
    );
};

export default Cart;
