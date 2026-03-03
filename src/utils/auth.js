import api from '../services/api';

export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }

    const response = await api.get('/users/current');

    return {
      success: true,
      user: response.data,
    };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }

    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get user',
    };
  }
}

export async function getCurrentUserFull() {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }

    const response = await api.get('/users/current/full');

    return {
      success: true,
      user: response.data,
    };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }

    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get full user data',
    };
  }
}

export async function register(userData) {
  try {
    const response = await api.post('/users/signup', userData);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return {
      success: true,
      user: response.data,
    };
  } catch (error) {
    let errorMessage = 'Registration failed';

    if (error.response) {
      if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 409) {
        errorMessage = 'User with this email already exists';
      } else if (error.response.status === 400) {
        errorMessage = 'Invalid data';
      }
    } else if (error.request) {
      errorMessage = 'No internet connection';
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function login(credentials) {
  try {
    const response = await api.post('/users/signin', credentials);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return {
      success: true,
      user: response.data,
    };
  } catch (error) {
    let errorMessage = 'Login failed';

    if (error.response) {
      if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.status === 401) {
        errorMessage = 'Wrong email or password';
      } else if (error.response.status === 404) {
        errorMessage = 'User not found';
      }
    } else if (error.request) {
      errorMessage = 'No internet connection';
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function logout() {
  try {
    await api.post('/users/signout');
  } catch (error) {
    console.warn('Logout API error (ignored):', error);
  } finally {
    localStorage.removeItem('token');
  }
}

export function getToken() {
  return localStorage.getItem('token');
}
