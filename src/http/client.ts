import axios from 'axios';
// import { getAuthToken } from '../helpers/generalHelpers';
// import { useAuthToken } from '../hooks/useAuthToken';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
}); 


// export const apiInstance = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_API_URL,
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       'X-Access-Token': `${getAuthToken()}`
//     }
//   });