import { useState, useEffect, useCallback } from 'react';

// Custom hook to manage auth token in localStorage
export const useAuthToken = (): [string | null, (token: string | null) => void] => {
  // State to store the auth token
  const [authToken, setAuthToken] = useState<string | null>(() => {
    // Retrieve the token from localStorage on initial render
    return localStorage.getItem('authToken');
  });

  // Effect to listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      // Update the authToken whenever localStorage changes
      setAuthToken(localStorage.getItem('authToken'));
    };

    // Subscribe to localStorage change event
    window.addEventListener('storage', handleStorageChange);

    // Clean up the subscription on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Run effect only on mount and unmount

  // Function to set the auth token in localStorage
  const setToken = useCallback((token: string | null) => {
    if (token) {
      // Store the token in localStorage if provided
      localStorage.setItem('authToken', token);
    } else {
      // If token is not provided or null, remove it from localStorage
      localStorage.removeItem('authToken');
    }

    // Update the authToken state
    setAuthToken(token);
  }, []);

  // Return the authToken and the function to set the authToken
  return [authToken, setToken];
};
