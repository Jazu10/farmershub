import React from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

const SummaryProduct = ({ id, name, quantity, price, image }) => {
    return (
        <div className="grid grid-cols-5">
            <img
                className="h-[140] w-[140] object-contain"
                height={130}
                width={130}
                src={image}
                alt=""
            />
            <div className="col-span-3 mx-5">
                <Link to={`/product/${id}`} className="hover:text-yellow-400">
                    <p className="mb-4">{name}</p>
                </Link>

                <CurrencyFormat
                    value={price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    className="text-blue-600 font-bold  text-xl md:text-2xl px-2 py-1 bg-gray-200 rounded-md"
                />
            </div>
            <div className="flex flex-col -ml-14 text-sm md:text-xl self-end justify-self-end">
                <div className="flex text-right justify-end  italic">
                    {quantity} * {price} = {quantity * price}
                </div>
            </div>
            <div className="mt-2 col-span-5 w-full">
                <hr />
            </div>
        </div>
    );
};

export default SummaryProduct;
