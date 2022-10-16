import React, { useState } from "react";
import { MetaData } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";
const Shipping = ({ history }) => {
    const loading = "";
    const { shippingInfo } = useSelector((state) => state.cart);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [phone, setPhone] = useState(shippingInfo.phone);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const [district, setDistrict] = useState(shippingInfo.district);
    const districts = [
        "Kasargod",
        "Kannur",
        "Wayanad",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Thrissur",
        "Ernakulam",
        "Idukki",
        "Kottayam",
        "Alappuzha",
        "Pathanamthitta",
        "Kollam",
        "Thiruvananthapuram",
    ];
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log({ address, city, phone, postalCode, country });
        dispatch(
            saveShippingInfo({
                address,
                city,
                phone,
                postalCode,
                country,
                state,
                district,
            }),
        );
        history.push("/confirm");
    };
    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"Shipping Info"} />
            <div className="flex w-full md:-mb-4 lg:-mb-8">
                <CheckoutSteps shipping />
            </div>
            <div className="w-full md:h-auto max-w-lg mx-auto md:my-16 md:p-10 p-5 bg-white md:border md:shadow-lg md:rounded-md">
                <form onSubmit={submitHandler}>
                    <h1 className="text-center font-bold text-xl pb-5 text-gray-700">
                        Shipping Info
                    </h1>
                    <div className="flex flex-wrap mb-6">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                            htmlFor="address">
                            Address
                        </label>
                        <textarea
                            className="w-full bg-gray-200 rounded py-3 h-[5.4rem] px-4 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Enter your address"
                            name="address"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }></textarea>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                            htmlFor="city">
                            City
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Enter your email id"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="postalcode">
                            Postal Code
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="tel"
                            maxLength={6}
                            minLength={6}
                            placeholder="Enter postal code"
                            name="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="phone">
                            Phone number
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="tel"
                            maxLength={10}
                            minLength={10}
                            placeholder="Enter your phone number"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="country">
                            Country
                        </label>
                        <select
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            onChange={(e) => setCountry(e.target.value)}
                            defaultValue={country}>
                            <option value="">Select country</option>
                            <option value="India">India</option>
                        </select>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="state">
                            State
                        </label>
                        <select
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            onChange={(e) => setState(e.target.value)}
                            defaultValue={state}>
                            <option value="">Select State</option>
                            <option value="Kerala">Kerala</option>
                        </select>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="district">
                            District
                        </label>
                        <select
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            onChange={(e) => setDistrict(e.target.value)}
                            defaultValue={district}>
                            <option value="">Select District</option>
                            {districts.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className={`w-full p-3 my-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow ${
                            loading
                                ? "cursor-not-allowed bg-blue-500"
                                : "cursor-pointer"
                        }`}
                        disabled={loading ? true : false}>
                        Checkout
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Shipping;
