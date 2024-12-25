import axios from 'axios';

class ProductAPI {
  async getProductList() {
    try {
      const response = await axios.get(`/api/products`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
  
  async getProductDetails(productId) {
    try {
      const response = await axios.get(`/api/products/${productId}`)
      console.log(response)
      return response.data;      
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async createProductReview(productId, review) {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config
      );
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async getTopRatedProducts() {
    try {
      const { data } = await axios.get(`/api/products/top/`);
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
}

const productAPI = new ProductAPI();

export default productAPI;
