import api from './api';

const noticesApi = {
  getNotices: async ({
    page = 1,
    limit = 12,
    keyword = '',
    category = '',
    sex = '',
    species = '',
    locationId = '',
    byDate = false,
    byPrice = false,
    byPopularity = false,
  } = {}) => {
    try {
      const params = {
        page,
        limit,
        ...(keyword.trim() && { keyword: keyword.trim() }),
        ...(category && { category }),
        ...(sex && { sex }),
        ...(species && { species }),
        ...(locationId && { locationId }),
      };

      if (byPopularity === 'popular') {
        params.sortBy = 'popularity';
        params.sortOrder = 'desc';
      } else if (byPopularity === 'unpopular') {
        params.sortBy = 'popularity';
        params.sortOrder = 'asc';
      } else if (byPopularity === true) {
        params.sortBy = 'popularity';
        params.sortOrder = 'desc';
      }

      if (byPrice === 'expensive') {
        params.sortBy = 'price';
        params.sortOrder = 'desc';
      } else if (byPrice === 'cheap') {
        params.sortBy = 'price';
        params.sortOrder = 'asc';
      } else if (byPrice === true) {
        params.sortBy = 'price';
        params.sortOrder = 'asc';
      }

      if (byDate) {
        params.sortBy = 'date';
        params.sortOrder = 'desc';
      }

      const response = await api.get('/notices', { params });

      return {
        success: true,
        data: response.data.results || [],
        pagination: {
          currentPage: response.data.page || page,
          perPage: response.data.perPage || limit,
          totalPages: response.data.totalPages || 1,
          totalItems: (response.data.totalPages || 1) * limit,
        },
      };
    } catch (error) {
      let errorMessage = 'Failed to load notices';

      if (error.response) {
        errorMessage = `Server error: ${error.response.status}`;
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        errorMessage = 'No connection to server';
      }

      return {
        success: false,
        error: errorMessage,
        data: [],
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: 0,
        },
      };
    }
  },

  getAllNotices: async (limit = 100) => {
    try {
      const response = await api.get('/notices', {
        params: { limit, page: 1 },
      });

      return {
        success: true,
        data: response.data.results || [],
      };
    } catch {
      return {
        success: false,
        data: [],
      };
    }
  },

  getFiltersData: async () => {
    try {
      const [categories, sex, species, cities] = await Promise.all([
        api.get('/notices/categories'),
        api.get('/notices/sex'),
        api.get('/notices/species'),
        api.get('/cities/locations'),
      ]);

      return {
        success: true,
        data: {
          categories: categories.data || [],
          sex: sex.data || [],
          species: species.data || [],
          cities: cities.data || [],
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: {
          categories: [],
          sex: [],
          species: [],
          cities: [],
        },
      };
    }
  },

  getNoticeById: async id => {
    try {
      const response = await api.get(`/notices/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: 'Failed to load notice',
        data: null,
      };
    }
  },

  addToFavorites: async id => {
    try {
      const response = await api.post(`/notices/favorites/add/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      let errorMessage = 'Failed to add to favorites';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  removeFromFavorites: async id => {
    try {
      const response = await api.delete(`/notices/favorites/remove/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      let errorMessage = 'Failed to remove from favorites';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },
};

export default noticesApi;
