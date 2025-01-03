import { createSlice } from '@reduxjs/toolkit';
import productAPI from '../../mocks/product';

const initialState = {   
  productList: { products: [], loading: false, error: null },
  productDetails: {product:[], loading: false, error: null}
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productListRequest(state) {
      state.productList.loading = true;
      state.productList.error = null;
    },
    productListSuccess(state, action) {
      state.productList.loading = false;
      state.productList.products = action.payload.products;
    },
    productListFailure(state, action) {
      state.productList.loading = false;
      state.productList.error = action.payload;
    },
    productDetailsRequest(state) {
      state.productDetails.loading = true;
      state.productDetails.error = null;
    },
    productDetailsSuccess(state, action) {
      state.productDetails.loading = false;
      state.productDetails.product = action.payload;
    },
    productDetailsFailure(state, action) {
      state.productDetails.loading = false;
      state.productDetails.error = action.payload;
    },
    createReviewRequest(state) {
      state.createReview.loading = true;
      state.createReview.error = null;
      state.createReview.success = false;
    },
    createReviewSuccess(state) {
      state.createReview.loading = false;
      state.createReview.success = true;
    },
    createReviewFailure(state, action) {
      state.createReview.loading = false;
      state.createReview.error = action.payload;
    },
    productTopRequest(state) {
      state.topRatedProducts.loading = true;
      state.topRatedProducts.error = null;
    },
    productTopSuccess(state, action) {
      state.topRatedProducts.loading = false;
      state.topRatedProducts.products = action.payload;
    },
    productTopFailure(state, action) {
      state.topRatedProducts.loading = false;
      state.topRatedProducts.error = action.payload;
    },
  },
});

export const {
  productListRequest,
  productListSuccess,
  productListFailure,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
  productTopRequest,
  productTopSuccess,
  productTopFailure,
} = productSlice.actions;

export const fetchProductList = () => async (dispatch) => {
  try {
    dispatch(productListRequest());
    const productList = await productAPI.getProductList();
    dispatch(productListSuccess({products:productList}));
  } catch (error) {
    dispatch(productListFailure(error.response?.data.detail || error.message));
  }
};

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRequest());
    const productDetails = await productAPI.getProductDetails(id);
    dispatch(productDetailsSuccess(productDetails));
  } catch (error) {
    dispatch(productDetailsFailure(error.response?.data.detail || error.message));
  }
};

export const createReview = (productId, review) => async (dispatch) => {
  try {
    dispatch(createReviewRequest());
    
    await productAPI.createProductReview(productId, review );
    dispatch(createReviewSuccess());
  } catch (error) {
    dispatch(createReviewFailure(error.response?.data.detail || error.message));
  }
};

export const fetchTopRatedProducts = () => async (dispatch) => {
  try {
    dispatch(productTopRequest());
    const topRatedProducts = await productAPI.getTopRatedProducts();
    dispatch(productTopSuccess(topRatedProducts));
  } catch (error) {
    dispatch(productTopFailure(error.response?.data.detail || error.message));
  }
};

export const { reducer } = productSlice;
export default productSlice;
