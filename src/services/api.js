import axiosInstance from '../lib/axios';

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

  // Create Profile
  createProfile: (data) => axiosInstance.post('/profiles', data),

  // Update Profile
  updateProfile: (data) => axiosInstance.put('/profiles', data),

  // get akg references
  getAKGReferences: (age, gender, pregnancyTrimester, breastfeedingStage) => axiosInstance.get(`/profiles/default-akg?age=${age}&gender=${gender}&pregnancyTrimester=${pregnancyTrimester}&breastfeedingStage=${breastfeedingStage}`),
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

  // Delete Predict Log
  deletePredictLog: (id) => axiosInstance.delete(`/predict/${id}`),
};

export const mealAPI = {
  // Get Meals with filter & pagination
  getMeals: (page = 1, limit = 15, filter = 'all') => axiosInstance.get(`/meals?page=${page}&limit=${limit}&filter=${filter}`),

  // Create Meal from predict log (kirim hanya predictLogId)
  createMealFromPredict: (data) => axiosInstance.post('/meals/from-predict', data),

  // Create Meal (manual)
  createMeal: (data) => axiosInstance.post('/meals', data, { headers: { 'Content-Type': undefined } }),

  // Update Meal
  updateMeal: (mealId, data) => axiosInstance.put(`/meals/${mealId}`, data, { headers: { 'Content-Type': undefined } }),

  // Delete Meal
  deleteMeal: (mealId) => axiosInstance.delete(`/meals/${mealId}`),

  // Get recommendations based on recent meal
  getRecommendations: (recentMealCalorie) => axiosInstance.get(`/meals/recomendation?recentMealCalorie=${recentMealCalorie}`),
};

export const nutritionAPI = {
  getNutritionDaily: () => axiosInstance.get('/nutrition/daily-summary'),
  getNutritionWeekly: () => axiosInstance.get('/nutrition/weekly-summary'),
};

export const userAPI = {
  // Update fullname only (PUT /users/fullname)
  updateFullname: (userId, fullname) => axiosInstance.put('/users/fullname', { fullname }),

  // Update avatar photo (PUT /users/avatar, multipart/form-data)
  updateAvatar: (formData) =>
    axiosInstance.put('/users/avatar', formData, {
      headers: { 'Content-Type': undefined },
    }),
};

export const foodAPI = {
  searchFoods: (query) => axiosInstance.get(`/foods/search?q=${query}`),
  getFoodNutrition: (name) => axiosInstance.get(`/foods/${name}`),
};

export default axiosInstance;
