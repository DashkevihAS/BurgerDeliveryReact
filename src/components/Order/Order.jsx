import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../store/order/orderActions';
import { OrderGoods } from '../OrderGoods/OrderGoods';

import style from './Order.module.css';

export const Order = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.order.orderList);
  const orderData = useSelector((state) => state.order.orderData);

  const totalCount = orderList.reduce((acc, item) => acc + item.count, 0);

  useEffect(() => {
    const orderListId = orderList.map((item) => item.id);
    dispatch(fetchOrder(orderListId));
  }, [orderList]);

  return (
    <div className={style.order}>
      <section className={style.wrapper}>
        <div className={style.header} tabIndex='0' role='button'>
          <h2 className={style.title}>Корзина</h2>

          <span className={style.count}>{totalCount}</span>
        </div>
        <div className={style.wrap_list}>
          <ul className={style.list}>
            {orderData &&
              orderData.map((item) => <OrderGoods key={item.id} item={item} />)}
          </ul>

          <div className={style.total}>
            <p>Итого</p>
            <p>
              <span className={style.amount}>1279</span>
              <span className='currency'>₽</span>
            </p>
          </div>

          <button className={style.submit}>Оформить заказ</button>

          <div className={style.apeal}>
            <p className={style.text}>Бесплатная доставка</p>
            <button className={style.close}>Свернуть</button>
          </div>
        </div>
      </section>
    </div>
  );
};
