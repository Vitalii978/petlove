// // Базовые импорты
// import React, { lazy } from 'react'; // Импортируем React И lazy вместе
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout/Layout';
// import './App.css';

// // Ленивая загрузка страниц
// // lazy() позволяет загружать компоненты только когда они нужны
// // Это улучшает производительность - не загружаем все страницы сразу
// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
// const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
// const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
// const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
// const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
// const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
// // const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
// // const TestSearchField = lazy(() => import('./test/TestSearchField'));
// // const TestNewsComponents = lazy(() => import('./test/TestNewsComponents'));
// const TestNews = lazy(() => import('./test/TestNews.jsx'));
// // Временные заглушки для страниц которые еще не созданы
// const TempPage = ({ title }) => (
//   <div style={{ padding: '50px', textAlign: 'center' }}>
//     <h1>{title}</h1>
//     <p>Эта страница будет создана позже</p>
//   </div>
// );

// function App() {
//   return (
//     // Router должен оборачивать ВСЕ, что использует маршрутизацию
//     <Router>
//       {/* Layout будет отображаться на всех страницах */}
//       <Layout>
//         {/* Routes содержит все маршруты нашего приложения */}
//         <Routes>
//           {/* Каждый Route связывает путь (path) с компонентом (element) */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/news" element={<NewsPage />} />
//           <Route path="/notices" element={<NoticesPage />} />
//           <Route path="/friends" element={<FriendsPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           {/* <Route path="/profile" element={<TempPage title="Profile Page" />} /> */}
//           {/* <Route path="/test-search" element={<TestSearchField />} />
//           <Route path="/test-news-components" element={<TestNewsComponents />} /> */}
//           <Route path="/test-news" element={<TestNews />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// }

// export default App;




// src/App.jsx

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.css';

// 🎯 Импортируем простую функцию проверки
import { isAuthenticated } from './utils/auth';

// Компоненты (ленивая загрузка)
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
// const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));

// 🎯 ПРОСТОЙ компонент для приватных маршрутов
const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticated(); // Просто проверяем токен
  
  if (!isAuth) {
    // Если не авторизован - перенаправляем на логин
    window.location.href = '/login';
    return null;
  }
  
  return children;
};

// 🎯 ПРОСТОЙ компонент для публичных маршрутов
const PublicRoute = ({ children, restricted = false }) => {
  const isAuth = isAuthenticated();
  
  if (restricted && isAuth) {
    // Если авторизован и пытается зайти на логин/регистрацию - на профиль
    window.location.href = '/profile';
    return null;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            {/* Публичные маршруты */}
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            
            {/* Логин и регистрация (только для неавторизованных) */}
            <Route path="/login" element={
              <PublicRoute restricted={true}>
                <LoginPage />
              </PublicRoute>
            } />
            
            <Route path="/register" element={
              <PublicRoute restricted={true}>
                <RegisterPage />
              </PublicRoute>
            } />
            
            {/* Профиль (только для авторизованных) */}
            <Route path="/profile" element={
              <PrivateRoute>
                <div style={{ padding: '50px', textAlign: 'center' }}>
                  <h1>Profile Page</h1>
                  <p>This page will be created later</p>
                </div>
              </PrivateRoute>
            } />
            
            {/* Если страница не найдена */}
            <Route path="*" element={<div>404 - Page not found</div>} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;