import React, { useEffect } from "react";
import { Loading, MetaData } from "..";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Sidebar from "../admin/Sidebar";
import {
    allOrders,
    deleteOrder,
    clearErrors,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.order,
    );

    useEffect(() => {
        dispatch(allOrders());
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Order deleted, Refund has been initiated");
            history.push("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }
    }, [dispatch, alert, deleteError, isDeleted, history, error]);

    const columns = [
        { field: "id", headerName: "Order ID", flex: 1, minWidth: 220 },
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
                        $ {cellValues.row.amount}
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
                if (cellValues.row.status === "Delivered")
                    return (
                        <p className="p-2 py-1 rounded-full bg-green-400 text-white">
                            {cellValues.row.status}
                        </p>
                    );
                else if (cellValues.row.status === "Shipped")
                    return (
                        <p className="p-2 py-1 rounded-full bg-yellow-500 text-white">
                            {cellValues.row.status}
                        </p>
                    );
                else
                    return (
                        cellValues.row.status === "Processing" && (
                            <p className="p-2 py-1 rounded-full bg-red-500 text-white">
                                {cellValues.row.status}
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
                        <Link to={`/order/${cellValues.row.id}`}>
                            <i className="fa fa-eye p-2 text-white bg-blue-500 rounded-md"></i>
                        </Link>
                        <Link to={`/admin/order/${cellValues.row.id}`}>
                            <button className="p-2 py-1 text-white bg-yellow-400 rounded-md">
                                <i className="fa fa-edit"></i>
                            </button>
                        </Link>
                        {cellValues.row.status === "Processing" && (
                            <button
                                onClick={() =>
                                    deleteOrderHandler(cellValues.row.id)
                                }
                                className="p-2 py-1 text-white bg-red-500 rounded-md">
                                <i className="fa fa-trash"></i>
                            </button>
                        )}
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
                    numofItems: order.orderItems.length,
                    amount: `${order.totalPrice}`,
                    status: order.orderStatus,
                    actions: order._id,
                }),
            );
        return data;
    };

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };
    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"All Orders"} />
            <Sidebar />

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

export default OrdersList;
