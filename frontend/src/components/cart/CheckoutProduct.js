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
                className="h-[200] w-[200] object-contain"
                height={200}
                width={200}
                src="/avatar.png"
                alt=""
            />
            <div className="col-span-3 mx-5">
                <Link to={`/product/${id}`} className="hover:text-yellow-500">
                    <p className="mb-4">{name}</p>
                </Link>
                <p className="hidden md:flex text-xs lg:w-[80%] xl:w-auto italic md:line-clamp-3 my-2 mb-3">
                    {description}
                </p>
                <CurrencyFormat
                    value={price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    className="text-blue-600 align-end font-bold  text-xl md:text-2xl px-2 py-1 bg-gray-200 rounded-md"
                />
            </div>
            <div className="flex flex-col space-y-2 self-end justify-self-end">
                <div className="flex items-center justify-center text-xl md:text-2xl h-10 md:h-12 ring-gray-300 ring-2 rounded-md">
                    <button
                        onClick={() => decreaseQty(id, quantity)}
                        className="bg-gray-300 md:px-4 p-2 rounded-l-md cursor-pointer hover:bg-gray-400">
                        -
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        readOnly
                        className="count p-2 text-sm h-full w-10 md:w-16 text-center text-black focus:outline-none bg-transparent"
                    />
                    <button
                        onClick={() => increaseQty(id, quantity, stock)}
                        className=" bg-gray-300 p-2 md:px-4 rounded-r-md cursor-pointer hover:bg-gray-400">
                        +
                    </button>
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
