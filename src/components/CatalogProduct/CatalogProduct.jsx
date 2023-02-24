import { useDispatch } from 'react-redux';

import { API_URL } from '../../assets/const';

import { addProduct } from '../../store/order/orderSlice';

import style from './CatalogProduct.module.css';

export const CatalogProduct = ({ id, image, title, price, weight }) => {
  const dispatch = useDispatch();

  return (
    <article className={style.product}>
      <img src={`${API_URL}/${image}`} alt={title} className={style.image} />

      <p className={style.price}>
        {price}
        <span className='currency'>&nbsp;₽</span>
      </p>

      <h3 className={style.title}>
        <button className={style.detail}>{title}</button>
      </h3>

      <p className={style.weight}>{weight}г</p>

      <button
        className={style.add}
        type='button'
        onClick={() => dispatch(addProduct({ id }))}
      >
        Добавить
      </button>
    </article>
  );
};
