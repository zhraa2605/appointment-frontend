export const API_URL = 'https://appointment-backend-6xb4.onrender.com';  

import axios from 'axios';

const baseURL = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default baseURL;

