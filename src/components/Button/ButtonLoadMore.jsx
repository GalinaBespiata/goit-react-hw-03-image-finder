import css from '../Button/ButtonLoadMore.module.css';

export function Button() {}

export function ButtonLoadMore({ onClick }) {
  return (
    <button className={css.button} onClick={onClick}>
      Load More
    </button>
  );
}
//НЕ ПРАЦЮЄ ХОВЕР
