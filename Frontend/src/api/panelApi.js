import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:5000';
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const fetchPanel = (queryParams) => axios.get(`/panels/details?${queryParams}`);
export const fetchAllPanels = () => axios.get(`/panels`);
export const addStudentGroups = (id, groupObj) => axios.put(`/panels/${id}/groups`, groupObj);