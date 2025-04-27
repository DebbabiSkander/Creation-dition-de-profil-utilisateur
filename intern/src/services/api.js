// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me')
};

// Profile services
export const profileService = {
  createProfile: (profileData) => api.post('/profiles', profileData),
  getProfiles: () => api.get('/profiles'),
  getMyProfile: () => api.get('/profiles/me'),
  getProfileByUserId: (userId) => api.get(`/profiles/user/${userId}`),
  deleteProfile: () => api.delete('/profiles'),
  updateCompetences: (competences) => api.put('/profiles/competences', { competences }),
  updateExperiences: (experiences) => api.put('/profiles/experiences', { experiences })
};

export default api;