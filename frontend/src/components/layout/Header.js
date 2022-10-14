import React from "react";
import Headroom from "react-headroom";
import { Link } from "react-router-dom";
import { Search, MSearch } from "../../components";
import { Route } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
function Header() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success("Logged out successfully!");
    };
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
                        <ul className="nav flex items-center justify-between px-2 space-x-3 md:space-x-6 text-lg font-semibold">
                            <Link to="/cart">
                                <li className="hover:bg-gray-400 px-4 py-2 rounded">
                                    Cart
                                </li>
                            </Link>
                            {user ? (
                                <li className="">
                                    <div className="group inline-block relative">
                                        <button className="inline-flex items-center bg-gray-300 space-x-3 hover:bg-gray-400 p-2 rounded-md">
                                            <img
                                                src={
                                                    user.avatar &&
                                                    user.avatar.url
                                                }
                                                height={30}
                                                width={30}
                                                className="h-[30px] w-[30px] rounded-full ring-2 ring-yellow-500 object-cover"
                                                alt=""
                                            />
                                            <span className="hidden lg:flex">
                                                {user && user.name}
                                            </span>
                                        </button>
                                        <ul className="dropdown bg-white border-gray-300 border-2 rounded-md absolute hidden text-gray-700 group-hover:block w-44 -mx-[7.5rem] lg:-mx-11">
                                            <li className="">
                                                {user &&
                                                user.role === "admin" ? (
                                                    <Link
                                                        to="/dashboard"
                                                        className="dropelements rounded-t-md hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
                                                        Dashboard
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        to="/orders/me"
                                                        className="dropelements rounded-t-md hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
                                                        Orders
                                                    </Link>
                                                )}
                                            </li>
                                            <li className="">
                                                <Link
                                                    to="/me"
                                                    className="dropelements hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link
                                                    to="/"
                                                    onClick={logoutHandler}
                                                    className="dropelements rounded-b-md text-red-500 hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ) : (
                                !loading && (
                                    <Link to="/login" className="">
                                        <li className="hover:bg-gray-300 -mr-4 px-4 py-2 rounded">
                                            Login
                                        </li>
                                    </Link>
                                )
                            )}
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
