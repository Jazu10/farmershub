import React, { useState } from "react";

const MSearch = ({ history }) => {
    const [keyword, setKeyword] = useState("");
    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) history.push(`/search/${keyword}`);
        else history.push("/");
    };
    return (
        <div>
            {/* <!-- mobile search bar --> */}
            <div className="w-full flex flex-col md:hidden items-center pb-2 px-4">
                <form className="flex flex-grow bg-white items-center h-10 w-full rounded-md shadow-md">
                    <input
                        className="bg-transparent font-semibold xs:text-md sm:text-lg pl-4 flex flex-grow focus:outline-none"
                        type="text"
                        placeholder="I'm searching for ..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button
                        onClick={searchHandler}
                        className="px-4 text-xl cursor-pointer mb-1 hover:text-gray-500">
                        <i className="fa fa-search"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MSearch;
