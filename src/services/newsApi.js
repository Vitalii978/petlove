import api from './api';

const newsApi = {
  getNews: async ({ page = 1, limit = 6, keyword = '' } = {}) => {
    try {
      const params = {
        page,
        limit,
      };

      if (keyword.trim()) {
        params.keyword = keyword.trim();
      }

      const response = await api.get('/news', { params });

      return {
        success: true,
        data: response.data.results || [],
        pagination: {
          currentPage: response.data.page || page,
          totalPages: response.data.totalPages || 1,
          totalItems: (response.data.totalPages || 1) * limit,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: [],
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: 0,
        },
      };
    }
  },
};

export default newsApi;
