import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { MetaData } from "../";

// import { useDispatch, useSelector } from "react-redux";

// import { getAdminProducts } from "../../actions/productActions";
// import { allOrders } from "../../actions/orderActions";
// import { allUsers } from "../../actions/userActions";
import { Link } from "react-router-dom";

const Dashboard = () => {
    // const dispatch = useDispatch();

    // const { products } = useSelector((state) => state.products);
    // const { users } = useSelector((state) => state.allUsers);
    // const { orders, totalAmount, loading } = useSelector(
    //     (state) => state.allOrders,
    // );

    // let outOfStock = 0;
    // products.forEach((product) => {
    //     if (product.stock === 0) {
    //         outOfStock += 1;
    //     }
    // });

    // useEffect(() => {
    //     // dispatch(getAdminProducts());
    //     // dispatch(allOrders());
    //     // dispatch(allUsers());
    // }, [dispatch]);

    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title="Dashboard" />
            <Sidebar />
            <div className="px-5 ml-12 md:ml-0 mt-10 lg:px-16 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-white grid-flow-row-dense">
                <div className="flex flex-col md:col-span-2 lg:col-span-3  xl:col-span-4 h-32 items-center justify-center bg-blue-500 m-5 p-8 pb-5">
                    <h1 className="text-2xl">Total Amount</h1>
                    <h1 className="text-2xl font-bold">$ 2000</h1>
                </div>
                <Link to="/admin/products">
                    <div className="flex flex-col items-center justify-center bg-green-500 m-5 p-8 pb-5 hover:shadow-lg">
                        <h1 className="text-2xl">Products</h1>
                        <h1 className="text-2xl font-bold">10</h1>
                        <hr />
                        <h3 className="text-sm flex text-left italic w-full mt-2">
                            View Details
                        </h3>
                    </div>
                </Link>
                <Link to="/admin/orders">
                    <div className="flex flex-col items-center justify-center bg-red-500 m-5 p-8 pb-5 hover:shadow-lg">
                        <h1 className="text-2xl">Orders</h1>
                        <h1 className="text-2xl font-bold">4</h1>
                        <hr />
                        <h3 className="text-sm text-left italic w-full mt-2">
                            View Details
                        </h3>
                    </div>
                </Link>

                <Link to="/admin/users">
                    <div className="flex flex-col items-center justify-center bg-cyan-600 m-5 p-8 pb-5 hover:shadow-lg">
                        <h1 className="text-2xl">Customers</h1>
                        <h1 className="text-2xl font-bold">4</h1>
                        <hr />
                        <h3 className="text-sm text-left italic w-full mt-2">
                            View Details
                        </h3>
                    </div>
                </Link>
                <div className="flex flex-col items-center justify-center bg-orange-400 m-5 p-8 pb-5">
                    <h1 className="text-2xl">Out of Stock</h1>
                    <h1 className="text-2xl font-bold">3</h1>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
