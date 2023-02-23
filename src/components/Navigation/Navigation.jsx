import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { API_URL } from '../../assets/const';

import { changeCategory } from '../../store/category/categorySlice';
import { fetchCategory } from '../../store/category/categoryActions';

import { Container } from '../Container/Container';

import style from './Navigation.module.css';

export const Navigation = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category.category);
  const activeCategory = useSelector((state) => state.category.activeCategory);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

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
                    activeCategory === i ? style.button_active : '',
                  )}
                  style={{ backgroundImage: `url(${API_URL}/${item.image})` }}
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
