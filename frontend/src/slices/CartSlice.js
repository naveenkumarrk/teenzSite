import { createSlice } from "@reduxjs/toolkit";

const MAX_QUANTITY = 20;

const initialState = {
  userInfo: [],
  products: [],
  totalAmount: 0,
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        if (item.quantity < MAX_QUANTITY) {
          item.quantity += 1;
          state.totalAmount += item.price;
        }
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
        state.totalAmount += action.payload.price;
      }
    },
    updateQuantity: (state, action) => {
      const { productID, quantity } = action.payload;
      const itemToUpdate = state.products.find(
        (item) => item._id === productID
      );
      if (itemToUpdate) {
        const difference = quantity - itemToUpdate.quantity;
        if (quantity <= MAX_QUANTITY) {
          itemToUpdate.quantity = quantity;
          state.totalAmount += difference * itemToUpdate.price;
        } else {
          itemToUpdate.quantity = MAX_QUANTITY;
          state.totalAmount +=
            (MAX_QUANTITY - itemToUpdate.quantity) * itemToUpdate.price;
        }
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity < MAX_QUANTITY) {
        item.quantity++;
        state.totalAmount += item.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
          state.totalAmount -= item.price;
        }
      }
    },
    deleteItem: (state, action) => {
      const itemToDelete = state.products.find(
        (item) => item._id === action.payload
      );
      if (itemToDelete) {
        state.totalAmount -= itemToDelete.price * itemToDelete.quantity;
      }
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
} = CartSlice.actions;

export const selectCartItems = (state) => state.cart.products;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default CartSlice.reducer;
