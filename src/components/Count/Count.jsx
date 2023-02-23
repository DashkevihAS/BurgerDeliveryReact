import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../../store/order/orderSlice';
import style from './Count.module.css';

export const Count = ({ id }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.order.orderList);

  const count = orderList.find((obj) => obj.id === id)?.count;

  const addCount = () => {
    dispatch(addProduct({ id }));
  };

  const RemoveCount = () => {
    dispatch(removeProduct({ id }));
  };

  return (
    <div className={style.count}>
      <button className={style.minus} onClick={RemoveCount}>
        -
      </button>
      <p className={style.amount}>{count}</p>
      <button className={style.plus} onClick={addCount}>
        +
      </button>
    </div>
  );
};
