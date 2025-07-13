import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // base URL of Spring Boot backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use an Axios Interceptor to add the JWT to every request
apiClient.interceptors.request.use(
  (config) => {
    // Get the auth token from local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default apiClient;