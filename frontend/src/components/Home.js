import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../actions/productActions";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return <div>Home</div>;
};

export default Home;
