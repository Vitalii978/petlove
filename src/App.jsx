import './App.css';
import Header from './components/Header/Header'; // Импортируем Header
import './components/Header/Header.css';  // Импортируем стили Header
import HomePage from './pages/HomePage/HomePage.jsx';  // Добавили импорт HomePage
import './pages/HomePage/HomePage.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // 1. Импортируем инструменты
import NewsPage from './pages/NewsPage/NewsPage.jsx';  // Добавили импорт NewsPage
import './pages/NewsPage/NewsPage.css';
import NoticesPage from './pages/NoticesPage/NoticesPage.jsx';
import './pages/NoticesPage/NoticesPage.css';
import FriendsPage from './pages/FriendsPage/FriendsPage.jsx';  // Добавили импорт FriendsPage
import './pages/FriendsPage/FriendsPage.css'; 
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import './pages/RegisterPage/RegisterPage.css'; 
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import './pages/LoginPage/LoginPage.css';


function App() {
  return (
    // 2. Оборачиваем всё в BrowserRouter (коробка для страниц)
    <BrowserRouter>
    <div className="App">
        {/* Вставляем наш Header компонент */}
      <Header />
      {/* 3. Routes - оглавление нашего сайта */}
      <Routes>
                  {/* 4. Route - одна страница
              path="/" - адрес страницы
              element={<HomePage />} - что показывать на этой странице */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

          {/* 5. Остальные страницы добавим позже
          <Route path="/news" element={<NewsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          */}

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
