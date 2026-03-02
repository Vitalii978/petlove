import s from './DisplayPasswordSecond.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';

export default function DisplayPasswordSecond({
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
        id="iconSecond" 
        type="checkbox"
        onChange={handlChange}
        checked={displayPassword}
      />
      <label htmlFor="iconSecond">
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
