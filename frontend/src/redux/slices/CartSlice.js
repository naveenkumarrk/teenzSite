// import { createSlice } from "@reduxjs/toolkit";

// const MAX_QUANTITY = 20;

// const initialState = {
//   userInfo: [],
//   products: [],
//   totalAmount: 0,
//   shippingAddress: {} // Initialize as empty object
// };

// export const CartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = state.products.find((item) => item._id === action.payload._id);
//       if (item) {
//         if (item.quantity < MAX_QUANTITY) {
//           item.quantity += 1;
//           state.totalAmount += item.price;
//         }
//       } else {
//         state.products.push({ ...action.payload, quantity: 1 });
//         state.totalAmount += action.payload.price;
//       }
//     },
//     updateQuantity: (state, action) => {
//       const { productID, quantity } = action.payload;
//       const itemToUpdate = state.products.find((item) => item._id === productID);
//       if (itemToUpdate) {
//         const difference = quantity - itemToUpdate.quantity;
//         itemToUpdate.quantity = Math.min(quantity, MAX_QUANTITY);
//         state.totalAmount += difference * itemToUpdate.price;
//       }
//     },
//     increaseQuantity: (state, action) => {
//       const item = state.products.find((item) => item._id === action.payload._id);
//       if (item && item.quantity < MAX_QUANTITY) {
//         item.quantity++;
//         state.totalAmount += item.price;
//       }
//     },
//     decreaseQuantity: (state, action) => {
//       const item = state.products.find((item) => item._id === action.payload._id);
//       if (item && item.quantity > 1) {
//         item.quantity--;
//         state.totalAmount -= item.price;
//       }
//     },
//     deleteItem: (state, action) => {
//       const itemToDelete = state.products.find((item) => item._id === action.payload);
//       if (itemToDelete) {
//         state.totalAmount -= itemToDelete.price * itemToDelete.quantity;
//         state.products = state.products.filter((item) => item._id !== action.payload);
//       }
//     },
//     resetCart: (state) => {
//       state.products = [];
//       state.totalAmount = 0;
//     },
//     setShippingAddress(state, action) {
//       state.shippingAddress = action.payload;
//       localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
//     },
//   },
// });

// export const {
//   addToCart,
//   updateQuantity,
//   increaseQuantity,
//   decreaseQuantity,
//   deleteItem,
//   resetCart,
//   setShippingAddress,
// } = CartSlice.actions;

// export const selectCartItems = (state) => state.cart.products;
// export const selectCartTotalAmount = (state) => state.cart.totalAmount;

// export const saveShippingAddress = (data) => (dispatch) => {
//   dispatch(setShippingAddress(data));
// };

// export const { reducer } = CartSlice;
// export default CartSlice;




import { createSlice } from "@reduxjs/toolkit";
import cartAPI from "../../mocks/cart";

const MAX_QUANTITY = 20;
const CartSlice = createSlice({

  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingAddress: {},
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
      console.log(state.cartItems)
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },
    removeCartItem(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { productID, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item._id === productID);
      if (itemToUpdate) {
        const difference = quantity - itemToUpdate.qty;
        itemToUpdate.qty = Math.min(Math.max(quantity, 1), MAX_QUANTITY); // Ensure within range
        state.totalAmount += difference * itemToUpdate.price;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    setShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
  },
});

export const {
  setCartItems,
  removeCartItem,
  setShippingAddress,
  setPaymentMethod,
  updateQuantity,
} = CartSlice.actions;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { cartItems } = getState().cart;
    const product = await cartAPI.fetchProduct(id);

    let existingItemIndex = -1;

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]._id === id) {
        existingItemIndex = i;
        break;
      }
    }

    if (existingItemIndex !== -1) {
      // If an item with the same product ID exists, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].qty += qty;
      dispatch(setCartItems(updatedCartItems));
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      dispatch(setCartItems([...cartItems, { ...product, qty }]));
    }
  } catch (error) {
    console.log("Error adding item to cart:", error);
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch(removeCartItem(id));
  } catch (error) {
    console.log("Error removing item from cart:", error);
  }
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(setShippingAddress(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(setPaymentMethod(data));
};

export const { reducer } = CartSlice;
export default CartSlice;
