// src/components/MyNotices/MyNotices.jsx
// 🎯 КОМПОНЕНТ С ВКЛАДКАМИ ДЛЯ ПРОФИЛЯ
// ====================================================
// ЧТО ДЕЛАЕТ ЭТОТ КОМПОНЕНТ:
// 1. Отображает две вкладки: "My favorite pets" и "Viewed"
// 2. Подсвечивает активную вкладку
// 3. Показывает соответствующий контент (FavoritesList или ViewedList)
// 4. При загрузке активна вкладка "My favorite pets"
// ====================================================

import { Suspense, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './MyNotices.module.css';

export default function MyNotices() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🎯 При первом рендере проверяем, если мы на /profile (без /favorites или /viewed)
  // то перенаправляем на /profile/favorites
  useEffect(() => {
    if (location.pathname === '/profile') {
      navigate('/profile/favorites', { replace: true });
    }
  }, [location.pathname, navigate]);

  const buildLinkClass = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };

  return (
    // 🎯 РАЗМЕТКА КАК В ПРИМЕРЕ: используем <ul> вместо <div>
    <ul className={styles.myNotices}>
      {/* 🎯 ПЕРВЫЙ ЭЛЕМЕНТ СПИСКА: НАВИГАЦИЯ ПО ВКЛАДКАМ */}
      <li className={styles.boxNav}>
        <NavLink to="/profile/favorites" className={buildLinkClass}>
          My favorite pets
        </NavLink>
        <NavLink to="/profile/viewed" className={buildLinkClass}>
          Viewed
        </NavLink>
      </li>

      {/* 🎯 ВТОРОЙ ЭЛЕМЕНТ СПИСКА: КОНТЕНТ */}
      <li>
        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <Outlet />
        </Suspense>
      </li>
    </ul>
  );
}
