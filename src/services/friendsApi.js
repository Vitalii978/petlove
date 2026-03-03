import api from './api';

const friendsApi = {
  getFriends: async () => {
    try {
      const response = await api.get('/friends');

      return {
        success: true,
        data: response.data || [],
      };
    } catch (error) {
      let errorMessage = 'Failed to load partners';

      if (error.response) {
        errorMessage = `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'No connection to server';
      }

      return {
        success: false,
        error: errorMessage,
        data: [],
      };
    }
  },

  getFriendById: async id => {
    try {
      const response = await api.get(`/friends/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: 'Failed to load partner',
        data: null,
      };
    }
  },
};

export default friendsApi;
