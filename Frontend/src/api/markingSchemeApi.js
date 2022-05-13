import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:5000';
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const createMarkingScheme = (payload) => axios.post('/markingSchemes', payload);
export const fetchMarkingSchemes = () => axios.get('/markingSchemes');