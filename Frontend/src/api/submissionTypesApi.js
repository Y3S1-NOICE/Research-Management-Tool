import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const createSubmissionType = (payload) => axios.post('/submissiontypes', payload);
export const fetchSubmissionTypes = () => axios.get('/submissiontypes');
export const updateSubmissionType = (queryParams, payload) => axios.put(`/submissiontypes?${queryParams}`, payload);
export const deleteSubmissionType = (queryParams) => axios.delete(`/submissiontypes?${queryParams}`);