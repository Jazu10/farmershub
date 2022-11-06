import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Loading, MetaData } from "../../components";
import {
    getProductDetails,
    newReview,
    clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

    let oneDay = 1000 * 60 * 60 * 24;

    let date = new Date();
    let scheduled = new Date(product && product.schedule);
    let dateDiff = Math.round((scheduled - date) / oneDay);

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
        const count = document.querySelector(".counter");

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    };

    const decreaseQty = () => {
        const count = document.querySelector(".counter");

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
        if (comment !== "") {
            dispatch(newReview(formData));
        } else alert.error("Please enter comment to post");
    };

    function createMarkup(html) {
        return { __html: html };
    }

    return (
        <div>
            <MetaData title={`${product.name}`} />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <section className="text-gray-600 body-font overflow-hidden">
                        <div className="container px-5 pt-6 mx-auto">
                            <div className="lg:w-[95%] mx-auto flex flex-wrap justify-between">
                                <Carousel
                                    autoPlay
                                    infiniteLoop
                                    stopOnHover
                                    showStatus={false}
                                    showIndicators={false}
                                    showThumbs={false}
                                    interval={3000}
                                    className="lg:w-[50%]">
                                    {product.images &&
                                        product.images.map((image) => (
                                            <div key={image.public_id}>
                                                <img
                                                    loading="lazy"
                                                    className="object-contain"
                                                    src={image.url}
                                                    alt={product.title}
                                                    height={300}
                                                />
                                            </div>
                                        ))}
                                </Carousel>

                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                        Sold by: {product && product.seller}
                                    </h2>
                                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                        {product && product.name}
                                    </h1>
                                    <div className="flex mb-4">
                                        <span className="flex items-center">
                                            <div className="rating-outer">
                                                <div
                                                    className="rating-inner"
                                                    style={{
                                                        width: `${
                                                            (product.ratings /
                                                                5) *
                                                            100
                                                        }%`,
                                                    }}></div>
                                            </div>
                                            <span className="text-gray-600 ml-3">
                                                {product &&
                                                    product.numOfReviews}{" "}
                                                Reviews
                                            </span>
                                        </span>
                                    </div>
                                    <p
                                        className="description leading-relaxed text-justify"
                                        dangerouslySetInnerHTML={createMarkup(
                                            product && product.description,
                                        )}></p>
                                    <div className="flex mt-3 items-center pb-3 border-b-2 border-gray-100 mb-3"></div>
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold text-xl mt-2">
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
                                        <p className="font-bold text-xl mt-2">
                                            1 Unit :
                                            <span className="text-green-500 ml-2">
                                                {product.unit} Kg
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex mt-3  items-center pb-3 border-b-2 border-gray-100 mb-3"></div>

                                    <div className="flex flex-row justify-between">
                                        <h2 className="flex font-bold text-xl mt-2">
                                            {product.location}
                                        </h2>
                                        <div className="vertical-center">
                                            <div className="custom-number-input h-10 w-32">
                                                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                                    <button
                                                        onClick={decreaseQty}
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
                                                        onClick={increaseQty}
                                                        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                                        <span className="m-auto text-2xl font-thin">
                                                            +
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex mt-3 items-center pb-3 border-b-2 border-gray-100 mb-3"></div>

                                    <div className="flex">
                                        <span className="title-font font-medium text-2xl text-gray-900">
                                            ₹ {product && product.price}
                                        </span>
                                        <button
                                            onClick={addToCart}
                                            disabled={
                                                (product &&
                                                    product.stock === 0) ||
                                                dateDiff > 0
                                            }
                                            className={`flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded ${
                                                product.stock === 0 ||
                                                dateDiff > 0
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                            }`}>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex px-4 md:px-12 lg:px-20 w-full cursor-default">
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
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        className="rounded-md focus:ring-2 p-2 focus:ring-yellow-300 focus:outline-none mt-3"></textarea>
                                    <button
                                        type="button"
                                        onClick={reviewHandler}
                                        className="h-14 my-4 px-4 py-2 md:px-6 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 text-white">
                                        Submit Your Review
                                    </button>

                                    <div className="mt-10 mb-4 bg-white space-y-5 rounded-md">
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
                                <p className="text-2xl mb-4">
                                    Login to post review
                                </p>
                            )}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default ProductDetails;
