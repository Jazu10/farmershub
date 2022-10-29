import React, { useEffect } from "react";
import { Loading, MetaData } from "..";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "../admin/Sidebar";
import { allUsers, deleteUser, clearErrors } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.user,
    );

    useEffect(() => {
        dispatch(allUsers());
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("User Deleted!");
            history.push("/admin/users");

            dispatch({ type: DELETE_USER_RESET });
        }
    }, [dispatch, alert, deleteError, isDeleted, history, error]);

    const columns = [
        { field: "id", headerName: "User ID", flex: 1, minWidth: 220 },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "mobile",
            headerName: "Phone No",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "role",
            headerName: "Role",
            renderCell: (cellValues) => {
                if (cellValues.row.role === "user")
                    return (
                        <p className="p-2 py-1 rounded-full bg-green-400 text-white">
                            Customer
                        </p>
                    );
                else if (cellValues.row.role === "seller")
                    return (
                        <p className="p-2 py-1 rounded-full bg-yellow-400 text-white">
                            Farmer
                        </p>
                    );
                else if (cellValues.row.role === "admin")
                    return (
                        <p className="p-2 py-1 rounded-full bg-red-500 text-white">
                            Admin
                        </p>
                    );
                else
                    return (
                        cellValues.row.role === "farmer" && (
                            <p className="p-2 py-1 rounded-full bg-red-500 text-white">
                                Farmer
                            </p>
                        )
                    );
            },
            flex: 1,
            minWidth: 100,
        },
        {
            field: "actions",
            headerName: "Action",
            renderCell: (cellValues) => {
                return (
                    <div className="flex flex-row space-x-4">
                        <Link to={`/admin/user/${cellValues.row.id}`}>
                            <button className="p-2 py-1 text-white bg-yellow-400 rounded-md">
                                <i className="fa fa-edit"></i>
                            </button>
                        </Link>

                        <button
                            onClick={() => deleteUserHandler(cellValues.row.id)}
                            className="p-2 py-1 text-white bg-red-500 rounded-md">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                );
            },
            flex: 1,
            minWidth: 100,
            sortable: false,
        },
    ];

    const setUsers = () => {
        const data = [];
        users &&
            users.forEach((user) =>
                data.push({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role,
                    actions: user._id,
                }),
            );
        return data;
    };

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };
    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"All Users"} />
            <Sidebar />

            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="mt-4 text-2xl font-bold flex justify-center">
                        All Users
                    </h1>
                    <Box className="bg-white w-[90%] h-[65vh] mx-auto mt-10 rounded-md">
                        <DataGrid
                            rows={setUsers()}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            experimentalFeatures={{ newEditingApi: false }}
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: "name", sort: "asc" }],
                                },
                            }}
                        />
                    </Box>
                </>
            )}
        </div>
    );
};

export default UsersList;
