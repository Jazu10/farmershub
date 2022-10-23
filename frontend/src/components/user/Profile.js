import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MetaData, Loading } from "../../components";
const Profile = () => {
    const { user, loading } = useSelector((state) => state.auth);
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <MetaData title={"Profile"} />
                    <div className="bg-white block md:w-[95%] lg:w-[70%] mx-auto md:px-10 py-5 md:mt-10 rounded-md shadow-lg">
                        <h1 className="text-3xl mt-4 md:mt-10 text-center font-bold">
                            My Profile
                        </h1>

                        <div className="flex flex-col md:flex-row px-4 md:flex justify-evenly items-center">
                            <div className="flex flex-col justify-center">
                                <img
                                    src={user.avatar && user.avatar.url}
                                    alt=""
                                    className="w-[300px] h-[300px] rounded-full mt-6 object-cover"
                                />

                                <Link
                                    to="/me/update"
                                    className="mt-6 text-lg mb-6 text-center font-bold text-white bg-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500">
                                    Edit Profile
                                </Link>
                            </div>
                            <div className="flex w-10" />
                            <div className="text-justify mt-4 w-full md:w-[30%] pb-6">
                                <h1 className="text-2xl font-bold">
                                    Full Name
                                </h1>
                                <h1 className="text-xl font-semibold text-gray-600">
                                    {user && user.name}
                                </h1>
                                <h1 className="text-2xl mt-8 font-bold">
                                    Email Address
                                </h1>
                                <h1 className="text-xl font-semibold text-gray-600">
                                    {user && user.email}
                                </h1>
                                <h1 className="text-2xl mt-8 font-bold">
                                    Joined on
                                </h1>
                                <h1 className="text-xl font-semibold text-gray-600">
                                    {user &&
                                        String(user.createdAt).substring(0, 10)}
                                </h1>
                                <div className="flex flex-col">
                                    {/* {user && user.role !== "admin" && ( */}
                                    <Link
                                        to="/orders/me"
                                        className="mt-6 text-center text-lg w-full font-bold text-white bg-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500">
                                        Orders
                                    </Link>
                                    {/* )} */}
                                    <Link
                                        to="/password/update"
                                        className="mt-6 text-center text-lg w-full text-white font-bold bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700">
                                        Change Password
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Profile;
