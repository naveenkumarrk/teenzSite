import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook to fetch single product details
export const useSingleProduct = (id, apiBaseUrl = 'https://fakestoreapi.com/products') => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if id is provided
    if (!id) {
      setError('No product ID provided');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch product details from the specified API
        const response = await axios.get(`${apiBaseUrl}/${id}`);
        setProduct(response.data);
      } catch (err) {
        // Handle different types of errors
        if (err.response) {
          // The request was made and the server responded with a status code
          setError(err.response.data.message || `Failed to fetch product: ${err.response.status}`);
        } else if (err.request) {
          // The request was made but no response was received
          setError('No response received from server');
        } else {
          // Something happened in setting up the request
          setError(err.message || 'An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, apiBaseUrl]);

  // Method to manually refetch the product
  const refetch = () => {
    if (id) {
      fetchProduct();
    }
  };

  return {
    product,
    loading,
    error,
    refetch
  };
};
