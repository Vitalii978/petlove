// // src/App.jsx
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { lazy, Suspense, useState } from 'react';

// // 📁 СТАРЫЕ НАЗВАНИЯ
// import Layout from './components/Layout/Layout';
// import LoadingPage from './pages/LoadingPage/LoadingPage';
// import { isAuthenticated } from './utils/auth';
// import './App.css';

// // 🎯 ЛЕНИВАЯ ЗАГРУЗКА СТРАНИЦ
// const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
// const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
// const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
// const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
// const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
// const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
// const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
// const AddPetPage = lazy(() => import('./pages/AddPetPage/AddPetPage'));
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

// // 🎯 КОМПОНЕНТЫ ДЛЯ ТАБОВ
// const FavoritesList = lazy(
//   () => import('./components/FavoritesList/FavoritesList')
// );
// const ViewedList = lazy(() => import('./components/ViewedList/ViewedList'));

// // 🎯 ОБЕРТКА ДЛЯ ЗАГРУЗКИ
// function LoadingWrapper({ children }) {
//   const [loading, setLoading] = useState(true);

//   if (loading) {
//     return <LoadingPage onComplete={() => setLoading(false)} />;
//   }

//   return children;
// }

// // 🎯 ТВОИ МАРШРУТЫ
// const PrivateRoute = ({ children }) => {
//   const isAuth = isAuthenticated();
//   if (!isAuth) {
//     window.location.href = '/login';
//     return null;
//   }
//   return children;
// };

// const PublicRoute = ({ children, restricted = false }) => {
//   const isAuth = isAuthenticated();
//   if (restricted && isAuth) {
//     window.location.href = '/profile/favorites';
//     return null;
//   }
//   return children;
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <LoadingWrapper>
//         <Layout>
//           <Suspense
//             fallback={<div style={{ display: 'none' }}>Loading...</div>}
//           >
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/home" element={<HomePage />} />
//               <Route path="/news" element={<NewsPage />} />
//               <Route path="/notices" element={<NoticesPage />} />
//               <Route path="/friends" element={<FriendsPage />} />

//               <Route
//                 path="/login"
//                 element={
//                   <PublicRoute restricted={true}>
//                     <LoginPage />
//                   </PublicRoute>
//                 }
//               />

//               <Route
//                 path="/register"
//                 element={
//                   <PublicRoute restricted={true}>
//                     <RegisterPage />
//                   </PublicRoute>
//                 }
//               />

//               <Route
//                 path="/profile"
//                 element={
//                   <PrivateRoute>
//                     <ProfilePage />
//                   </PrivateRoute>
//                 }
//               >
//                 <Route path="favorites" element={<FavoritesList />} />
//                 <Route path="viewed" element={<ViewedList />} />
//               </Route>

//               <Route
//                 path="/add-pet"
//                 element={
//                   <PrivateRoute>
//                     <AddPetPage />
//                   </PrivateRoute>
//                 }
//               />

//               <Route path="*" element={<NotFoundPage />} />
//             </Routes>
//           </Suspense>
//         </Layout>
//       </LoadingWrapper>
//     </BrowserRouter>
//   );
// }

// export default App;

// Импорты из библиотек
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Маршрутизация
import { lazy, Suspense, useState } from 'react'; // Ленивая загрузка и состояние

// 📁 Наши компоненты
import Layout from './components/Layout/Layout'; // Общий макет сайта (шапка, подвал)
import LoadingPage from './pages/LoadingPage/LoadingPage'; // Страница загрузки
import { isAuthenticated } from './utils/auth'; // Проверка авторизации
import './App.css'; // Глобальные стили

// 🎯 ЛЕНИВАЯ ЗАГРУЗКА СТРАНИЦ
// Страницы загружаются только когда пользователь на них переходит
// Это ускоряет начальную загрузку сайта
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage'));
const FriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const AddPetPage = lazy(() => import('./pages/AddPetPage/AddPetPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

// 🎯 КОМПОНЕНТЫ ДЛЯ ТАБОВ В ПРОФИЛЕ
const FavoritesList = lazy(
  () => import('./components/FavoritesList/FavoritesList')
);
const ViewedList = lazy(() => import('./components/ViewedList/ViewedList'));

// 🎯 ОБЕРТКА ДЛЯ ЗАГРУЗКИ
// Этот компонент показывает LoadingPage при первом входе на сайт
function LoadingWrapper({ children }) {
  // Состояние loading: true - показываем загрузку, false - показываем сайт
  const [loading, setLoading] = useState(true);

  // Если загрузка еще не закончена
  if (loading) {
    // Показываем LoadingPage и передаем функцию, которая выключит загрузку
    return <LoadingPage onComplete={() => setLoading(false)} />;
  }

  // Если загрузка закончена - показываем весь сайт (children)
  return children;
}

// 🎯 ЗАЩИТА ПРИВАТНЫХ МАРШРУТОВ
// Этот компонент не пускает неавторизованных пользователей на страницы профиля
const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticated(); // Проверяем, есть ли токен
  if (!isAuth) {
    window.location.href = '/login'; // Если нет - кидаем на логин
    return null;
  }
  return children; // Если есть - показываем страницу
};

// 🎯 ЗАЩИТА ПУБЛИЧНЫХ МАРШРУТОВ
// Не пускает авторизованных пользователей на страницы логина/регистрации
const PublicRoute = ({ children, restricted = false }) => {
  const isAuth = isAuthenticated();
  if (restricted && isAuth) {
    window.location.href = '/profile/favorites'; // Кидаем в профиль
    return null;
  }
  return children;
};

// 🎯 ГЛАВНЫЙ КОМПОНЕНТ
function App() {
  return (
    // 🎯 BrowserRouter - включает маршрутизацию
    <BrowserRouter>
      {/* Оборачиваем всё в LoadingWrapper - сначала загрузка, потом сайт */}
      <LoadingWrapper>
        {/* Layout - общая структура (шапка, подвал) для всех страниц */}
        <Layout>
          {/* 🎯 Suspense - показывает fallback пока ленивая страница грузится */}
          <Suspense
            fallback={<div style={{ display: 'none' }}>Loading...</div>}
          >
            {/* Routes - контейнер для всех маршрутов */}
            <Routes>
              {/* Публичные маршруты (доступны всем) */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/notices" element={<NoticesPage />} />
              <Route path="/friends" element={<FriendsPage />} />

              {/* Маршруты для неавторизованных (restricted = true) */}
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
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              >
                {/* Вложенные маршруты для табов в профиле */}
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

              {/* Маршрут для 404 - если ни один путь не подошел */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </LoadingWrapper>
    </BrowserRouter>
  );
}

export default App;
