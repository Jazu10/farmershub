import React, { useEffect } from "react";
import SellerSidebar from "./SellerSidebar";
import { MetaData } from "../";

import { useDispatch, useSelector } from "react-redux";

import { getSellerProducts } from "../../actions/productActions";
import { sellerOrders } from "../../actions/orderActions";
// import { allUsers } from "../../actions/userActions";
import { Link } from "react-router-dom";
import { Loading } from "../";

const SellerDashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);
    const { totalAmount, loading } = useSelector((state) => state.allOrders);

    let outOfStock = 0;
    products &&
        products.forEach((product) => {
            if (product.stock === 0) {
                outOfStock += 1;
            }
        });
    // let customers = 0;
    // users &&
    //     users.forEach((user) => {
    //         if (user.role === "admin") {
    //             customers += 1;
    //         }
    //     });

    useEffect(() => {
        dispatch(getSellerProducts(user._id));
        dispatch(sellerOrders(user._id));
        // dispatch(allUsers());
    }, [dispatch, user._id]);

    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title="Dashboard" />
            <SellerSidebar />
            {loading ? (
                <Loading />
            ) : (
                <div className="px-5 ml-12 md:ml-0 mt-10 lg:px-16 grid md:grid-cols-2 text-white grid-flow-row-dense">
                    <div className="flex flex-col md:col-span-2 lg:col-span-3  xl:col-span-4 h-32 items-center justify-center bg-blue-500 m-5 p-8 pb-5">
                        <h1 className="text-2xl">Total Amount</h1>
                        <h1 className="text-2xl font-bold">₹ {totalAmount}</h1>
                    </div>
                    <Link to={`/seller/products/${user && user._id}`}>
                        <div className="flex flex-col items-center justify-center bg-green-500 m-5 p-8 pb-5 hover:shadow-lg">
                            <h1 className="text-2xl">Products</h1>
                            <h1 className="text-2xl font-bold">
                                {products && products.length}
                            </h1>
                            <hr />
                            <h3 className="text-sm flex text-left italic w-full mt-2">
                                View Details
                            </h3>
                        </div>
                    </Link>
                    {/* <Link to="/admin/orders">
                        <div className="flex flex-col items-center justify-center bg-red-500 m-5 p-8 pb-5 hover:shadow-lg">
                            <h1 className="text-2xl">Orders</h1>
                            <h1 className="text-2xl font-bold">
                                {orders && orders.length}
                            </h1>
                            <hr />
                            <h3 className="text-sm text-left italic w-full mt-2">
                                View Details
                            </h3>
                        </div>
                    </Link>

                    <Link to="/admin/users">
                        <div className="flex flex-col items-center justify-center bg-cyan-600 m-5 p-8 pb-5 hover:shadow-lg">
                            <h1 className="text-2xl">Customers</h1>
                            <h1 className="text-2xl font-bold">{customers}</h1>
                            <hr />
                            <h3 className="text-sm text-left italic w-full mt-2">
                                View Details
                            </h3>
                        </div>
                    </Link>*/}
                    <div className="flex flex-col items-center justify-center bg-orange-400 m-5 p-8 pb-5">
                        <h1 className="text-2xl">Out of Stock</h1>
                        <h1 className="text-2xl font-bold">{outOfStock}</h1>
                        <hr />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerDashboard;
