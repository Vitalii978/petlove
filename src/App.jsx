// // src/App.jsx

// import { lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout/Layout';
// import './App.css';

// // 🎯 Импортируем простую функцию проверки
// import { isAuthenticated } from './utils/auth';

// // Компоненты (ленивая загрузка)
// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
// const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
// const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
// const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
// const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
// const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
// const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));

// // 🎯 ПРОСТОЙ компонент для приватных маршрутов
// const PrivateRoute = ({ children }) => {
//   const isAuth = isAuthenticated(); // Просто проверяем токен
  
//   if (!isAuth) {
//     // Если не авторизован - перенаправляем на логин
//     window.location.href = '/login';
//     return null;
//   }
  
//   return children;
// };

// // 🎯 ПРОСТОЙ компонент для публичных маршрутов
// const PublicRoute = ({ children, restricted = false }) => {
//   const isAuth = isAuthenticated();
  
//   if (restricted && isAuth) {
//     // Если авторизован и пытается зайти на логин/регистрацию - на профиль
//     window.location.href = '/profile';
//     return null;
//   }
  
//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Suspense fallback={<div>Загрузка...</div>}>
//           <Routes>
//             {/* Публичные маршруты */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/news" element={<NewsPage />} />
//             <Route path="/notices" element={<NoticesPage />} />
//             <Route path="/friends" element={<FriendsPage />} />
            
//             {/* Логин и регистрация (только для неавторизованных) */}
//             <Route path="/login" element={
//               <PublicRoute restricted={true}>
//                 <LoginPage />
//               </PublicRoute>
//             } />
            
//             <Route path="/register" element={
//               <PublicRoute restricted={true}>
//                 <RegisterPage />
//               </PublicRoute>
//             } />
            
//             {/* Профиль (только для авторизованных) */}
//             <Route path="/profile" element={
//               <PrivateRoute>
//                 <ProfilePage />
//               </PrivateRoute>
//             } />
            
//             {/* Если страница не найдена */}
//             <Route path="*" element={<div>404 - Page not found</div>} />
//           </Routes>
//         </Suspense>
//       </Layout>
//     </Router>
//   );
// }

// export default App;


// // src/App.jsx

// import { lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './components/Layout/Layout';
// import './App.css';

// // 🎯 Импортируем простую функцию проверки
// import { isAuthenticated } from './utils/auth';

// // Компоненты (ленивая загрузка)
// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
// const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
// const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
// const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
// const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
// const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
// const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));

// // 👇 ДОБАВЛЯЕМ ИМПОРТЫ ДЛЯ ВЛОЖЕННЫХ МАРШРУТОВ
// const FavoritesList = lazy(() => import('./components/FavoritesList/FavoritesList'));
// const ViewedList = lazy(() => import('./components/ViewedList/ViewedList'));

// // 🎯 ПРОСТОЙ компонент для приватных маршрутов
// const PrivateRoute = ({ children }) => {
//   const isAuth = isAuthenticated(); // Просто проверяем токен
  
//   if (!isAuth) {
//     // Если не авторизован - перенаправляем на логин
//     return <Navigate to="/login" replace />;
//   }
  
//   return children;
// };

// // 🎯 ПРОСТОЙ компонент для публичных маршрутов
// const PublicRoute = ({ children, restricted = false }) => {
//   const isAuth = isAuthenticated();
  
//   if (restricted && isAuth) {
//     // Если авторизован и пытается зайти на логин/регистрацию - на профиль
//     return <Navigate to="/profile" replace />;
//   }
  
//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Suspense fallback={<div className="loader">Загрузка...</div>}>
//           <Routes>
//             {/* Публичные маршруты */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/news" element={<NewsPage />} />
//             <Route path="/notices" element={<NoticesPage />} />
//             <Route path="/friends" element={<FriendsPage />} />
            
//             {/* Логин и регистрация (только для неавторизованных) */}
//             <Route path="/login" element={
//               <PublicRoute restricted={true}>
//                 <LoginPage />
//               </PublicRoute>
//             } />
            
//             <Route path="/register" element={
//               <PublicRoute restricted={true}>
//                 <RegisterPage />
//               </PublicRoute>
//             } />
            
//             {/* 👇 ИСПРАВЛЕННЫЙ МАРШРУТ ПРОФИЛЯ С ВЛОЖЕННЫМИ МАРШРУТАМИ */}
//             <Route path="/profile" element={
//               <PrivateRoute>
//                 <ProfilePage />
//               </PrivateRoute>
//             }>
//               {/* ВЛОЖЕННЫЕ МАРШРУТЫ - отображаются внутри ProfilePage через <Outlet /> */}
//               <Route path="favorites" element={<FavoritesList />} />
//               <Route path="viewed" element={<ViewedList />} />
//               {/* По умолчанию открываем favorites */}
//               <Route index element={<Navigate to="favorites" replace />} />
//             </Route>
            
//             {/* Если страница не найдена */}
//             <Route path="*" element={<div className="not-found">404 - Page not found</div>} />
//           </Routes>
//         </Suspense>
//       </Layout>
//     </Router>
//   );
// }

// export default App;



// 📁 src/App.jsx
// 🎯 ГЛАВНЫЙ ФАЙЛ МАРШРУТИЗАЦИИ

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './App.css';

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
const FavoritesList = lazy(() => import('./components/FavoritesList/FavoritesList'));
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
    window.location.href = '/profile';
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
            <Route path="/news" element={<NewsPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            
            {/* 🎯 МАРШРУТЫ ТОЛЬКО ДЛЯ НЕАВТОРИЗОВАННЫХ */}
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
            
            {/* 🎯 ПРИВАТНЫЕ МАРШРУТЫ (только для авторизованных) */}
            
            {/* ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ */}
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }>
              {/* ВЛОЖЕННЫЕ МАРШРУТЫ ДЛЯ ТАБОВ */}
              <Route path="favorites" element={<FavoritesList />} />
              <Route path="viewed" element={<ViewedList />} />
            </Route>
            
            {/* 🎯 👈 НОВЫЙ МАРШРУТ - ДОБАВЛЕНИЕ ПИТОМЦА */}
            <Route path="/add-pet" element={
              <PrivateRoute>
                <AddPetPage />
              </PrivateRoute>
            } />
            
            {/* 🎯 404 - СТРАНИЦА НЕ НАЙДЕНА */}
            <Route path="*" element={
              <div className="not-found">
                <h1>404 - Page not found</h1>
                <p>The page you are looking for does not exist.</p>
              </div>
            } />
            
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;