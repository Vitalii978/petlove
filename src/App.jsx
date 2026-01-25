// Базовые импорты
import React, { lazy } from 'react'; // Импортируем React И lazy вместе
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.css';

// Ленивая загрузка страниц
// lazy() позволяет загружать компоненты только когда они нужны
// Это улучшает производительность - не загружаем все страницы сразу
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));

// Временные заглушки для страниц которые еще не созданы
const TempPage = ({ title }) => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h1>{title}</h1>
    <p>Эта страница будет создана позже</p>
  </div>
);

function App() {
  return (
    // Router должен оборачивать ВСЕ, что использует маршрутизацию
    <Router>
      {/* Layout будет отображаться на всех страницах */}
      <Layout>
        {/* Routes содержит все маршруты нашего приложения */}
        <Routes>
          {/* Каждый Route связывает путь (path) с компонентом (element) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;