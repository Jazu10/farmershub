import React, { useState } from "react";
import {
    ProSidebar,
    Menu,
    SubMenu,
    MenuItem,
    SidebarHeader,
    SidebarContent,
} from "react-pro-sidebar";

import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { Link } from "react-router-dom";

import "react-pro-sidebar/dist/css/styles.css";
import "../../Sidebar.css";

const Sidebar = () => {
    const [menuCollapse, setMenuCollapse] = useState(true);
    return (
        <>
            <div id="sidebar" className="top-36">
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
                                <Link className="" to="/dashboard">
                                    <p className="text-black">Dashboard</p>
                                </Link>
                            </MenuItem>
                            <SubMenu
                                icon={<FaList />}
                                title={"Products"}
                                className="bg-white">
                                <MenuItem>
                                    <Link className="" to="/admin/products">
                                        <p className="text-black">All</p>
                                    </Link>
                                </MenuItem>

                                <MenuItem>
                                    <Link className="" to="/admin/product">
                                        <p className="text-black">Create</p>
                                    </Link>
                                </MenuItem>
                            </SubMenu>

                            <MenuItem icon={<FaRegHeart />}>
                                <Link className="" to="/admin/orders">
                                    <p className="text-black">Orders</p>
                                </Link>
                            </MenuItem>

                            <MenuItem icon={<RiPencilLine />}>
                                <Link className="" to="/admin/users">
                                    <p className="text-black">Users</p>
                                </Link>
                            </MenuItem>

                            <MenuItem icon={<BiCog />}>
                                <Link className="" to="/admin/reviews">
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

export default Sidebar;
