import {
    CHECK_PAYOUT_REQUEST,
    CHECK_PAYOUT_SUCCESS,
    CHECK_PAYOUT_FAIL,
    NEW_PAYOUT_REQUEST,
    NEW_PAYOUT_SUCCESS,
    NEW_PAYOUT_RESET,
    NEW_PAYOUT_FAIL,
    ALL_PAYOUT_REQUEST,
    ALL_PAYOUT_SUCCESS,
    ALL_PAYOUT_FAIL,
    SELLER_PAYOUT_REQUEST,
    SELLER_PAYOUT_SUCCESS,
    SELLER_PAYOUT_FAIL,
    UPDATE_PAYOUT_REQUEST,
    UPDATE_PAYOUT_SUCCESS,
    UPDATE_PAYOUT_RESET,
    UPDATE_PAYOUT_FAIL,
    CLEAR_ERRORS,
} from "../constants/payoutConstants";

export const payoutReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_PAYOUT_REQUEST:
        case CHECK_PAYOUT_REQUEST:
        case SELLER_PAYOUT_REQUEST:
        case ALL_PAYOUT_REQUEST:
        case UPDATE_PAYOUT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CHECK_PAYOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                payoutDetails: action.payload,
            };
        case ALL_PAYOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                payouts: action.payload,
            };

        case SELLER_PAYOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                payouts: action.payload.payouts,
                subTotal: action.payload.subTotal,
            };

        case NEW_PAYOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
            };

        case UPDATE_PAYOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case NEW_PAYOUT_RESET:
            return {
                loading: false,
                success: false,
            };

        case UPDATE_PAYOUT_RESET:
            return {
                loading: false,
                isUpdated: false,
            };

        case NEW_PAYOUT_FAIL:
        case CHECK_PAYOUT_FAIL:
        case ALL_PAYOUT_FAIL:
        case SELLER_PAYOUT_FAIL:
        case UPDATE_PAYOUT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
