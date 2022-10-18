import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Loading, MetaData } from "../../components";
import { Carousel } from "react-bootstrap";
import {
    getProductDetails,
    newReview,
    clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = ({ match }) => {
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, product } = useSelector(
        (state) => state.productDetails,
    );

    const { user } = useSelector((state) => state.auth);
    const { error: reviewError, success } = useSelector(
        (state) => state.newReview,
    );

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        dispatch(getProductDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Posted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
    }, [dispatch, alert, error, reviewError, success, match.params.id]);

    const increaseQty = () => {
        const count = document.querySelector(".count");

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    };

    const decreaseQty = () => {
        const count = document.querySelector(".count");

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    };

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success("Item added to cart");
    };

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

    const reviewHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", match.params.id);
        dispatch(newReview(formData));
    };

    return (
        <div>
            <MetaData title={`${product.name}`} />
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
                                                product.images.map((image) => (
                                                    <Carousel.Item
                                                        key={image.public_id}>
                                                        <img
                                                            loading="lazy"
                                                            className="image rounded-md h-full w-full object-contain"
                                                            src={image.url}
                                                            alt={product.title}
                                                        />
                                                    </Carousel.Item>
                                                ))}
                                        </Carousel>
                                    </div>
                                    <div className="flex -mx-2 mb-4"></div>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                                    {product.name}
                                </h2>
                                <div className="text-gray-500 text-sm">
                                    By
                                    <p className="text-indigo-600 hover:underline">
                                        {product.seller}
                                    </p>
                                </div>

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
                                    {/* <div className="flex-1">
                                        <p className="text-green-500 text-xl font-semibold">
                                            Save 12%
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Inclusive of all Taxes.
                                        </p>
                                    </div> */}
                                </div>

                                <p className="text-gray-800">
                                    {product.description}
                                </p>
                                <p className="font-bold text-xl">
                                    Status :
                                    {product.stock > 0 ? (
                                        <span className="text-blue-600 ml-2">
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="text-red-500 ml-2">
                                            Out of Stock
                                        </span>
                                    )}
                                </p>

                                <div className="flex py-4 space-x-4 justify-between md:justify-start">
                                    <div className="flex items-center justify-center text-2xl h-14 ring-gray-300 ring-2 rounded-md">
                                        <button
                                            onClick={decreaseQty}
                                            className="bg-gray-300 md:px-6 px-4 py-3 rounded-l-md cursor-pointer hover:bg-gray-400">
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            readOnly
                                            className="count p-2 h-full w-20 text-center text-black focus:outline-none bg-transparent"
                                        />
                                        <button
                                            onClick={increaseQty}
                                            className=" bg-gray-300 px-4 md:px-6 py-3 rounded-r-md cursor-pointer hover:bg-gray-400">
                                            +
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        disabled={product.stock === 0}
                                        onClick={addToCart}
                                        className={`h-14 px-4 py-2 md:px-6 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white ${
                                            product.stock === 0
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                        } `}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex px-4 md:px-12 lg:px-20 mt-10 md:mt-20 w-full md:w-[50%] cursor-default">
                        {user ? (
                            <div
                                className="flex flex-col w-full"
                                onClickCapture={setUserRatings}>
                                <ul className="stars justify-center md:justify-start cursor-pointer">
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
                                    name="comment"
                                    id="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="rounded-md focus:ring-2 focus:ring-yellow-300 focus:outline-none mt-3"></textarea>
                                <button
                                    type="button"
                                    onClick={reviewHandler}
                                    className="h-14 my-4 px-4 py-2 md:px-6 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 text-white"
                                    // onClick={setUserRatings}
                                >
                                    Submit Your Review
                                </button>

                                <hr />
                                <hr />
                                <div className="my-10 bg-white space-y-5 rounded-md">
                                    {product.reviews &&
                                        product.reviews.length > 0 &&
                                        product.reviews.map((review, i) => (
                                            <div key={review._id}>
                                                <p className="my-2 p-2 pb-0 text-2xl font-semibold text-yellow-500">
                                                    {review.name}
                                                </p>
                                                <div
                                                    key={i}
                                                    className="flex flex-row text-xl px-2 mb-3 pb-1 text-gray-600 italic">
                                                    <br />
                                                    <p>{review.comment}</p>
                                                    <p className="flex-grow"></p>
                                                    <div className="rating-outer">
                                                        <div
                                                            className="rating-inner"
                                                            style={{
                                                                width: `${
                                                                    (review.rating /
                                                                        5) *
                                                                    100
                                                                }%`,
                                                            }}></div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-2xl">Login to post review</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetails;
