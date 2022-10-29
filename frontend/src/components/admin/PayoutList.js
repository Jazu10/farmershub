import React, { useEffect } from "react";
import { Loading, MetaData } from "..";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Sidebar } from "../";
import {
    allPayouts,
    updatePayout,
    clearErrors,
} from "../../actions/payoutActions";
import { UPDATE_PAYOUT_RESET } from "../../constants/payoutConstants";

const PayoutList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, payouts, isUpdated } = useSelector(
        (state) => state.payout,
    );

    useEffect(() => {
        dispatch(allPayouts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Payment Updated");
            dispatch({ type: UPDATE_PAYOUT_RESET });
        }
    }, [dispatch, alert, isUpdated, history, error]);

    const paymentHandler = (order, user) => {
        dispatch(updatePayout(order, user));
    };

    const columns = [
        { field: "id", headerName: "Payout ID", flex: 1, minWidth: 220 },
        { field: "order", headerName: "Order ID", flex: 1, minWidth: 220 },
        { field: "user", headerName: "User ID", flex: 1, minWidth: 220 },
        { field: "name", headerName: "Name", flex: 1, minWidth: 150 },

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
                if (cellValues.row.status === "Paid")
                    return (
                        <p className="p-2 py-1 rounded-full bg-green-400 text-white">
                            Paid
                        </p>
                    );
                else if (cellValues.row.status === "Not Paid")
                    return (
                        <p className="p-2 py-1 rounded-full bg-red-400 text-white">
                            Not Paid
                        </p>
                    );
            },
            flex: 1,
            minWidth: 100,
        },

        {
            field: "action",
            headerName: "Action",
            renderCell: (cellValues) => {
                if (cellValues.row.status === "Not Paid")
                    return (
                        <button
                            onClick={() =>
                                paymentHandler(
                                    cellValues.row.order,
                                    cellValues.row.user,
                                )
                            }
                            className="bg-blue-500 text-white px-3 py-2 rounded">
                            Pay
                        </button>
                    );
                else return "";
            },
            flex: 1,
            minWidth: 100,
        },
    ];

    const setPayouts = () => {
        const data = [];
        payouts &&
            payouts.forEach((payout) =>
                data.push({
                    id: payout._id,
                    order: payout.order,
                    user: payout.user._id,
                    name: payout.user.name,
                    mobile: payout.user.mobile,
                    amount: `${payout.amount}`,
                    status: payout.status,
                    action: payout._id,
                }),
            );
        return data;
    };

    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"All Payouts"} />
            <Sidebar />

            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="mt-4 text-2xl font-bold flex justify-center">
                        All Payout Requests
                    </h1>
                    <Box className="bg-white w-[90%] h-[65vh] mx-auto mt-10 rounded-md">
                        <DataGrid
                            rows={setPayouts()}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            experimentalFeatures={{ newEditingApi: false }}
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            initialState={{
                                sorting: {
                                    sortModel: [
                                        { field: "status", sort: "desc" },
                                    ],
                                },
                            }}
                        />
                    </Box>
                </>
            )}
        </div>
    );
};

export default PayoutList;
