import React, { useState, useEffect } from "react";
import { MetaData, Loading } from "../../components";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

const Login = ({ history, location }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth,
    );

    const redirect = location.search ? location.search.split("=")[1] : "/";
    useEffect(() => {
        if (isAuthenticated) {
            history.push(redirect);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, alert, error, history, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <MetaData title={"Login"} />
                    <div className="w-full h-[84vH] md:h-auto max-w-lg mx-auto md:my-16 md:p-10 p-5 bg-white md:border md:shadow-lg md:rounded-md">
                        <form onSubmit={submitHandler}>
                            <h1 className="text-center font-bold text-xl pb-5 text-gray-700">
                                Sign In
                            </h1>
                            <div className="flex flex-wrap mb-6">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                                    htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                                    type="text"
                                    placeholder="Enter your email id"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                                    htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <button className="w-full p-3 my-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow">
                                Sign In
                            </button>
                            <div className="flex flex-row pt-2">
                                <Link to="/register">
                                    <p className="text-blue-700 hover:underline hover:text-indigo-800 cursor-pointer px-1">
                                        Create Account
                                    </p>
                                </Link>
                                <p className="flex flex-grow"></p>
                                <Link to="/password/forgot">
                                    <p className=" text-blue-700 hover:underline hover:text-indigo-700 cursor-pointer px-1">
                                        Forgot Password?
                                    </p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default Login;
