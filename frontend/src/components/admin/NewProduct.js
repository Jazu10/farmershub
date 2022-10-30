import React, { useState, useEffect } from "react";
import { MetaData } from "..";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, clearErrors } from "../../actions/productActions";
import { Sidebar } from "../index";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [location, setLocation] = useState("");
    const [unit, setUnit] = useState("");
    const date = new Date().toISOString();
    const [schedule, setSchedule] = useState(date.toString().substring(0, 10));

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { loading, error, success } = useSelector(
        (state) => state.newProduct,
    );
    const { user } = useSelector((state) => state.auth);
    const [seller, setSeller] = useState(user ? user.name : "");

    const categories = ["Vegetables", "Fruits"];
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

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Product created successfully");
            history.push("/admin/products");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, success, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        formData.set("price", price);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("seller", seller);
        formData.set("stock", stock);
        formData.set("location", location);
        formData.set("unit", unit);
        formData.set("schedule", schedule);

        images.forEach((image) => {
            formData.append("images", image);
        });
        dispatch(createProduct(formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);
        setImagesPreview([]);
        setImages([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [
                        ...oldArray,
                        reader.result,
                    ]);
                    setImages((oldArray) => [...oldArray, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };
    return (
        <div>
            <MetaData title={"Create Product"} />
            <Sidebar />
            <div className="w-full pl-20 h-fit md:h-auto max-w-lg mx-auto md:my-16 md:p-10 p-5 bg-white md:border md:shadow-lg md:rounded-md">
                <form onSubmit={submitHandler} encType="multipart/form-data">
                    <h1 className="text-center font-bold text-xl pb-5 text-gray-700">
                        Add Product
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
                            placeholder="Enter product name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3"
                            htmlFor="price">
                            Price
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="number"
                            placeholder="Enter product price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Enter product description"
                            name="description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }></textarea>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="category">
                            Category
                        </label>
                        <select
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            onChange={(e) => setCategory(e.target.value)}
                            defaultValue={category}>
                            <option value="">Select category</option>
                            {categories.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="unit">
                            Unit
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="text"
                            placeholder="Enter quantity per unit"
                            name="unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                        />
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="stock">
                            Stock
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="number"
                            placeholder="Enter product stock"
                            name="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="schedule">
                            Schedule
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="date"
                            name="schedule"
                            value={schedule}
                            onChange={(e) => setSchedule(e.target.value)}
                        />
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="location">
                            Location
                        </label>
                        <select
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            onChange={(e) => setLocation(e.target.value)}
                            defaultValue={location}>
                            <option value="">Select Location</option>
                            {districts.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold my-3 mt-4"
                            htmlFor="images">
                            Images
                        </label>
                        <input
                            className="w-full bg-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
                            type="file"
                            placeholder="Select image"
                            accept="image/*"
                            multiple
                            onChange={onChange}
                        />
                        {imagesPreview.map((img, i) => (
                            <img
                                src={img}
                                key={i}
                                alt="Images Preview"
                                className="mt-3 mr-2 object-contain"
                                width={80}
                                height={80}
                            />
                        ))}
                    </div>
                    <button
                        className={`w-full p-3 my-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow ${
                            loading
                                ? "cursor-not-allowed bg-blue-500"
                                : "cursor-pointer"
                        }`}
                        disabled={loading ? true : false}>
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewProduct;
