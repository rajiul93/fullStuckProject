/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

// Base URL configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Public API instance (no authentication required)
export const publicAPI: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Secure API instance (authentication required)
export const secureAPI: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for secure API (add auth token)
secureAPI.interceptors.request.use(
  (config) => {
    // Add auth token from cookies
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth_token='))
      ?.split('=')[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor for secure API (handle auth errors)
secureAPI.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear auth_token cookie and redirect to login
      document.cookie =
        'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

// Response interceptor for both APIs (global error handling)
const handleGlobalError = (error: AxiosError) => {
  console.error('API Error:', error);

  // Handle different error status codes
  switch (error.response?.status) {
    case 403:
      console.error('Access forbidden');
      break;
    case 404:
      console.error('Resource not found');
      break;
    case 500:
      console.error('Internal server error');
      break;
    default:
      console.error('API request failed');
  }

  return Promise.reject(error);
};

// Add global error handler to both instances
publicAPI.interceptors.response.use((response) => response, handleGlobalError);

// Export default instances
export default {
  public: publicAPI,
  secure: secureAPI,
};
