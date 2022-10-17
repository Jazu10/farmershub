import React, { useEffect } from "react";
import { Loading, MetaData } from "..";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const ListOrrder = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector((state) => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

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
                return cellValues.row.status === "Delivered" ? (
                    <p className="p-2 py-1 rounded-full border-2 border-green-400 text-green-400">
                        {cellValues.row.status}
                    </p>
                ) : (
                    <p className="p-2 py-1 rounded-full border-2 border-red-500 text-red-500">
                        {cellValues.row.status}
                    </p>
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
                    <Link to={`/order/${cellValues.row.id}`}>
                        <i className="fa fa-eye p-2 text-white bg-blue-500 rounded-md"></i>
                    </Link>
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

    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"My Orders"} />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="mt-4 text-2xl font-bold flex justify-center">
                        My Orders
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

export default ListOrrder;
