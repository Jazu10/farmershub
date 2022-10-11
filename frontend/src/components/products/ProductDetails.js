import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Loading, MetaData } from "../../components";
import { Carousel } from "react-bootstrap";

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, product } = useSelector(
        (state) => state.productDetails,
    );
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    useEffect(() => {
        dispatch(getProductDetails(match.params.id));
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, match.params.id]);

    function setUserRatings() {
        const stars = document.querySelectorAll(".star");

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ["click", "mouseover", "mouseout"].forEach(function (e) {
                star.addEventListener(e, showRatings);
            });
        });

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === "click") {
                    if (index < this.starValue) {
                        star.classList.add("orange");

                        setRating(this.starValue);
                    } else {
                        star.classList.remove("orange");
                    }
                }

                if (e.type === "mouseover") {
                    if (index < this.starValue) {
                        star.classList.add("yellow");
                    } else {
                        star.classList.remove("yellow");
                    }
                }

                if (e.type === "mouseout") {
                    star.classList.remove("yellow");
                }
            });
        }
    }

    return (
        <div>
            <MetaData title={`${product.name} - ecommerce`} />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="flex px-4 md:px-12 lg:px-20 mt-6 justify-evenly">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div>
                                    <div className="h-64 md:h-80 rounded-lg bg-transparent mb-4">
                                        <Carousel pause="hover">
                                            {product.images &&
                                                product.images.map((image) => {
                                                    <Carousel.Item
                                                        key={image.public_id}>
                                                        <img
                                                            loading="lazy"
                                                            className="image rounded-md h-full w-full object-contain"
                                                            src={image.url}
                                                            alt={product.title}
                                                        />
                                                    </Carousel.Item>;
                                                })}
                                        </Carousel>
                                    </div>
                                    <div className="flex -mx-2 mb-4"></div>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                                    {product.name}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    By
                                    <p className="text-indigo-600 hover:underline">
                                        {product.seller}
                                    </p>
                                </p>

                                <div className="flex items-center space-x-4 my-4">
                                    <div>
                                        <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                            <span className="text-indigo-400 mr-1 mt-1">
                                                $
                                            </span>
                                            <span className="font-bold text-indigo-600 text-3xl">
                                                {product.price}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-green-500 text-xl font-semibold">
                                            Save 12%
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Inclusive of all Taxes.
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-800">
                                    {product.description}
                                </p>
                                <p className="font-bold text-xl">
                                    Status :
                                        {product.stock > 0 ? (
                                            <span className="text-blue-600"> In Stock</span>
                                        ) : (
                                            <span className="text-red-500"> Out of Stock</span>
                                        )}
                                </p>

                                <div className="flex py-4 space-x-4 justify-between md:justify-start">
                                    <div className="flex items-center text-2xl h-14 ring-gray-300 ring-2 rounded-md">
                                        <div className="bg-gray-300 md:px-6 px-4 py-3 rounded-l-md cursor-pointer hover:bg-gray-400">
                                            -
                                        </div>
                                        <input
                                            type="number"
                                            name="qty"
                                            id="qty"
                                            value="100"
                                            disabled
                                            className="w-14 text-center bg-transparent"
                                        />
                                        <div className="bg-gray-300 px-4 md:px-6 py-3 rounded-r-md cursor-pointer hover:bg-gray-400">
                                            +
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="h-14 px-4 py-2 md:px-6 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex px-4 md:px-12 lg:px-20 mt-10 md:mt-20 w-full md:w-[50%]">
                        {product.name ? (
                            <div
                                className="flex flex-col w-full cursor-pointer"
                                onClickCapture={setUserRatings}>
                                <ul className="stars justify-center md:justify-start">
                                    <li className="star">
                                        <i className="fa fa-star"></i>
                                    </li>
                                    <li className="star">
                                        <i className="fa fa-star"></i>
                                    </li>
                                    <li className="star">
                                        <i className="fa fa-star"></i>
                                    </li>
                                    <li className="star">
                                        <i className="fa fa-star"></i>
                                    </li>
                                    <li className="star">
                                        <i className="fa fa-star"></i>
                                    </li>
                                </ul>

                                <textarea
                                    name="review"
                                    id="review"
                                    className="rounded-md focus:ring-2 focus:ring-yellow-300 focus:outline-none mt-3"></textarea>
                                <button
                                    type="button"
                                    className="h-14 my-4 px-4 py-2 md:px-6 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 text-white"
                                    // onClick={setUserRatings}
                                >
                                    Submit Your Review
                                </button>
                            </div>
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetails;
