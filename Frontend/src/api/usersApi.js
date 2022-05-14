import axios from 'axios';

// axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:5000';
// axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const registerUser = (userObj) => axios.post('/users', userObj);
export const findUsers = (queryParams) => axios.get(`/users?${queryParams}`);
export const updateUser = (userId, userObj) => axios.put(`/users?id=${userId}`, userObj);
export const deleteUser = (userId) => axios.delete(`/users?id=${userId}`);
export function sum(a, b) {
    return a + b;
  }
