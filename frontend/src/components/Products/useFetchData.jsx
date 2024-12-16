import { useState, useEffect } from 'react';
import axios from 'axios';

// Generic custom hook for fetching data from any API endpoint
export const useFetchData = (url, initialData = []) => {
  // State management for data, loading, and error
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cancel token to handle request cancellation
    const source = axios.CancelToken.source();

    // Fetch data function
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch data with cancel token
        const response = await axios.get(url, {
          cancelToken: source.token
        });
        
        // Update state with fetched data
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        // Check if the error is not a cancellation
        if (!axios.isCancel(err)) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    // Call fetch function
    fetchData();

    // Cleanup function to cancel request if component unmounts
    return () => {
      source.cancel('Component unmounted');
    };
  }, [url]); // Re-fetch if URL changes

  // Function to manually refetch data if needed
  const refetch = () => {
    const source = axios.CancelToken.source();
    
    const reFetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, {
          cancelToken: source.token
        });
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    reFetchData();

    return () => {
      source.cancel('Refetch cancelled');
    };
  };

  // Return an object with data, loading state, error, and refetch function
  return { 
    data, 
    isLoading, 
    error, 
    refetch 
  };
};

export default useFetchData;