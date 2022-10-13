import React, { useState, useEffect } from "react";
import { MetaData } from "../../components";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";

const Register = ({ history }) => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState("/avatar.png");

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth,
    );

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, alert, error, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar", avatar);
        dispatch(register(formData));
    };

    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPrev(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    return (
        <div>
            <MetaData title={"Register"} />
            <div className="w-full h-[84vH] md:h-auto max-w-lg mx-auto md:my-16 md:p-10 p-5 bg-white md:border md:shadow-lg md:rounded-md">
                <form onSubmit={submitHandler} encType="multipart/form-data">
                    <h1 className="text-center font-bold text-xl pb-5 text-gray-700">
                        Sign Up
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
                            onChange={onChange}
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
                            onChange={onChange}
                        />
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                            htmlFor="avatar">
                            Avatar
                        </label>
                        <div className="flex items-center space-x-2 justify-between w-full">
                            <img
                                src={avatarPrev}
                                alt=""
                                height={50}
                                width={50}
                                className="h-[50px] w-[50px] rounded-full"
                            />
                            <div className="flex flex-grow" />
                            <input
                                className="bg-gray-200 w-[80%] rounded py-3 px-4 leading-tight focus:outline-none"
                                type="file"
                                placeholder="Select image"
                                accept="image/*"
                                name="avatar"
                                onChange={onChange}
                            />
                        </div>
                    </div>
                    <button
                        className={`w-full p-3 my-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow ${
                            loading
                                ? "cursor-not-allowed bg-blue-500"
                                : "cursor-pointer"
                        }`}
                        disabled={loading ? true : false}>
                        Register
                    </button>
                    <div className="flex flex-row pt-2">
                        <Link to="/login">
                            <p className="text-blue-700 hover:underline hover:text-indigo-800 cursor-pointer px-1">
                                Already a user? Login
                            </p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
