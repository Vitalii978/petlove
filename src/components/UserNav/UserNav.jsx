// Временный компонент для авторизованных пользователей
// Позже мы заменим его на полноценный с UserBar и LogOutBtn
import styles from './UserNav.module.css';

const UserNav = () => {
  return (
    <div className={styles.userNav}>
      {/* Временное сообщение - позже заменим на реальный UserBar */}
      <div className={styles.tempMessage}>
        UserNav: Пользователь авторизован
      </div>
      
      {/* Временная кнопка выхода - позже заменим на LogOutBtn */}
      <button className={styles.tempButton}>
        Log Out
      </button>
    </div>
  );
};

export default UserNav;