import { NavLink } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className={styles.notFoundPage}>
      <ul className={styles.boxNotFound}>
        <li className={styles.titleBox}>
          <span className={styles.number}>4</span>
          <span className={styles.imgBox}>
            <picture className={styles.img}>
              <source
                srcSet="/catMob404-1x.png 1x, /catMob404-2x.png 2x"
                media="(max-width: 767px)"
              />
              <source
                srcSet="/catTab-Pc404-1x.png 1x, /catTab-Pc404-2x.png 2x"
                media="(min-width: 768px)"
              />
              <img src="/catMob404-1x.png" alt="cat" />
            </picture>
          </span>
          <span className={styles.number}>4</span>
        </li>

        <li>
          <p className={styles.paragraph}>Ooops! This page not found :(</p>
        </li>

        <li className={styles.containerLink}>
          <NavLink to="/home" className={styles.linkHome}>
            To home page
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default NotFoundPage;
