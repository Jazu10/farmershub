import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    ProSidebar,
    Menu,
    SubMenu,
    MenuItem,
    SidebarHeader,
    SidebarContent,
} from "react-pro-sidebar";

import { FaList, FaStar, FaRupeeSign } from "react-icons/fa";
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiShoppingCartFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import "react-pro-sidebar/dist/css/styles.css";
import "../../Sidebar.css";

const SellerSidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const [menuCollapse, setMenuCollapse] = useState(true);
    return (
        <>
            <div id="sidebar" className="top-[12rem] opacity-70 md:opacity-100">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div
                            className="closemenu right-0 top-0 bg-yellow-400 p-2 -mr-2 -mt-2"
                            onClick={() => setMenuCollapse(!menuCollapse)}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle />
                            ) : (
                                <FiArrowLeftCircle />
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={true} icon={<FiHome />}>
                                <Link className="" to="/seller/dashboard">
                                    <p className="text-black">Dashboard</p>
                                </Link>
                            </MenuItem>
                            <SubMenu
                                icon={<FaList />}
                                title={"Products"}
                                className="bg-white">
                                <MenuItem>
                                    <Link
                                        className=""
                                        to={`/seller/products/${
                                            user && user._id
                                        }`}>
                                        <p className="text-black">All</p>
                                    </Link>
                                </MenuItem>

                                <MenuItem>
                                    <Link className="" to="/seller/product">
                                        <p className="text-black">Create</p>
                                    </Link>
                                </MenuItem>
                            </SubMenu>

                            <MenuItem icon={<RiShoppingCartFill />}>
                                <Link
                                    className=""
                                    to={`/seller/orders/${user && user._id}`}>
                                    <p className="text-black">Orders</p>
                                </Link>
                            </MenuItem>
                            <MenuItem icon={<FaRupeeSign />}>
                                <Link
                                    className=""
                                    to={`/seller/payouts/${user && user._id}`}>
                                    <p className="text-black">Payouts</p>
                                </Link>
                            </MenuItem>
                            <MenuItem icon={<FaStar />}>
                                <Link
                                    className=""
                                    to={`/seller/reviews/${user && user._id}`}>
                                    <p className="text-black">Reviews</p>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </SidebarContent>
                </ProSidebar>
            </div>
        </>
    );
};

export default SellerSidebar;
