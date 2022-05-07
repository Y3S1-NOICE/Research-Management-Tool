import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const createSubmission = (queryParams, payload) => axios.put(`/submissions?${queryParams}`, payload);
export const getSubmission = (key) => axios.get(`/submissions/${key}`);