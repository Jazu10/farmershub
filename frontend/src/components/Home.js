import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../actions/productActions";
import ProductItem from "./products/ProductItem";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className="w-full">
            <ProductItem />
        </div>
    );
};

export default Home;
