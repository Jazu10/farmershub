import React, { useState } from "react";

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("");
    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) history.push(`/search/${keyword}`);
        else history.push("/");
    };

    return (
        <form className="w-full" onSubmit={searchHandler}>
            {/* Desktop Search */}
            <div className="flex flex-grow bg-white items-center shadow-md rounded-md">
                <input
                    className="sinput bg-transparent font-semibold pl-4 h-12 flex flex-grow focus:outline-none text-lg"
                    type="text"
                    placeholder="I'm searching for ..."
                    onChange={(e)=> setKeyword(e.target.value)}
                />
                <button onClick={searchHandler} className="sbutton px-4 text-2xl cursor-pointer mb-1 hover:text-gray-500">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </form>
    );
};

export default Search;
