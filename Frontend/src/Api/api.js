import axios from 'axios';


const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Authentication Endpoints
export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);

// Task CRUD Endpoints
export const fetchTasks = (userId) => API.get(`/tasks/${userId}`);
export const createTask = (newTask) => API.post('/tasks/add', newTask);
export const updateTask = (id, updatedTask) => API.put(`/tasks/update/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/delete/${id}`);