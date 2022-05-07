import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const createTemplate = (payload) => axios.post('templates/', payload);
export const fetchTemplates = (filter) => axios.get(`templates/${filter || ''}`);
export const editTemplates = (tempId, payload) => axios.put(`templates?id=${tempId}`, payload);
export const deleteTemplate = (tempId) => axios.delete(`templates?id=${tempId}`);