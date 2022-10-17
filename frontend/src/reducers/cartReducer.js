import {
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    SAVE_SHIPPING_INFO,
    SAVE_PRICE_INFO,
    EMPTY_CART,
} from "../constants/cartConstants";

export const cartReducer = (
    state = { cartItems: [], shippingInfo: {}, priceInfo: {} },
    action,
) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(
                (items) => items.product === item.product,
            );
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((items) =>
                        items.product === isItemExist.product ? item : items,
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (i) => i.product !== action.payload,
                ),
            };

        case EMPTY_CART:
            return {
                ...state,
                cartItems: [],
                priceInfo: {},
            };

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        case SAVE_PRICE_INFO:
            return {
                ...state,
                priceInfo: action.payload,
            };

        default:
            return state;
    }
};
