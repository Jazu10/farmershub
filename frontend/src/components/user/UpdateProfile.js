import React, { useState, useEffect } from "react";
import { MetaData } from "../../components";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
    updateProfile,
    loadUser,
    clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = ({ history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");

    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { error, isUpdated, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setMobile(user.mobile);
            setAvatarPrev(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated!");
            dispatch(loadUser());

            history.push("/me");
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("mobile", mobile);
        formData.set("avatar", avatar);
        dispatch(updateProfile(formData));
    };

    const onChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPrev(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    return (
        <div>
            <MetaData title={"Update Profile"} />
            <div className="w-full h-[84vH] md:h-auto max-w-lg mx-auto md:my-16 md:p-10 p-5 bg-white md:border md:shadow-lg md:rounded-md">
                <form onSubmit={submitHandler} encType="multipart/form-data">
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
                            htmlFor="mobile">
                            Phone no
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="tel"
                            placeholder="Enter your phone number"
                            name="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
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
                                className="h-[50px] w-[50px] rounded-full object-cover"
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
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
