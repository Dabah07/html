import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Request Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.message || `HTTP error! status: ${error.response.status}`;
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request made but no response received
      throw new Error('No response received from server');
    } else {
      // Something else happened
      throw new Error('Request setup error');
    }
  }
);

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-watch.jpg'; // fallback image
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it starts with /public, remove it since Next.js serves from public folder
  if (imagePath.startsWith('/public/')) {
    return `${API_BASE_URL}${imagePath}`;
  }
  
  // If it's just a filename, assume it's in public folder
  return `${API_BASE_URL}/public/${imagePath}`;
};

// API endpoints
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: `/api/products`,
  PRODUCT_BY_ID: (id) => `/api/products/${id}`,
  
  // Auth
  LOGIN: `/login`,
  REGISTER: `/register`,
  ACCOUNT: `/account`,
  
  // Orders
  ORDERS: `/api/orders`,
  ORDER_BY_ID: (id) => `/api/orders/${id}`,
  
  // Contacts
  CONTACTS: `/contacts`,
};

// HTTP methods helper using axios
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await apiClient({
      url,
      ...options,
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Specific HTTP method helpers
export const apiGet = async (url, config = {}) => {
  return apiRequest(url, { method: 'GET', ...config });
};

export const apiPost = async (url, data = {}, config = {}) => {
  return apiRequest(url, { method: 'POST', data, ...config });
};

export const apiPut = async (url, data = {}, config = {}) => {
  return apiRequest(url, { method: 'PUT', data, ...config });
};

export const apiDelete = async (url, config = {}) => {
  return apiRequest(url, { method: 'DELETE', ...config });
};

export { apiClient };
export default API_BASE_URL;
