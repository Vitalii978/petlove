import api from './api';

const authApi = {
  register: async userData => {
    try {
      const response = await api.post('/users/signup', userData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      let errorMessage = 'Registration failed';

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 409) {
          errorMessage = 'User with this email already exists';
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid registration data';
        }
      } else if (error.request) {
        errorMessage = 'No connection to server';
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  login: async credentials => {
    try {
      const response = await api.post('/users/signin', credentials);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      let errorMessage = 'Login failed';

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (error.response.status === 404) {
          errorMessage = 'User not found';
        }
      } else if (error.request) {
        errorMessage = 'No connection to server';
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/users/signout');

      localStorage.removeItem('token');

      return {
        success: true,
        data: response.data,
      };
    } catch {
      localStorage.removeItem('token');

      return {
        success: false,
        error: 'Logout failed',
      };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/current');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
      }

      return {
        success: false,
        error: 'Failed to get user data',
        data: null,
      };
    }
  },

  getCurrentUserFull: async () => {
    try {
      const response = await api.get('/users/current/full');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
      }

      return {
        success: false,
        error: 'Failed to get full user information',
        data: null,
      };
    }
  },
};

export default authApi;
