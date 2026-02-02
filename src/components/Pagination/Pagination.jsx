import s from "./Pagination.module.css";
import sprite from "../../assets/icon/icon-sprite.svg";
import clsx from "clsx";

export default function Pagination({
  numberOfPages,
  totalPages,
  setToPage,
  toPage,
}) {
  if (!numberOfPages) return;

  const goToFirstPage = () => {
    setToPage(1);
  };
  
  const goToPrev = () => {
    setToPage((prev) => Math.max(prev - 1, 1));
  };
  
  const goToNext = () => {
    setToPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const goToLastPage = () => {
    setToPage(totalPages);
  };
  
  const goToPage = (e) => {
    setToPage(Number(e.target.textContent));
  };

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
          disabled={toPage !== 1 ? false : true}
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
          disabled={toPage !== 1 ? false : true}
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
          disabled={toPage !== totalPages ? false : true}
        >
          <svg className={clsx(s.icon, toPage === totalPages && s.iconDisabl)}>
            <use href={`${sprite}#icon-arrow-left`} />
          </svg>
        </button>
        <button
          type="button"
          className={s.buttonTwo}
          onClick={goToLastPage}
          disabled={toPage !== totalPages ? false : true}
        >
          <svg className={clsx(s.iconOne, toPage === totalPages && s.iconDisabl)}>
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