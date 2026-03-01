// src/App.jsx
// 🎯 ГОЛОВНИЙ ФАЙЛ МАРШРУТИЗАЦІЇ
// ✅ ДОДАНО: Toaster для сповіщень
// ====================================================
// Що робить цей файл:
// 1. Налаштовує всі маршрути сайту
// 2. Керує лоадером при першому завантаженні
// 3. Захищає приватні маршрути від неавторизованих
// 4. Ліниво завантажує сторінки для швидкодії
// 5. Додає Toaster для сповіщень (тільки там, де потрібно)
// ====================================================

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { Toaster } from 'react-hot-toast'; // 👈 ДОДАНО
// 🔥 lazy - для лінивого завантаження сторінок
// 🔥 Suspense - показує заглушку поки сторінка вантажиться
// 🔥 useState - для стану лоадера
// 🔥 Toaster - для сповіщень

// 📁 Наши компоненти
import Layout from './components/Layout/Layout';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import { isAuthenticated } from './utils/auth';
import './App.css';

// 🎯 ЛІНИВЕ ЗАВАНТАЖЕННЯ СТОРІНОК
// ====================================================
// Чому ми це робимо?
// Бо не хочемо завантажувати ВСІ сторінки одразу.
// Користувач може ніколи не зайти на сторінку реєстрації,
// то навіщо її завантажувати?
// ====================================================
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const AddPetPage = lazy(() => import('./pages/AddPetPage/AddPetPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

// 🎯 КОМПОНЕНТИ ДЛЯ ВКЛАДОК В ПРОФІЛІ
const FavoritesList = lazy(
  () => import('./components/FavoritesList/FavoritesList')
);
const ViewedList = lazy(() => import('./components/ViewedList/ViewedList'));

// 🎯 ОБГОРТКА ДЛЯ ЛОАДЕРА
// ====================================================
// Цей компонент показує LoadingPage ТІЛЬКИ один раз
// при першому відкритті вкладки браузера.
//
// Чому sessionStorage? Тому що він живе тільки в межах
// однієї вкладки. Закрив вкладку - все скинулось.
// ====================================================
function LoadingWrapper({ children }) {
  // 🔥 Ініціалізація стану через функцію
  // Це гарантує, що код виконається ТІЛЬКИ один раз
  const [showLoader, setShowLoader] = useState(() => {
    // Перевіряємо, чи ми вже показували лоадер в цій вкладці
    const loaderShown = sessionStorage.getItem('loaderShown');
    console.log('📋 Перевіряємо sessionStorage:', loaderShown);

    // Якщо ще не показували - повертаємо true (показати лоадер)
    // Якщо вже показували - повертаємо false (не показувати)
    return !loaderShown;
  });

  // Функція, яка викличеться з компонента LoadingPage
  // коли анімація лоадера завершиться
  const handleComplete = () => {
    console.log('✅ Лоадер завершив роботу');
    // Запам'ятовуємо в sessionStorage, що лоадер вже показували
    sessionStorage.setItem('loaderShown', 'true');
    // Ховаємо лоадер
    setShowLoader(false);
  };

  // Якщо showLoader = true - показуємо лоадер
  if (showLoader) {
    return <LoadingPage onComplete={handleComplete} />;
  }

  // Якщо showLoader = false - показуємо весь сайт
  return children;
}

// 🎯 ЗАХИСТ ПРИВАТНИХ МАРШРУТІВ
// ====================================================
// Не пускає неавторизованих користувачів на сторінки
// профілю, додавання тварин тощо.
// ====================================================
const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    console.log('🚫 Неавторизований доступ до приватного маршруту');
    window.location.href = '/login';
    return null;
  }

  return children;
};

// 🎯 ЗАХИСТ ПУБЛІЧНИХ МАРШРУТІВ
// ====================================================
// Не пускає авторизованих користувачів на сторінки
// логіну та реєстрації. restricted = true означає,
// що цей маршрут заборонений для авторизованих.
// ====================================================
const PublicRoute = ({ children, restricted = false }) => {
  const isAuth = isAuthenticated();

  if (restricted && isAuth) {
    console.log('🚫 Авторизований намагається зайти на login/register');
    window.location.href = '/profile/favorites';
    return null;
  }

  return children;
};

// 🎯 ГОЛОВНИЙ КОМПОНЕНТ
function App() {
  return (
    // 🎯 BrowserRouter - включає маршрутизацію
    <BrowserRouter>
      {/* 🎯 Toaster - для сповіщень по всьому сайту */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Загальні налаштування для всіх сповіщень
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#333333',
            border: '2px solid #10b981',
            borderRadius: '50px',
            padding: '12px 24px',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: '500',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          // Налаштування для помилок (червоні)
          error: {
            duration: 5000,
            style: {
              border: '2px solid #ef4444',
              background: '#fee2e2',
              color: '#dc2626',
            },
          },
        }}
      />

      {/* 🎯 LoadingWrapper - показує лоадер при першому завантаженні */}
      <LoadingWrapper>
        {/* 🎯 Layout - загальна структура (шапка, підвал) для всіх сторінок */}
        <Layout>
          {/* 🎯 Suspense - показує fallback поки лінива сторінка вантажиться */}
          <Suspense
            fallback={<div style={{ display: 'none' }}>Loading...</div>}
          >
            {/* 🎯 Routes - контейнер для всіх маршрутів */}
            <Routes>
              {/* 🏠 ПУБЛІЧНІ МАРШРУТИ (доступні всім) */}
              {/* ======================================== */}
              <Route path="/" element={<HomePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/friends" element={<FriendsPage />} />

              {/* 🔐 МАРШРУТИ ДЛЯ НЕАВТОРИЗОВАНИХ */}
              {/* ======================================== */}
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

              {/* 👤 ПРИВАТНІ МАРШРУТИ (тільки для авторизованих) */}
              {/* ======================================== */}
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              >
                {/* Вкладені маршрути для вкладок в профілі */}
                <Route path="favorites" element={<FavoritesList />} />
                <Route path="viewed" element={<ViewedList />} />
              </Route>

              <Route
                path="/add-pet"
                element={
                  <PrivateRoute>
                    <AddPetPage />
                  </PrivateRoute>
                }
              />

              {/* 404 - СТОРІНКА НЕ ЗНАЙДЕНА */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </LoadingWrapper>
    </BrowserRouter>
  );
}

export default App;
