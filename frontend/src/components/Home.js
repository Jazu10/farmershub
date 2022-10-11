import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../actions/productActions";
import ProductItem from "./products/ProductItem";
import { MetaData, Loader } from "../components";
import { useAlert } from "react-alert";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";

const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);

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
        dispatch(getProducts(keyword, currentPage));
    }, [dispatch, error, alert, keyword, currentPage]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }
    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount;
    }

    return (
        <>
            <MetaData title={"Buy best products"} />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="w-full">
                        <ProductItem products={products} />
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
