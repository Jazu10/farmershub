import React from "react";
import Headroom from "react-headroom";
import { Link } from "react-router-dom";
import { Search, MSearch } from "../../components";
import { Route } from "react-router-dom";

function Header() {
    return (
        <Headroom>
            <header className="header bg-gray-200 bg-clip-border backdrop-filter backdrop-blur-3xl bg-opacity-20 top-0 w-full sticky">
                <nav className="nav mx-auto max-w-screen-2xl flex py-2 px-4 md:py-6 w-full items-center justify-between md:justify-around">
                    {/* <!-- logo --> */}
                    <Link to="/">
                        <div className="logo flex">
                            <div className="hidden lg:flex font-bold text-3xl font-elianto cursor-pointer">
                                Farmer's Hub
                            </div>
                            <div className="logo font-bold text-3xl md:text-4xl lg:hidden font-elianto cursor-pointer">
                                FH
                            </div>
                        </div>
                    </Link>

                    {/* <!-- search --> */}
                    <div className="search hidden md:flex md:w-3/5">
                        <Route
                            render={({ history }) => (
                                <Search history={history} />
                            )}
                        />
                    </div>

                    {/* <!-- nav links --> */}
                    <div className="flex">
                        <ul className="nav flex items-center justify-evenly px-2  md:space-x-6 text-lg font-semibold">
                            <li className="hover:bg-gray-300 px-4 py-2 rounded">
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
                            <li className="hover:bg-gray-300 -mr-4 px-4 py-2 rounded">
                                <Link to="/login" className="">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Route
                    render={({ history }) => <MSearch history={history} />}
                />
            </header>
        </Headroom>
    );
}

export default Header;
