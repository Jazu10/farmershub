import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./reducers/productReducer";

const reducers = combineReducers({
    products: productReducer,
});

const initialState = {};
const middlewares = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
