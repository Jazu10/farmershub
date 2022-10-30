import React from "react";
import { Link } from "react-router-dom";
import { MetaData } from "../";


const OrderSuccess = () => {
    return (
        <div className=" max-w-screen-2xl mx-auto">
            <MetaData title={"Order Success"} />
            <div className="bg-white p-6 mx-auto mt-20 shadow-md rounded-md items-center w-[90%] max-w-md">
                <svg
                    viewBox="0 0 24 24"
                    className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Your Order has been placed successfully
                    </p>
                    <p> Have a great day! </p>
                    <div className="py-10 text-center">
                        <Link
                            to="/orders/me"
                            className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                            GO TO ORDERS
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
