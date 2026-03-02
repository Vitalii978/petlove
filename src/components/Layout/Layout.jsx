import React from 'react';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
      </main>
    </div>
  );
};

export default Layout;
