import {
    CHECK_PAYOUT_REQUEST,
    CHECK_PAYOUT_SUCCESS,
    CHECK_PAYOUT_FAIL,
    NEW_PAYOUT_REQUEST,
    NEW_PAYOUT_SUCCESS,
    NEW_PAYOUT_FAIL,
    ALL_PAYOUT_REQUEST,
    ALL_PAYOUT_SUCCESS,
    ALL_PAYOUT_FAIL,
    SELLER_PAYOUT_REQUEST,
    SELLER_PAYOUT_SUCCESS,
    SELLER_PAYOUT_FAIL,
    UPDATE_PAYOUT_REQUEST,
    UPDATE_PAYOUT_SUCCESS,
    UPDATE_PAYOUT_FAIL,
    CLEAR_ERRORS,
} from "../constants/payoutConstants";
import axios from "axios";

export const checkPayout = (order, user) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        dispatch({ type: CHECK_PAYOUT_REQUEST });
        const { data } = await axios.post(
            `/api/v1/seller/payout`,
            { order, user },
            config,
        );
        dispatch({ type: CHECK_PAYOUT_SUCCESS, payload: data.payout });
    } catch (error) {
        dispatch({
            type: CHECK_PAYOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const newPayout = (payoutData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        dispatch({ type: NEW_PAYOUT_REQUEST });
        const { data } = await axios.post(
            `/api/v1/seller/payout/new`,
            payoutData,
            config,
        );
        dispatch({ type: NEW_PAYOUT_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: NEW_PAYOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const sellerPayouts = (id) => async (dispatch) => {
    try {
        dispatch({ type: SELLER_PAYOUT_REQUEST });
        const { data } = await axios.get(`/api/v1/seller/payouts/${id}`);
        dispatch({ type: SELLER_PAYOUT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SELLER_PAYOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const allPayouts = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PAYOUT_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/payouts`);
        dispatch({ type: ALL_PAYOUT_SUCCESS, payload: data.payouts });
    } catch (error) {
        dispatch({
            type: ALL_PAYOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updatePayout = (order, user) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        dispatch({ type: UPDATE_PAYOUT_REQUEST });
        const { data } = await axios.put(
            `/api/v1/admin/payout/update`,
            { order: order, user: user },
            config,
        );
        dispatch({ type: UPDATE_PAYOUT_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_PAYOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
