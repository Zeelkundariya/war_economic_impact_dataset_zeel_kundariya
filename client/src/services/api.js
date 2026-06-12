import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    
    // Auto-logout on 401 Unauthorized (invalid/expired session)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      
      // We can trigger a window reload or dispatch logout event
      if (typeof window !== 'undefined') {
        // Broadcast custom event so Redux store can handle it
        window.dispatchEvent(new Event('auth-expired'));
      }
    }
    
    // Format error message for easier frontend consumption
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject({
      status: error.response?.status,
      message,
      data: error.response?.data,
    });
  }
);

export default api;
