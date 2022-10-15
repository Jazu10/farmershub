import {
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
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
            console.log(action.payload);
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (i) => i.product !== action.payload,
                ),
            };

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;
    }
};
