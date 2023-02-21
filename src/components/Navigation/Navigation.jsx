import { Container } from '../Container/Container';
import classNames from 'classnames';

import style from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={style.navigation}>
      <Container className={style.container}>
        <ul className={style.list}>
          <li>
            <button
              className={classNames(
                style.button,
                style.button_burger,
                style.button_active,
              )}
            >
              Бургеры
            </button>
          </li>
          <li>
            <button className={classNames(style.button, style.button_snack)}>
              Закуски
            </button>
          </li>

          <li>
            <button
              className={classNames(style.button, style['button_hot-dog'])}
            >
              Хот-доги
            </button>
          </li>

          <li>
            <button className={classNames(style.button, style.button_combo)}>
              Комбо
            </button>
          </li>

          <li>
            <button className={classNames(style.button, style.button_shawarma)}>
              Шаурма
            </button>
          </li>

          <li>
            <button className={classNames(style.button, style.button_pizza)}>
              Пицца
            </button>
          </li>

          <li>
            <button className={classNames(style.button, style.button_wok)}>
              Вок
            </button>
          </li>

          <li>
            <button className={classNames(style.button, style.button_dessert)}>
              Десерты
            </button>
          </li>

          <li>
            <button className={classNames(style.button, style.button_sauce)}>
              Соусы
            </button>
          </li>
        </ul>
      </Container>
    </nav>
  );
};
