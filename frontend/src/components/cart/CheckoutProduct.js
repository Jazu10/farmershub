import React from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import { useAlert } from "react-alert";

const CheckoutProduct = ({
    id,
    name,
    quantity,
    price,
    stock,
    image,
    description,
}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const increaseQty = (id, qty, stock) => {
        const newQty = qty + 1;
        if (newQty > stock) return;

        dispatch(addItemToCart(id, newQty));
    };

    const decreaseQty = (id, qty) => {
        const newQty = qty - 1;

        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty));
    };

    const removeCartItemHandler = (productid) => {
        dispatch(removeItemFromCart(productid));
        alert.success("Item removed");
    };
    return (
        <div className="grid grid-cols-5">
            <img
                className="object-contain"
                height={200}
                width={200}
                src={image}
                alt=""
            />
            <div className="col-span-3 mx-5">
                <Link to={`/product/${id}`} className="hover:text-yellow-500">
                    <p className="mb-4">{name}</p>
                </Link>
                <p className="hidden md:flex text-xs lg:w-[80%] italic md:line-clamp-3 my-2 mb-3">
                    {description}
                </p>
                <CurrencyFormat
                    value={price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                    className="text-blue-600 align-end font-bold  text-lg  px-2 py-1 bg-gray-200 rounded-md"
                />
            </div>
            <div className="flex flex-col space-y-2 self-end justify-self-end">
                <div className="vertical-center">
                    <div className="custom-number-input h-10 w-32">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                                onClick={() => decreaseQty(id, quantity)}
                                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                <span className="m-auto text-2xl font-thin">
                                    -
                                </span>
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                readOnly
                                className="counter focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                name="custom-input-number"></input>
                            <button
                                onClick={() => increaseQty(id, quantity, stock)}
                                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                <span className="m-auto text-2xl font-thin">
                                    +
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => removeCartItemHandler(id)}
                    className="py-3 px-2 text-xs md:text-sm font-bold rounded-md bg-red-500 hover:bg-red-600 text-white">
                    <p className="">Remove item</p>
                </button>
            </div>
            <div className="mt-2 col-span-5 w-full">
                <hr />
            </div>
        </div>
    );
};

export default CheckoutProduct;
