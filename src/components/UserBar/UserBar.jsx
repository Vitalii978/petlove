import { NavLink } from "react-router-dom";
import styles from "./UserBar.module.css";
import sprite from "../../assets/icon/icon-sprite.svg";

const UserBar = () => {
    // 🎯 Временные данные пользователя (позже будем брать из API)
  const user = {
    name: 'Anna', // По скриншоту из Figma
    avatar: null, // null = нет аватарки, покажем default
    email: 'anna@example.com'
  };

    return (
        // 🎯 UserBar - это ссылка на профиль
        <NavLink to="/profile" className={styles.userBar}>
            {/* 🎯 Блок с информацией пользователя */}           
            <div className={styles.userInfo}>
                {/* 🎯 АВАТАРКА */}
                <div className={styles.avatarWrapper}>
                    {user.avatar ? (
            // 🎯 Если есть аватарка - показываем ее
                    <img 
                        src={user.avatar} 
                        alt={user.name}
                        className={styles.avatar}
                    />
                    ) : (
                        // 🎯 Если нет аватарки - показываем default иконку
                        <svg className={styles.avatarDefault}>
                            <use href={`${sprite}#icon-user`} />
                        </svg>
                        )}
                </div>
                {/* 🎯 Имя пользователя */}
                <span className={styles.userName}>{user.name}</span>
            </div>    
                <svg className={styles.arrowIcon}>
                    <use href={`${sprite}#icon-arrow-right`} />
                </svg>
        </NavLink>
    
    );
};

export default UserBar;