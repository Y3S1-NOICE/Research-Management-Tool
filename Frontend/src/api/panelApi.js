import axios from './axiosConfig';

export const fetchPanel = (queryParams) => axios.get(`/panels/details?${queryParams}`);
export const fetchAllPanels = () => axios.get(`/panels`);
export const addStudentGroups = (id, groupObj) => axios.put(`/panels/${id}/groups`, groupObj);