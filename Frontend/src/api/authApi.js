import axios from 'axios';
// import dotenv from "dotenv";

// dotenv.config();

axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:5000';
// axios.defaults.headers.common['Authorization']

export const login = (authObj) => axios.post('/login', authObj);
