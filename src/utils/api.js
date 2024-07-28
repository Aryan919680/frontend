import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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

// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
// });

// const handleApiCall = async (apiCall) => {
//   try {
//     const response = await apiCall();
//     return response.data;
//   } catch (error) {
//     console.error('API call error:', error);
//     throw error;
//   }
// };

// export const registerUser = async (userData) => handleApiCall(() => api.post('/auth/register', userData));
// export const loginUser = async (userData) => handleApiCall(() => api.post('/auth/login', userData));
// export const getTasks = async () => handleApiCall(() => api.get('/tasks'));
// export const createTask = async (taskData) => handleApiCall(() => api.post('/tasks', taskData));
// export const updateTask = async (id, taskData) => handleApiCall(() => api.put(`/tasks/${id}`, taskData));
// export const deleteTask = async (id) => handleApiCall(() => api.delete(`/tasks/${id}`));

// export default api;
