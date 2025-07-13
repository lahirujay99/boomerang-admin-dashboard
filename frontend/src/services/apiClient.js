import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attaches the JWT to every outgoing request.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ** THE FIX IS HERE: A NEW RESPONSE INTERCEPTOR **
// This interceptor will run on every response coming back from the API.
apiClient.interceptors.response.use(
  // The first function handles successful responses - we just pass them through.
  (response) => {
    return response;
  },
  // The second function handles any API errors.
  (error) => {
    // Check if the error is specifically a 401 Unauthorized or 403 Forbidden error.
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log("Authentication error detected, logging out...");
      // Remove the invalid/expired token from storage.
      localStorage.removeItem('authToken');
      
      // Force a redirect to the login page.
      // Using window.location.href ensures a full page reload, clearing all component state.
      if (window.location.pathname !== '/login') {
          window.location.href = '/login';
      }
    }
    
    // For all other errors, just pass them along to be handled by the component.
    return Promise.reject(error);
  }
);


export default apiClient;