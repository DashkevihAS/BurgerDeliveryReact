import React from 'react';
import style from './Count.module.css';

export const Count = (props) => {
  const [count, setCount] = React.useState(props.count);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };
  const RemoveCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className={style.count}>
      <button
        className={style.minus}
        onClick={RemoveCount}
        disabled={count === 1}
      >
        -
      </button>
      <p className={style.amount}>{count}</p>
      <button className={style.plus} onClick={addCount}>
        +
      </button>
    </div>
  );
};
