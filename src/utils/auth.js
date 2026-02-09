// src/utils/auth.js

// 1. Проверка авторизации
export function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}

// 2. Получить данные пользователя
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }
    
    const response = await fetch('https://petlove.b.goit.study/api/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, user: data };
    } else {
      return { success: false, error: 'Failed to get user' };
    }
  } catch {
    return { success: false, error: 'Network error' };
  }
}

// 3. Регистрация
export async function register(userData) {
  try {
    const response = await fetch('https://petlove.b.goit.study/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      return { success: true, user: data };
    } else {
      let errorMessage = 'Registration failed';
      if (data.message) errorMessage = data.message;
      return { success: false, error: errorMessage };
    }
  } catch {
    return { success: false, error: 'No internet connection' };
  }
}

// 4. Вход
export async function login(credentials) {
  try {
    const response = await fetch('https://petlove.b.goit.study/api/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      return { success: true, user: data };
    } else {
      let errorMessage = 'Login failed';
      if (data.message) errorMessage = data.message;
      return { success: false, error: errorMessage };
    }
  } catch {
    return { success: false, error: 'No internet connection' };
  }
}