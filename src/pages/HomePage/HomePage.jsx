// Импортируем NavLink если нужен, но в HomePage он пока не используется
// import { NavLink } from "react-router-dom";
// Logo тоже не нужен в HomePage, так как он уже в Header
// import Logo from "../../components/Logo/Logo.jsx";

// Импортируем стили с нашим именем переменной (styles вместо s)
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    // section - семантический тег для секции страницы
    <section className={styles.sectionHome}>
      
      {/* ul - неупорядоченный список для структурирования контента */}
      {/* Каждый li - элемент этого списка */}
      <ul className={styles.listHome}>
        
        {/* Первый li: блок с заголовком и текстом */}
        <li className={styles.titleBox}>
          
          {/* h2 - заголовок второго уровня для основного заголовка страницы */}
          <h2 className={styles.title}>
            Take good <span className={styles.colorTitle}>care</span> of your small
            pets
          </h2>
          
          {/* p - параграф с описанием */}
          <p className={styles.paragraph}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </li>
        
        {/* Второй li: блок с фоновым изображением */}
        <li className={styles.homeImg}></li>
      </ul>
    </section>
  );
}