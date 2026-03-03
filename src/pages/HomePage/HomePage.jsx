import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={styles.sectionHome}>
      <ul className={styles.listHome}>
        <li className={styles.titleBox}>
          <h2 className={styles.title}>
            Take good <span className={styles.colorTitle}>care</span> of your
            small pets
          </h2>

          <p className={styles.paragraph}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </li>

        <li className={styles.homeImg}></li>
      </ul>
    </section>
  );
}
