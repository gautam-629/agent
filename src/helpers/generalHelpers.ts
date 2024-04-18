import { toast } from "react-toastify";

export const storeAuthToken = (token: string | null) => {
    // Check if token is provided
    if (token) {
      // Store the token in localStorage
      localStorage.setItem('authToken', token);
    } else {
      // If token is not provided or null, remove it from localStorage
      localStorage.removeItem('authToken');
    }
  };
  
  export const getAuthToken = (): string | null => {
    // Retrieve the token from localStorage
    return localStorage.getItem('authToken');
  };
  

export const showError = (message: string) => {
   return toast.error(message);
  };

 export const showSuccess = (message: string) => {
   return toast.success(message);
  };
