import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts,clearErrors } from "../actions/productActions";
import ProductItem from "./products/ProductItem";
import { MetaData, Loader } from "../components";
import { useAlert } from "react-alert";

const Home = () => {
    const dispatch = useDispatch();

    const { loading, products, error, productsCount } = useSelector(
        (state) => state.products,
    );
    const alert = useAlert();
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts());
    }, [dispatch, error, alert]);

    return (
        <>
            <MetaData title={"Buy best products"} />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="w-full">
                        <ProductItem products={products} />
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
