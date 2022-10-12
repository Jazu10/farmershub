import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../actions/productActions";

import { MetaData, Loader } from "../components";

import { useAlert } from "react-alert";

import ProductItem from "./products/ProductItem";

import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";

const Home = ({ match }) => {
    const [showFilters, setShowfilters] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [price, setPrice] = useState([1, 100000]);

    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);

    const [p1, setP1] = useState(1);
    const [p2, setP2] = useState(100000);

    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        products,
        error,
        productsCount,
        resPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    const keyword = match.params.keyword;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating));
    }, [dispatch, error, alert, keyword, currentPage, price, category, rating]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount;
    }

    const handlePrice = (e) => {
        e.preventDefault();
        if (p1 === "" && p2 !== "") {
            setP1(0);
        }
        if (p1 !== "" && p2 === "") {
            setP2(100000);
        }
        if (p1 === "" && p2 === "") {
            setP1(0);
            setP2(100000);
        }
        if (p2 === 0) setPrice([p1, 100000]);
        else setPrice([p1, p2]);
    };
    const clearPrice = (e) => {
        e.preventDefault();
        setP1(0);
        setP2(100000);
        setPrice([0, 100000]);
    };

    const categories = [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
    ];

    return (
        <>
            <MetaData title={"Buy best products"} />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="w-full">
                        {keyword ? (
                            <>
                                <div className="max-w-screen-2xl mx-auto">
                                    <div className=" md:py-4 lg:px-20 md:px-6 py-2 px-4">
                                        <div className="flex justify-end items-center mb-4">
                                            {/*  filters Button (md and plus Screen) */}
                                            <button
                                                onClick={() =>
                                                    setShowfilters(!showFilters)
                                                }
                                                className=" cursor-pointer hidden md:flex hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 text-base leading-4 font-normal text-white justify-center items-center ">
                                                Filters
                                            </button>
                                        </div>

                                        {/* Filters Button (Small Screen)  */}

                                        <button
                                            onClick={() =>
                                                setShowfilters(!showFilters)
                                            }
                                            className="cursor-pointer mt-6 sm:hidden hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center">
                                            Filters
                                        </button>
                                    </div>

                                    <div
                                        id="filterSection"
                                        className={
                                            "relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-400 w-full transition " +
                                            (showFilters ? "block" : "hidden")
                                        }>
                                        {/* Cross button Code  */}
                                        <div
                                            onClick={() =>
                                                setShowfilters(false)
                                            }
                                            className=" cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4">
                                            <svg
                                                className=" lg:w-6 lg:h-6 w-4 h-4"
                                                viewBox="0 0 26 26"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M25 1L1 25"
                                                    stroke="#1F2937"
                                                    strokeWidth="1.25"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M1 1L25 25"
                                                    stroke="#27272A"
                                                    strokeWidth="1.25"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>

                                        <div className="mx-4 md:mx-0 md:px-6 lg:px-10 mb-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense ">
                                            <div className="flex flex-col items-center justify-center p-4 space-y-4">
                                                <h3 className="text-xl text-right">
                                                    Filter by Price
                                                </h3>
                                                <input
                                                    type="number"
                                                    placeholder="min price"
                                                    value={p1}
                                                    onChange={(e) =>
                                                        setP1(e.target.value)
                                                    }
                                                    className="p-1 focus:outline-none focus:ring-2 bg-white shadow-md focus:ring-yellow-400 rounded w-full"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="max price"
                                                    value={p2}
                                                    onChange={(e) =>
                                                        setP2(e.target.value)
                                                    }
                                                    className="p-1 focus:outline-none focus:ring-2 bg-white shadow-md focus:ring-yellow-400 rounded w-full"
                                                />
                                                <button
                                                    className="bg-yellow-400 shadow-md hover:bg-yellow-500 w-full p-1 text-white"
                                                    onClick={handlePrice}>
                                                    Apply Price filter
                                                </button>
                                                <button
                                                    className="bg-red-500 shadow-md hover:bg-red-600 w-full p-1 text-white"
                                                    onClick={clearPrice}>
                                                    Clear Price Filter
                                                </button>
                                            </div>
                                            <div className="flex flex-col items-center justify-center p-4 space-y-4">
                                                <h3 className="text-xl text-right">
                                                    Filter by Category
                                                </h3>
                                                <ul className="">
                                                    <li
                                                        className="hover:text-yellow-400
                                                        cursor-pointer"
                                                        onClick={() =>
                                                            setCategory("")
                                                        }>
                                                        Clear category
                                                    </li>
                                                    {categories.map((cat) => (
                                                        <li
                                                            key={cat}
                                                            className="hover:text-yellow-400 cursor-pointer"
                                                            onClick={() =>
                                                                setCategory(cat)
                                                            }>
                                                            {cat}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="flex flex-col items-center justify-center p-4 space-y-4">
                                                <h3 className="text-xl text-right">
                                                    Filter by Ratings
                                                </h3>
                                                <ul className="">
                                                    {[5, 4, 3, 2, 1].map(
                                                        (star) => (
                                                            <li
                                                                key={star}
                                                                className="hover:text-gray-500 cursor-pointer"
                                                                onClick={() =>
                                                                    setRating(
                                                                        star,
                                                                    )
                                                                }>
                                                                <div className="rating-outer text-xl">
                                                                    <div
                                                                        className="rating-inner text-yellow-600"
                                                                        style={{
                                                                            width: `${
                                                                                star *
                                                                                20
                                                                            }%`,
                                                                        }}></div>
                                                                </div>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ProductItem products={products} />
                            </>
                        ) : (
                            <ProductItem products={products} />
                        )}

                        {resPerPage <= count && (
                            <div className="flex justify-center my-5">
                                <Pagination
                                    currentPage={currentPage}
                                    itemsPerPage={resPerPage}
                                    totalItems={productsCount}
                                    onPageChange={setCurrentPageNo}
                                    nextLabel={"Next"}
                                    prevLabel={"Prev"}
                                    startLabel={"First Page"}
                                    endLabel={"Last Page"}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
