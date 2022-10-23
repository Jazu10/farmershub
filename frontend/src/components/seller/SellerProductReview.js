import React, { useState, useEffect } from "react";
import { Loading, MetaData } from "..";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { SellerSidebar } from "../";
import {
    getSellerProductReviews,
    deleteReview,
    clearErrors,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const SellerProductReview = ({ match }) => {
    const [productId, setProductId] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, reviews } = useSelector(
        (state) => state.productReviews,
    );
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.review,
    );

    const userId = match.params.id;

    useEffect(() => {
        if (productId !== "") {
            dispatch(getSellerProductReviews(productId, userId));
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Review Deleted!");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, alert, isDeleted, deleteError, error, productId, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getSellerProductReviews(productId, userId));
    };

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId));
    };
    const columns = [
        { field: "id", headerName: "Review ID", flex: 1, minWidth: 220 },
        {
            field: "rating",
            headerName: "Rating",
            flex: 1,
            minWidth: 100,
            renderCell: (cellValues) => {
                return (
                    <div className="rating-outer text-lg">
                        <div
                            className="rating-inner"
                            style={{
                                width: `${(cellValues.row.rating / 5) * 100}%`,
                            }}></div>
                    </div>
                );
            },
        },
        {
            field: "comment",
            headerName: "Comment",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "user",
            headerName: "User",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "actions",
            headerName: "Action",
            renderCell: (cellValues) => {
                return (
                    <div className="flex flex-row space-x-4">
                        <button
                            onClick={() =>
                                deleteReviewHandler(cellValues.row.id)
                            }
                            className="p-2 py-1 text-white bg-red-500 rounded-md">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                );
            },
            flex: 1,
            minWidth: 100,
            sortable: false,
        },
    ];

    const setUsers = () => {
        const data = [];
        reviews &&
            reviews.forEach((review) =>
                data.push({
                    id: review._id,
                    rating: review.rating,
                    comment: review.comment,
                    user: review.name,
                    actions: review._id,
                }),
            );
        return data;
    };

    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"Reviews"} />
            <SellerSidebar />
            <div className="w-full max-w-lg mx-auto md:my-16 md:p-10 p-5 bg-white md:border md:shadow-lg md:rounded-md">
                <form onSubmit={submitHandler}>
                    <h1 className="text-center font-bold text-xl pb-5 text-gray-700">
                        Search Product Review
                    </h1>
                    <div className="flex flex-wrap mb-6">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                            htmlFor="productId">
                            Product ID
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Enter Product Id"
                            name="name"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                    </div>
                    <button
                        className={`w-full p-3 my-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow ${
                            loading
                                ? "cursor-not-allowed bg-blue-500"
                                : "cursor-pointer"
                        }`}
                        disabled={loading ? true : false}>
                        Search
                    </button>
                </form>
            </div>
            {reviews && reviews.length > 0 ? (
                <>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <Box className="bg-white w-[90%] h-[65vh] mx-auto mt-10 rounded-md mb-5">
                                <DataGrid
                                    rows={setUsers()}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    experimentalFeatures={{
                                        newEditingApi: false,
                                    }}
                                    components={{
                                        Toolbar: GridToolbar,
                                    }}
                                    initialState={{
                                        sorting: {
                                            sortModel: [
                                                {
                                                    field: "rating",
                                                    sort: "desc",
                                                },
                                            ],
                                        },
                                    }}
                                />
                            </Box>
                        </>
                    )}
                </>
            ) : (
                <div className="flex mt-5 justify-center">
                    <p className="text-lg">No Reviews</p>
                </div>
            )}
        </div>
    );
};

export default SellerProductReview;
