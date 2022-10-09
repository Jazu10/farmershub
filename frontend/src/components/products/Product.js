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
}) {
    return (
        <>
            <Link to={`/product/${_id}`}>
                <div className="relative hidden md:flex flex-col m-5 bg-white p-8 pb-5 shadow-md hover:shadow-xl transform duration-500 hover:scale-105 cursor-pointer">
                    <img
                        className="rounded w-full h-full"
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
                            $ {price}
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
                                ${price}
                            </p>
                            <div className="rating text-md">
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
                </div>
            </Link>
        </>
    );
}

export default Product;
