import React, { useEffect } from "react";
import { Loading, MetaData } from "..";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { SellerSidebar } from "../";
import { sellerPayouts, clearErrors } from "../../actions/payoutActions";

const SellerPayoutList = ({ match, history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, payouts } = useSelector((state) => state.payout);

    const userId = match.params.id;

    useEffect(() => {
        dispatch(sellerPayouts(userId));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, history, userId, error]);

    const columns = [
        { field: "id", headerName: "Payout ID", flex: 1, minWidth: 220 },
        { field: "order", headerName: "Order ID", flex: 1, minWidth: 220 },
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
    ];

    const setPayouts = () => {
        const data = [];
        payouts &&
            payouts.forEach((payout) =>
                data.push({
                    id: payout._id,
                    order: payout.order,
                    amount: `${payout.amount}`,
                    status: payout.status,
                }),
            );
        return data;
    };

    return (
        <div className="max-w-screen-2xl mx-auto">
            <MetaData title={"All Payouts"} />
            <SellerSidebar />

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

export default SellerPayoutList;
