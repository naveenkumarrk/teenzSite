import axios from "axios";
import {
    PRODUCTS_LIST_FAIL,
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
} from "../constants/productsConstants";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_LIST_REQUEST });
        const { data } = await axios.get(`/api/products`);
        dispatch({
            type: PRODUCTS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({
            type: PRODUCTS_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail 
                : error.message,
        });
    }
};
