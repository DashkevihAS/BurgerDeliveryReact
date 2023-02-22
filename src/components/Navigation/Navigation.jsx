import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../Container/Container';

import { changeCategory } from '../../store/category/categorySlice';

import style from './Navigation.module.css';

export const Navigation = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category.category);
  const activeCategory = useSelector((state) => state.category.activeCategory);

  return (
    <nav className={style.navigation}>
      <Container className={style.container}>
        <ul className={style.list}>
          {category &&
            category.map((item, i) => (
              <li key={item.title}>
                <button
                  className={classNames(
                    style.button,
                    style[`button_${item.title}`],
                    activeCategory === i ? style.button_active : '',
                  )}
                  onClick={() => dispatch(changeCategory(i))}
                >
                  {item.rus}
                </button>
              </li>
            ))}
        </ul>
      </Container>
    </nav>
  );
};
