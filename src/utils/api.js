import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://backend-bz7f.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);
export const getTasks = () => api.get('/tasks');
export const createTask = (taskData) => api.post('/tasks', taskData);
export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;

