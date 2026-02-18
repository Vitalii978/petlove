import s from './Pagination.module.css';
import sprite from '../../assets/icon/icon-sprite.svg';
import clsx from 'clsx';

export default function Pagination({
  numberOfPages,
  totalPages,
  setToPage,
  toPage,
}) {
  console.log('🔍 Pagination:', {
    toPage,
    totalPages,
    hasSetToPage: typeof setToPage === 'function',
  });

  // Если нет данных - не рендерим
  if (!numberOfPages || numberOfPages.length <= 1) {
    return null;
  }

  // 🎯 ИСПРАВЛЕННЫЕ ОБРАБОТЧИКИ - передаем ЧИСЛА, не функции!
  const goToFirstPage = () => {
    console.log('⬅️⬅️ Первая страница');
    setToPage(1); // ✅ Число
  };

  const goToPrev = () => {
    console.log('⬅️ Предыдущая страница');
    const prevPage = Math.max(toPage - 1, 1); // ✅ Вычисляем число
    setToPage(prevPage); // ✅ Передаем число
  };

  const goToNext = () => {
    console.log('➡️ Следующая страница');
    const nextPage = Math.min(toPage + 1, totalPages); // ✅ Вычисляем число
    setToPage(nextPage); // ✅ Передаем число
  };

  const goToLastPage = () => {
    console.log('➡️➡️ Последняя страница');
    setToPage(totalPages); // ✅ Число
  };

  const goToPage = e => {
    const pageNum = Number(e.target.textContent);
    if (!isNaN(pageNum)) {
      console.log('🔢 Переход на страницу:', pageNum);
      setToPage(pageNum); // ✅ Число
    }
  };

  // Создаем кнопки страниц
  const button = numberOfPages.map((number, index) => {
    return (
      <button
        key={index}
        className={clsx(s.buttonNumber, toPage === number && s.currentPage)}
        onClick={goToPage}
      >
        {number}
      </button>
    );
  });

  return (
    <ul className={s.pagination}>
      <li className={s.arrows}>
        <button
          type="button"
          disabled={toPage === 1}
          className={clsx(s.buttonTwo, s.rotate)}
          onClick={goToFirstPage}
        >
          <svg className={clsx(s.iconOne, toPage === 1 && s.iconDisabl)}>
            <use href={`${sprite}#icon-arrow-left`} />
          </svg>
          <svg className={clsx(s.icon, toPage === 1 && s.iconDisabl)}>
            <use href={`${sprite}#icon-arrow-left`} />
          </svg>
        </button>
        <button
          type="button"
          disabled={toPage === 1}
          className={clsx(s.buttonOne, s.rotate)}
          onClick={goToPrev}
        >
          <svg className={clsx(s.icon, toPage === 1 && s.iconDisabl)}>
            <use href={`${sprite}#icon-arrow-left`} />
          </svg>
        </button>
      </li>

      <li className={s.buttonNumBox}>
        {button.slice(toPage - 1, toPage + 1)}
        {button.length > 1 && toPage !== totalPages && (
          <button className={s.buttonNumber}>...</button>
        )}
      </li>

      <li className={s.arrows}>
        <button
          type="button"
          className={s.buttonOne}
          onClick={goToNext}
          disabled={toPage === totalPages}
        >
          <svg className={clsx(s.icon, toPage === totalPages && s.iconDisabl)}>
            <use href={`${sprite}#icon-arrow-left`} />
          </svg>
        </button>
        <button
          type="button"
          className={s.buttonTwo}
          onClick={goToLastPage}
          disabled={toPage === totalPages}
        >
          <svg
            className={clsx(s.iconOne, toPage === totalPages && s.iconDisabl)}
          >
            <use href={`${sprite}#icon-arrow-left`} />
          </svg>
          <svg className={clsx(s.icon, toPage === totalPages && s.iconDisabl)}>
            <use href={`${sprite}#icon-arrow-left`} />
          </svg>
        </button>
      </li>
    </ul>
  );
}
