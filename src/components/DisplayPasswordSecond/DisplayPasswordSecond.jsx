// src/components/DisplayPasswordSecond/DisplayPasswordSecond.jsx
// 🎯 КОМПОНЕНТ ДЛЯ ПОКАЗА/СКРЫТИЯ ВТОРОГО ПАРОЛЯ
// ====================================================
// Что делает этот компонент:
// 1. Отображает иконку глаза
// 2. По клику переключает состояние показа/скрытия пароля
// 3. Используется для поля confirmPassword
// ====================================================

import s from './DisplayPasswordSecond.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

export default function DisplayPasswordSecond({
  displayPassword,
  setDisplayPassword,
}) {
  // 🟢 Обработчик изменения чекбокса
  const handlChange = evt => {
    setDisplayPassword(evt.target.checked);
  };

  return (
    <>
      {/* 🟢 Скрытый чекбокс */}
      <input
        className={s.input}
        id="iconSecond" // Уникальный ID для второго поля
        type="checkbox"
        onChange={handlChange}
        checked={displayPassword}
      />

      {/* 🟢 Лейбл с иконкой */}
      <label htmlFor="iconSecond">
        {displayPassword ? (
          // Иконка открытого глаза (пароль виден)
          <div>
            <svg className={s.icon}>
              <use href={`${sprite}#icon-eye`} />
            </svg>
          </div>
        ) : (
          // Иконка закрытого глаза (пароль скрыт)
          <div>
            <svg className={s.icon}>
              <use href={`${sprite}#icon-eye-off`} />
            </svg>
          </div>
        )}
      </label>
    </>
  );
}
