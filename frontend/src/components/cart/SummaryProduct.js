import React from "react";
import CurrencyFormat from "react-currency-format";

const SummaryProduct = ({
    id,
    name,
    quantity,
    price,
    stock,
    image,
    description,
}) => {
    return (
        <div className="grid grid-cols-5">
            <img
                className="h-[140] w-[140] object-contain"
                height={140}
                width={140}
                src="/avatar.png"
                alt=""
            />
            <div className="col-span-3 mx-5">
                <p className="mb-4">{name}</p>
                <p className="hidden md:flex text-xs lg:w-[80%] xl:w-auto italic md:line-clamp-3 my-2 mb-3">
                    {description}
                </p>
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
