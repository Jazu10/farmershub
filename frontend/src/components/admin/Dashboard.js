import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { MetaData } from "../";

import { useDispatch, useSelector } from "react-redux";

import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";
import { allUsers } from "../../actions/userActions";
import { Link } from "react-router-dom";
import { Loading } from "../";
import BarChart from "../layout/Chart";
import PieChart from "../layout/PieChart";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { users } = useSelector((state) => state.allUsers);
    const { orders, totalAmount, loading } = useSelector(
        (state) => state.allOrders,
    );

    let outOfStock = 0;
    products &&
        products.forEach((product) => {
            if (product.stock === 0) {
                outOfStock += 1;
            }
        });

    let prods = products.sort((a, b) => b.sold - a.sold);
    prods = prods.slice(0, 5);
    let prodData = [];
    for (let i = 0; i < prods.length; i++) {
        prodData.push({ name: prods[i].name, sold: prods[i].sold });
    }

    let customers = 0;
    users &&
        users.forEach((user) => {
            if (user.role === "user") {
                customers += 1;
            }
        });

    let ordr = orders ? orders : [];
    let monthlyData = [];
    let date;
    ordr = ordr.sort((a, b) => Date(a.createdAt) - Date(b.createdAt));
    ordr = ordr.slice(ordr.length - 31, ordr.length);

    for (let i = 0; i < ordr.length; i++) {
        date = new Date(ordr[i].createdAt);
        date = date =
            date.getDate() +
            " / " +
            (date.getMonth() + 1) +
            " / " +
            date.getFullYear();
        monthlyData.push({ date: date, amount: ordr[i].totalPrice });
    }

    const monthlyRes = Array.from(
        monthlyData.reduce(
            (m, { date, amount }) => m.set(date, (m.get(date) || 0) + amount),
            new Map(),
        ),
        ([date, amount]) => ({ date, amount }),
    );

    let yearlyData = [];
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let month, year;
    let yearlyOrders = orders ? orders : [];

    for (let i = 0; i < yearlyOrders.length; i++) {
        date = new Date(yearlyOrders[i].createdAt);
        month = date.getMonth();
        year = date.getFullYear();
        yearlyData.push({
            date: monthNames[month].toString() + " " + year,
            amount: ordr[i].totalPrice,
        });
    }

    let yearlyRes = Array.from(
        yearlyData.reduce(
            (m, { date, amount }) => m.set(date, (m.get(date) || 0) + amount),
            new Map(),
        ),
        ([date, amount]) => ({ date, amount }),
    );

    yearlyRes = yearlyRes.slice(yearlyRes.length - 12, yearlyRes.length);

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(allOrders());
        dispatch(allUsers());
    }, [dispatch]);

    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title="Dashboard" />
            <Sidebar />
            {loading ? (
                <Loading />
            ) : (
                <div className="px-5 ml-12 md:ml-0 mt-10 lg:px-16 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-white grid-flow-row-dense">
                    <div className="flex flex-col md:col-span-2 lg:col-span-3  xl:col-span-4 h-32 items-center justify-center bg-blue-500 m-5 p-8 pb-5">
                        <h1 className="text-2xl">Total Amount</h1>
                        <h1 className="text-2xl font-bold">₹ {totalAmount}</h1>
                    </div>
                    <Link to="/admin/products">
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
                    <Link to="/admin/orders">
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
                    </Link>
                    <div className="flex flex-col items-center justify-center bg-orange-400 m-5 p-8 pb-5">
                        <h1 className="text-2xl">Out of Stock</h1>
                        <h1 className="text-2xl font-bold">{outOfStock}</h1>
                        <hr />
                    </div>
                </div>
            )}
            <PieChart res={prodData} title={"Top Sold Products"} />
            <BarChart
                res={monthlyRes}
                color={"#FFD400"}
                label={"Income per Day"}
                title={"Daily Sales"}
            />
            <BarChart
                res={yearlyRes}
                color={"red"}
                label={"Income per Month"}
                title={"Monthly Sales"}
            />
        </div>
    );
};

export default Dashboard;
