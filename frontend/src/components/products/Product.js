import React from "react";
import { Link } from "react-router-dom";

function Product({
    _id,
    category,
    description,
    name,
    numOfReviews,
    reviews,
    ratings,
    seller,
    stock,
    price,
    images,
    schedule,
    isActive,
}) {
    let oneDay = 1000 * 60 * 60 * 24;

    let date = new Date();
    let scheduled = new Date(schedule);
    let dateDiff = Math.round(Math.abs(scheduled - date) / oneDay);
    return (
        <>
            {dateDiff >= 0 && dateDiff <= 31 && isActive && (
                <Link to={`/product/${_id}`}>
                    <div className="relative hidden md:flex flex-col m-5 bg-white p-8 pb-5 shadow-md hover:shadow-xl transform duration-500 hover:scale-105 cursor-pointer">
                        {stock === 0 && (
                            <>
                                <div className="absolute flex w-full h-full bg-white opacity-40 top-0 right-0 left-0 bottom-0 items-center justify-center"></div>
                                <p className="absolute py-2 left-0 top-40 text-center font-bold w-full bg-white opacity-100 text-red-500">
                                    Out of Stock
                                </p>
                            </>
                        )}
                        {dateDiff > 0 && (
                            <>
                                <div className="absolute flex w-full h-full bg-white opacity-40 top-0 right-0 left-0 bottom-0 items-center justify-center"></div>
                                <p className="absolute py-2 left-0 top-40 text-center font-bold w-full bg-white opacity-100 text-blue-500">
                                    Comming Soon
                                </p>
                                <div className="absolute top-3 italic text-xs">
                                    comes in {dateDiff} Days
                                </div>
                            </>
                        )}
                        <img
                            className="rounded h-[200px] object-cover"
                            loading="lazy"
                            src={images[0].url}
                            alt=""
                        />
                        <p className="absolute top-3 right-4 text-xs text-gray-700 italic">
                            {category}
                        </p>
                        <p className="absolute bottom-2 right-8 text-xs italic">
                            {numOfReviews} Reviews
                        </p>
                        <h4 className="mt-2 font-semibold text-lg md:text-2xl line-clamp-1">
                            {name}
                        </h4>
                        <p className="text-xs my-2 line-clamp-2 italic">
                            {description}
                        </p>
                        <div className="font-bold justify-between inline-flex items-baseline">
                            <div className="text-lg bg-gray-100 rounded-md p-1 px-2 text-blue-600">
                                ₹ {price}
                            </div>
                            <div className="text-lg font-normal">
                                <div className="rating-outer">
                                    <div
                                        className="rating-inner"
                                        style={{
                                            width: `${(ratings / 5) * 100}%`,
                                        }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="prod relative md:hidden my-1 bg-white flex cursor-pointer shadow-md">
                        {stock === 0 && (
                            <>
                                <div className="absolute flex w-full h-full bg-white opacity-40 top-0 right-0 left-0 bottom-0 items-center justify-center"></div>
                                <p className="absolute py-2 left-0 top-12 text-center font-bold w-full bg-white opacity-100 text-red-500">
                                    Out of Stock
                                </p>
                            </>
                        )}
                        {dateDiff > 0 && (
                            <>
                                <div className="absolute flex w-full h-full bg-white opacity-40 top-0 right-0 left-0 bottom-0 items-center justify-center"></div>
                                <div className="absolute py-2 z-40 left-0 top-[2.7rem] text-center font-bold w-full bg-white opacity-100 text-blue-500">
                                    Comming Soon
                                    <p className="text-xs">
                                        ({dateDiff} days left)
                                    </p>
                                </div>
                            </>
                        )}
                        <img src={images[0].url} alt="" className="shadow-md" />
                        <div className="px-4 py-2 w-full">
                            <p className="absolute top-2 left-34 text-xs italic">
                                {numOfReviews} Reviews
                            </p>
                            <p className="absolute top-2 right-2 text-xs italic">
                                {category}
                            </p>
                            <h4 className="font-semibold text-lg pb-1 pt-3 line-clamp-1">
                                {name}
                            </h4>
                            <p className="text-xs line-clamp-2 italic">
                                {description}
                            </p>
                            <div className="flex w-full justify-between items-center mt-1">
                                <p className="flex sm:text-md bg-gray-200 p-1 rounded-md text-blue-500 font-bold">
                                    ₹ {price}
                                </p>
                                <div className="ratings text-md">
                                    <div className="rating-outer">
                                        <div
                                            className="rating-inner"
                                            style={{
                                                width: `${
                                                    (ratings / 5) * 100
                                                }%`,
                                            }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
}

export default Product;
