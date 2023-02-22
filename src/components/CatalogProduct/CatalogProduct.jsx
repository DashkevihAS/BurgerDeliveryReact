import style from './CatalogProduct.module.css';

export const CatalogProduct = ({ img, title, currency, weight }) => {
  return (
    <article className={style.product}>
      <img src={img} alt={title} className={style.image} />

      <p className={style.price}>
        {currency}
        <span className='currency'>₽</span>
      </p>

      <h3 className={style.title}>
        <button className={style.detail}>{title}</button>
      </h3>

      <p className={style.weight}>{weight}г</p>

      <button className={style.add} type='button'>
        Добавить
      </button>
    </article>
  );
};
