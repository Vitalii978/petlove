// src/utils/auth.js
import api from '../services/api'; // ✅ Импортируем наш axios instance

// 1. Проверка авторизации
export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}

// 2. Получить данные пользователя (базовые - БЕЗ питомцев)
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }
    
    const response = await api.get('/users/current');
    
    return {
      success: true,
      user: response.data
    };
    
  } catch (error) {
    console.error('❌ Ошибка при получении пользователя:', error);
    
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get user'
    };
  }
}

// ✅ НОВАЯ ФУНКЦИЯ: Получить ПОЛНЫЕ данные пользователя (С ПИТОМЦАМИ!)
export async function getCurrentUserFull() {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }
    
    console.log('🔄 Загружаем ПОЛНЫЕ данные пользователя с /users/current/full');
    
    // 🟢 ВАЖНО! Используем другой эндпоинт!
    const response = await api.get('/users/current/full');
    
    console.log('✅ Получены данные с питомцами:', response.data);
    console.log('🐕 Количество питомцев:', response.data.pets?.length || 0);
    
    return {
      success: true,
      user: response.data
    };
    
  } catch (error) {
    console.error('❌ Ошибка при получении ПОЛНЫХ данных:', error);
    
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get full user data'
    };
  }
}

// 3. Регистрация
export async function register(userData) {
  try {
    console.log('🔄 Регистрируем пользователя через api...');
    
    const response = await api.post('/users/signup', userData);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('✅ Токен сохранен');
    }
    
    return {
      success: true,
      user: response.data
    };
    
  } catch (error) {
    console.error('❌ Ошибка при регистрации:', error);
    
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
      error: errorMessage
    };
  }
}

// 4. Вход
export async function login(credentials) {
  try {
    console.log('🔄 Входим в систему...');
    
    const response = await api.post('/users/signin', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('✅ Токен сохранен');
    }
    
    return {
      success: true,
      user: response.data
    };
    
  } catch (error) {
    console.error('❌ Ошибка при входе:', error);
    
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
      error: errorMessage
    };
  }
}

// 5. Выход
export async function logout() {
  try {
    console.log('🔄 Выходим из системы...');
    
    const response = await api.post('/users/signout');
    
    console.log('✅ Выход успешен:', response.data);
    
  } catch (error) {
    console.error('❌ Ошибка при выходе:', error);
  } finally {
    localStorage.removeItem('token');
    console.log('🗑️ Токен удален из localStorage');
  }
}

// 6. Получить токен (помощник)
export function getToken() {
  return localStorage.getItem('token');
}