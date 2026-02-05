// src/services/newsApi.js
import api from './api';

const newsApi = {
  getNews: async ({ page = 1, limit = 6, query = '' } = {}) => {
    try {
      const params = { page, limit };
      if (query.trim()) params.query = query;
      
      const response = await api.get('/news', { params });
      
      return {
        success: true,
        data: response.data.results || [],
        pagination: {
          currentPage: response.data.page || page,
          totalPages: response.data.totalPages || 1,
          totalItems: response.data.total || 0,
        },
      };
    } catch (error) {
      console.error('Ошибка API:', error);
      return {
        success: false,
        error: error.message || 'Ошибка сети',
        data: [],
        pagination: { currentPage: page, totalPages: 1, totalItems: 0 },
      };
    }
  },
};

export default newsApi;