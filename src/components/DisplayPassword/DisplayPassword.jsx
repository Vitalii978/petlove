// src/components/DisplayPassword/DisplayPassword.jsx
// 🎯 КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ/СКРЫТИЯ ПАРОЛЯ

import s from './DisplayPassword.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

export default function DisplayPassword({
  displayPassword,
  setDisplayPassword,
}) {
  const handlChange = evt => {
    setDisplayPassword(evt.target.checked);
  };

  return (
    <>
      <input
        className={s.input}
        id="icon"
        type="checkbox"
        onChange={handlChange}
        checked={displayPassword}
      />
      <label htmlFor="icon">
        {displayPassword ? (
          <div>
            <svg className={s.icon}>
              <use href={`${sprite}#icon-eye`} />
            </svg>
          </div>
        ) : (
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
