// // src/components/ModalAttention/ModalAttention.jsx
// // 🎯 МОДАЛЬНОЕ ОКНО ДЛЯ НЕАВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ
// // ✅ ИСПРАВЛЕНО: правильные ссылки на /login и /register

// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom'; // 👈 Импортируем Link для навигации
// import sprite from '../../assets/icon/icon-sprite.svg';
// import styles from './ModalAttention.module.css';

// const ModalAttention = ({ isOpen, onClose }) => {
//   // 🎯 Закрытие по Escape
//   useEffect(() => {
//     const handleEscape = e => {
//       if (e.key === 'Escape') onClose();
//     };

//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'hidden'; // запрещаем скролл
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'unset'; // возвращаем скролл
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   // 🎯 Закрытие по клику на оверлей
//   const handleOverlayClick = e => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div className={styles.overlay} onClick={handleOverlayClick}>
//       <div className={styles.modal}>
//         {/* 🎯 КНОПКА ЗАКРЫТИЯ */}
//         <button
//           className={styles.closeButton}
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           <svg width="24" height="24" viewBox="0 0 24 24">
//             <path
//               d="M18 6L6 18M6 6l12 12"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           </svg>
//         </button>

//         {/* 🎯 ИКОНКА ВНИМАНИЯ */}
//         <div className={styles.iconWrapper}>
//           <svg className={styles.attentionIcon}>
//             <use href={`${sprite}#icon-attention`} />
//           </svg>
//         </div>

//         {/* 🎯 ТЕКСТ СООБЩЕНИЯ */}
//         <h2 className={styles.title}>Attention</h2>
//         <p className={styles.message}>
//           You need to log in or register to add pets to favorites.
//         </p>

//         {/* 🎯 КНОПКИ ДЕЙСТВИЙ */}
//         <div className={styles.actions}>
//           {/* 🔥 КНОПКА LOG IN - ведет на страницу логина */}
//           <Link
//             to="/login"
//             className={styles.loginButton}
//             onClick={onClose} // закрываем модалку при переходе
//           >
//             Log In
//           </Link>

//           {/* 🔥 КНОПКА REGISTRATION - ведет на страницу регистрации */}
//           <Link
//             to="/register"
//             className={styles.registerButton}
//             onClick={onClose} // закрываем модалку при переходе
//           >
//             Registration
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalAttention;

// src/components/ModalAttention/ModalAttention.jsx
// 🎯 МОДАЛЬНОЕ ОКНО ДЛЯ НЕАВТОРИЗОВАННЫХ ПОЛЬЗОВАТЕЛЕЙ
// ✅ ИСПРАВЛЕНО: разметка и стили из примера
// ====================================================
// Что делает этот компонент:
// 1. Показывает модальное окно для неавторизованных пользователей
// 2. Содержит иконку внимания, заголовок и описание
// 3. Кнопки Log In и Registration для перехода на соответствующие страницы
// 4. Закрывается по клику на крестик, на оверлей или по Escape
// ====================================================

import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // 👈 Используем NavLink как в примере
import sprite from '../../assets/icon/icon-sprite.svg';
import styles from './ModalAttention.module.css';

const ModalAttention = ({ isOpen, onClose }) => {
  // 🎯 Закрытие по Escape
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // запрещаем скролл
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // возвращаем скролл
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 🎯 Закрытие по клику на оверлей
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* 🎯 КНОПКА ЗАКРЫТИЯ - как в примере */}
        <button
          className={styles.buttonClose}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className={styles.icon} width={24} height={24}>
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>

        {/* 🎯 БЛОК С ИКОНКОЙ - как в примере */}
        <div className={styles.boxImg}>
          <img src="/🐶.png" alt="" width={44} height={44} />
        </div>

        {/* 🎯 ЗАГОЛОВОК - как в примере */}
        <h3 className={styles.title}>Attention</h3>

        {/* 🎯 ТЕКСТ СООБЩЕНИЯ - как в примере */}
        <p className={styles.message}>
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features
        </p>

        {/* 🎯 КНОПКИ ДЕЙСТВИЙ - как в примере */}
        <div className={styles.boxLink}>
          <NavLink
            to="/login"
            className={styles.linkLogin}
            onClick={onClose} // закрываем модалку при переходе
          >
            Log In
          </NavLink>
          <NavLink
            to="/register"
            className={styles.linkRegister}
            onClick={onClose} // закрываем модалку при переходе
          >
            Registration
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ModalAttention;
