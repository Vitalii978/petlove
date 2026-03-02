import { Suspense, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './MyNotices.module.css';

export default function MyNotices() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/profile') {
      navigate('/profile/favorites', { replace: true });
    }
  }, [location.pathname, navigate]);

  const buildLinkClass = ({ isActive }) => {
    return clsx(styles.link, isActive && styles.active);
  };

  return (
    <ul className={styles.myNotices}>
      <li className={styles.boxNav}>
        <NavLink to="/profile/favorites" className={buildLinkClass}>
          My favorite pets
        </NavLink>
        <NavLink to="/profile/viewed" className={buildLinkClass}>
          Viewed
        </NavLink>
      </li>

      <li>
        <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
          <Outlet />
        </Suspense>
      </li>
    </ul>
  );
}
