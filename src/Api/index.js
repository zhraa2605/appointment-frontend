export const API_URL = 'http://localhost:5000';  

import axios from 'axios';

const baseURL = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default baseURL;

