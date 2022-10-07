import React from "react";
import Headroom from "react-headroom";

function Header() {
    return (
        <Headroom>
            <header className="header bg-gray-200 bg-clip-border backdrop-filter backdrop-blur-3xl bg-opacity-20 top-0 w-full sticky">
                <nav className="nav mx-auto max-w-screen-2xl flex py-2 px-4 md:py-6 w-full items-center justify-between md:justify-around">
                    {/* <!-- logo --> */}
                    <div className="logo flex">
                        <text className="hidden lg:flex font-bold text-3xl font-elianto">
                            Green Shoppee
                        </text>
                        <text className="logo font-bold text-3xl md:text-4xl lg:hidden font-elianto">
                            GS
                        </text>
                    </div>

                    {/* <!-- search --> */}
                    <div className="search hidden md:flex md:w-3/5">
                        <div className="flex flex-grow bg-white items-center shadow-md rounded-md">
                            <input
                                className="sinput bg-transparent font-semibold pl-4 h-12 flex flex-grow focus:outline-none text-lg"
                                type="text"
                                placeholder="I'm searching for ..."
                            />
                            <div className="sbutton px-4 text-2xl cursor-pointer mb-1 hover:text-gray-500">
                                <i className="fa fa-search"></i>
                            </div>
                        </div>
                    </div>

                    {/* <!-- nav links --> */}
                    <div className="flex">
                        <ul className="nav flex items-center justify-evenly px-2 space-x-10 text-lg">
                            <li className="">
                                <a className="" href="/">
                                    cart
                                </a>
                            </li>
                            <li className="">
                                <div className="group inline-block relative">
                                    <button className="inline-flex items-center">
                                        <span className="">do</span>
                                    </button>
                                    <ul className="dropdown bg-white border-gray-300 border-2 rounded-md absolute hidden text-gray-700 group-hover:block w-44 -mx-36">
                                        <li className="">
                                            <a
                                                className="dropelements rounded-t-md hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
                                                href="/#">
                                                One
                                            </a>
                                        </li>
                                        <li className="">
                                            <a
                                                className="dropelements hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
                                                href="/#">
                                                Two
                                            </a>
                                        </li>
                                        <li className="">
                                            <a
                                                className="dropelements rounded-b-md hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
                                                href="/#">
                                                Three is the magic number
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* <!-- mobile search bar --> */}
                <div className="w-full flex flex-col md:hidden items-center pb-2 px-4">
                    <div className="flex flex-grow bg-white items-center h-10 w-full rounded-md shadow-md">
                        <input
                            className="bg-transparent font-semibold xs:text-md sm:text-lg pl-4 flex flex-grow focus:outline-none"
                            type="text"
                            placeholder="I'm searching for ..."
                        />
                        <div className="px-4 text-xl cursor-pointer mb-1 hover:text-gray-500">
                            <i className="fa fa-search"></i>
                        </div>
                    </div>
                </div>
            </header>
        </Headroom>
    );
}

export default Header;
