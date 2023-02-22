import { Count } from '../Count/Count';

import style from './OrderGoods.module.css';

export const OrderGoods = ({ title, weight, price, img }) => {
  return (
    <li className={style.item}>
      <img className={style.image} src={img} alt={title} />

      <div className={style.goods}>
        <h3 className={style.title}>{title}</h3>

        <p className={style.weight}>{weight}г</p>

        <p className={style.price}>
          {price}
          <span className='currency'>₽</span>
        </p>
      </div>

      <Count count={1} />
    </li>
  );
};