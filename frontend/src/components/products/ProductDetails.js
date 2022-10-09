import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { useAlert } from "react-alert";

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, product } = useSelector(
        (state) => state.productDetails,
    );

    useEffect(() => {
        dispatch(getProductDetails(match.params.id));
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch,alert, error, match.params.id]);

    return (
        <div>
            <div className="flex px-4 sm:px-6 lg:px-20 mt-6 justify-evenly">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div>
                            <div className="h-64 md:h-80 rounded-lg bg-transparent mb-4">
                                <img
                                    loading="lazy"
                                    className="image rounded-md h-full w-full object-contain"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREf48ilESASX02ivLsP2VyOz8O42vdYzc0uQ&usqp=CAU"
                                />
                            </div>
                            <div className="flex -mx-2 mb-4"></div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                            Lorem ipsum dolor, sit amet consectetur, adipisicing
                            elit.
                        </h2>
                        <p className="text-gray-500 text-sm">
                            By
                            <a
                                href="#"
                                className="text-indigo-600 hover:underline">
                                ABC Company
                            </a>
                        </p>

                        <div className="flex items-center space-x-4 my-4">
                            <div>
                                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                    <span className="text-indigo-400 mr-1 mt-1">
                                        $
                                    </span>
                                    <span className="font-bold text-indigo-600 text-3xl">
                                        price
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-green-500 text-xl font-semibold">
                                    Save 12%
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Inclusive of all Taxes.
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-500">
                            Lorem ipsum, dolor sit, amet consectetur adipisicing
                            elit. Vitae exercitationem porro saepe ea harum
                            corrupti vero id laudantium enim, libero blanditiis
                            expedita cupiditate a est.
                        </p>

                        <div className="flex py-4 space-x-4 justify-between md:justify-start">
                            <div className="flex items-center text-2xl h-14 ring-gray-200 ring-2 rounded-md">
                                <div className="bg-gray-100 md:px-6 px-4 py-3 rounded-l-md cursor-pointer hover:bg-gray-200">
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
                                <div className="bg-gray-100 px-4 md:px-6 py-3 rounded-r-md cursor-pointer hover:bg-gray-200">
                                    +
                                </div>
                            </div>

                            <button
                                type="button"
                                className="h-14 px-4 py-2 md:px-6 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white">
                                Add to cart
                            </button>
                            <button
                                type="button"
                                className="h-14 px-4 py-2 md:px-6 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-500 text-white">
                                Add review
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
