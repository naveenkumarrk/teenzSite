import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { productsListReducers } from "./reducers/productReducers";

const reducer = combineReducers({
    productsList: productsListReducers,
});

const initialState = {};
// const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    // composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
