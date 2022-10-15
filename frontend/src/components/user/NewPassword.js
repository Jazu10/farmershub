import React, { useState, useEffect } from "react";
import { MetaData } from "../../components";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userActions";

const NewPassword = ({ history, match }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword,
    );

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated!");
            history.push("/login");
        }
    }, [dispatch, alert, error, success, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("password", password);
        formData.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(match.params.token, formData));
    };

    return (
        <div>
            <MetaData title={"Reset Password"} />
            <div className="w-full h-[84vH] md:h-auto max-w-lg mx-auto md:my-16 md:p-10 p-5 bg-white md:border md:shadow-lg md:rounded-md">
                <form onSubmit={submitHandler}>
                    <h1 className="text-center font-bold text-xl pb-5 text-gray-700">
                        Reset Password
                    </h1>
                    <div className="flex flex-wrap mb-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                            htmlFor="password">
                            New Password
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="password"
                            placeholder="Enter new password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap mb-6">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                            htmlFor="confirm password">
                            Confirm Password
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="password"
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className={`w-full p-3 my-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow ${
                            loading
                                ? "cursor-not-allowed bg-blue-500 hover:bg-blue-500"
                                : "cursor-pointer"
                        }`}
                        disabled={loading ? true : false}>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;
