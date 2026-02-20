// 📁 src/App.jsx
// 🎯 ГЛАВНЫЙ ФАЙЛ МАРШРУТИЗАЦИИ
// ✅ ИСПРАВЛЕНО: добавлена настоящая страница 404 вместо заглушки

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.css';

// 🎯 ИМПОРТ СТРАНИЦЫ 404
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// 🎯 ЛЕНИВАЯ ЗАГРУЗКА СТРАНИЦ (для производительности)
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));

// 🎯 НОВАЯ СТРАНИЦА - AddPetPage
const AddPetPage = lazy(() => import('./pages/AddPetPage/AddPetPage'));

// 🎯 КОМПОНЕНТЫ ДЛЯ ТАБОВ В ПРОФИЛЕ
const FavoritesList = lazy(
  () => import('./components/FavoritesList/FavoritesList')
);
const ViewedList = lazy(() => import('./components/ViewedList/ViewedList'));

// 🎯 ПРОВЕРКА АВТОРИЗАЦИИ
import { isAuthenticated } from './utils/auth';

// 🎯 КОМПОНЕНТ ДЛЯ ЗАЩИТЫ ПРИВАТНЫХ МАРШРУТОВ
const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    window.location.href = '/login';
    return null;
  }

  return children;
};

// 🎯 КОМПОНЕНТ ДЛЯ ПУБЛИЧНЫХ МАРШРУТОВ (логин/регистрация)
const PublicRoute = ({ children, restricted = false }) => {
  const isAuth = isAuthenticated();

  if (restricted && isAuth) {
    window.location.href = '/profile/favorites'; // 👈 ВАЖНО: редирект на /profile/favorites
    return null;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        {/* 🎯 Suspense показывает "Загрузка..." пока страница грузится */}
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            {/* 🎯 ПУБЛИЧНЫЕ МАРШРУТЫ (доступны всем) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />{' '}
            {/* 👈 АЛИАС ДЛЯ ГЛАВНОЙ */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            {/* 🎯 МАРШРУТЫ ТОЛЬКО ДЛЯ НЕАВТОРИЗОВАННЫХ */}
            <Route
              path="/login"
              element={
                <PublicRoute restricted={true}>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute restricted={true}>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            {/* 🎯 ПРИВАТНЫЕ МАРШРУТЫ (только для авторизованных) */}
            {/* ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            >
              {/* ВЛОЖЕННЫЕ МАРШРУТЫ ДЛЯ ТАБОВ */}
              <Route path="favorites" element={<FavoritesList />} />
              <Route path="viewed" element={<ViewedList />} />
            </Route>
            {/* 🎯 👈 НОВЫЙ МАРШРУТ - ДОБАВЛЕНИЕ ПИТОМЦА */}
            <Route
              path="/add-pet"
              element={
                <PrivateRoute>
                  <AddPetPage />
                </PrivateRoute>
              }
            />
            {/* 🎯 404 - СТРАНИЦА НЕ НАЙДЕНА (используем настоящий компонент) */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
