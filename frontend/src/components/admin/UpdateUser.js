import React, { useState, useEffect } from "react";
import { MetaData } from "../../components";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
    updateUser,
    getUserDetails,
    clearErrors,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { Sidebar, Loading } from "../";

const UpdateUser = ({ match, history }) => {
    const { error, isUpdated } = useSelector((state) => state.user);
    const { user, loading } = useSelector((state) => state.userDetails);
    const [name, setName] = useState();
    const [email, setEmail] = useState();

    const [role, setRole] = useState();

    const alert = useAlert();
    const dispatch = useDispatch();

    const userId = match.params.id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("User updated successfully");

            history.push("/admin/users");

            dispatch({
                type: UPDATE_USER_RESET,
            });
        }
    }, [dispatch, alert, error, history, user, isUpdated, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("role", role);
        dispatch(updateUser(user._id, formData));
    };

    return (
        <div>
            <MetaData title={"Update User"} />
            <Sidebar />
            {loading ? (
                <Loading />
            ) : (
                <div className="w-full h-[84vH] md:h-auto max-w-lg mx-auto md:my-16 md:p-10 p-5 bg-white md:border md:shadow-lg md:rounded-md">
                    <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data">
                        <h1 className="text-center font-bold text-xl pb-5 text-gray-700">
                            Update Profile
                        </h1>
                        <div className="flex flex-wrap mb-6">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                                htmlFor="name">
                                Name
                            </label>
                            <input
                                className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                                htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter your email id"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                                htmlFor="role">
                                Role
                            </label>
                            <select
                                name="role"
                                value={role}
                                className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                                onChange={(e) => setRole(e.target.value)}>
                                <option value="user">Customer</option>
                                <option value="seller">Farmer</option>

                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button
                            className={`w-full p-3 my-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow ${
                                loading
                                    ? "cursor-not-allowed bg-blue-500"
                                    : "cursor-pointer"
                            }`}
                            disabled={loading ? true : false}>
                            Update
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateUser;
