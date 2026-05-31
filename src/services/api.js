import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout
});

// Request Interceptor: Menyematkan accessToken ke setiap request jika ada
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === '/authentications') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const res = await axios.put(
            `${API_BASE_URL}/authentications`,
            { refreshToken },
            {
              headers: { 'Content-Type': 'application/json' },
            },
          );

          const newAccessToken = res.data?.data?.accessToken;
          if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.dispatchEvent(new Event('auth:logout'));
        }
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.dispatchEvent(new Event('auth:logout'));
      }
    }
    return Promise.reject(error);
  },
);

// endpoints
export const authAPI = {
  // Register User
  register: (data) => axiosInstance.post('/users', data),

  // Login User
  login: (data) => axiosInstance.post('/authentications', data),

  // Refresh Token
  refreshToken: (data) => axiosInstance.put('/authentications', data),

  // Logout User
  logout: (data) => axiosInstance.delete('/authentications', { data }),

  // Logout All
  logoutAll: (data) => axiosInstance.delete('/authentications/all', { data }),
};

export const profileAPI = {
  // Get Profile
  getProfile: () => axiosInstance.get('/profiles'),

  // Create Profile (Dokumentasi menulis GET namun method yang lazim adalah POST karena ada request body untuk response 201 Created)
  createProfile: (data) => axiosInstance.post('/profiles', data),

  // Update Profile
  updateProfile: (data) => axiosInstance.put('/profiles', data),
};

export const predictAPI = {
  // Predict from image
  predict: (formData) =>
    axiosInstance.post('/predict', formData, {
      headers: {
        'Content-Type': undefined,
      },
    }),

  // Get Predict Logs with filter & pagination
  getPredictLogs: (page = 1, limit = 15, filter = 'all') => axiosInstance.get(`/predict?page=${page}&limit=${limit}&filter=${filter}`),
};

export const mealAPI = {
  // Get Meals with filter & pagination
  getMeals: (page = 1, limit = 15, filter = 'all') => axiosInstance.get(`/meals?page=${page}&limit=${limit}&filter=${filter}`),

  // Create Meal from predict log (kirim hanya predictLogId)
  createMealFromPredict: (data) => axiosInstance.post('/meals/from-predict', data),

  // Create Meal (manual)
  createMeal: (data) => axiosInstance.post('/meals', data),

  // Update Meal
  updateMeal: (mealId, data) => axiosInstance.put(`/meals/${mealId}`, data),

  // Delete Meal
  deleteMeal: (mealId) => axiosInstance.delete(`/meals/${mealId}`),
};

export const nutritionAPI = {
  getNutritionDaily: () => axiosInstance.get('/nutrition/daily-summary'),
};

export default axiosInstance;
