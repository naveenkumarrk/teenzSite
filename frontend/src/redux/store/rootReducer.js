import { reducer as productReducer } from "../slices/ProductSlice";
import { reducer as UserReducer } from "../slices/UserSlice";
// import { reducer as orderReducer } from "../slices/orderSlice";
// import { reducer as CartReducer } from "../slices/cartSlice";
import {reducer as CartReducer} from "../slices/CartSlice"

import { combineReducers } from "@reduxjs/toolkit";


export const rootReducer = combineReducers({
  user: UserReducer,
  product: productReducer , // Update the import statement to use `.reducer`
//   order: orderReducer,+
  cart: CartReducer,
});
