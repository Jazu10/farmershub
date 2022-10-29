import React, { useEffect } from "react";
import { Loading, MetaData } from "..";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { SellerSidebar } from "../";
import { sellerOrders, clearErrors } from "../../actions/orderActions";

const SellerOrdersList = ({ match, history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.allOrders);

    const userId = match.params.id;

    useEffect(() => {
        dispatch(sellerOrders(userId));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, history, userId, error]);

    const columns = [
        { field: "id", headerName: "Order ID", flex: 1, minWidth: 220 },
        { field: "user", headerName: "Ordered By", flex: 1, minWidth: 220 },
        {
            field: "numofItems",
            headerName: "Num Of Items",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "amount",
            headerName: "Amount",
            renderCell: (cellValues) => {
                return (
                    <p className="font-bold text-blue-600 p-2 py-1 rounded-md bg-gray-200">
                        ₹ {cellValues.row.amount}
                    </p>
                );
            },
            flex: 1,
            minWidth: 100,
        },
        {
            field: "status",
            headerName: "Status",
            renderCell: (cellValues) => {
                if (cellValues.row.status === "Processing")
                    return (
                        <p className="p-2 py-1 rounded-full bg-red-500 text-white">
                            Processing
                        </p>
                    );
                else if (cellValues.row.status === "Shipped")
                    return (
                        <p className="p-2 py-1 rounded-full bg-yellow-400 text-white">
                            Shipped
                        </p>
                    );
                else if (cellValues.row.status === "Refunded")
                    return (
                        <p className="p-2 py-1 rounded-full bg-red-500 text-white">
                            Cancelled
                        </p>
                    );
                else if (cellValues.row.status === "Delivered")
                    return (
                        <p className="p-2 py-1 rounded-full bg-green-400 text-white">
                            Delivered
                        </p>
                    );
                else return "";
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
                        <Link to={`/seller/order/${cellValues.row.id}`}>
                            <i className="fa fa-eye p-2 text-white bg-blue-500 rounded-md"></i>
                        </Link>
                        {/* {["Processing", "Shipped"].includes(
                            cellValues.row.status,
                        ) && (
                            <Link to={`/admin/order/${cellValues.row.id}`}>
                                <button className="p-2 py-1 text-white bg-yellow-400 rounded-md">
                                    <i className="fa fa-edit"></i>
                                </button>
                            </Link>
                        )}
                        {cellValues.row.status === "Processing" && (
                            <button
                                onClick={() =>
                                    deleteOrderHandler(cellValues.row.id)
                                }
                                className="p-2 py-1 text-white bg-red-500 rounded-md">
                                <i className="fa fa-trash"></i>
                            </button>
                        )} */}
                    </div>
                );
            },
            flex: 1,
            minWidth: 100,
            sortable: false,
        },
    ];

    const setOrders = () => {
        const data = [];
        orders &&
            orders.forEach((order) =>
                data.push({
                    id: order._id,
                    user: order.user.name,
                    numofItems: order.orderItems.length,
                    amount: `${order.totalPrice}`,
                    status: order.orderStatus,
                    actions: order._id,
                }),
            );
        return data;
    };

    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"All Orders"} />
            <SellerSidebar />

            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="mt-4 text-2xl font-bold flex justify-center">
                        All Orders
                    </h1>
                    <Box className="bg-white w-[90%] h-[65vh] mx-auto mt-10 rounded-md">
                        <DataGrid
                            rows={setOrders()}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            experimentalFeatures={{ newEditingApi: false }}
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: "id", sort: "desc" }],
                                },
                            }}
                        />
                    </Box>
                </>
            )}
        </div>
    );
};

export default SellerOrdersList;
