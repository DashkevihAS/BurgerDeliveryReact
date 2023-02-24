import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../../store/products/productsActions';

import { CatalogProduct } from '../CatalogProduct/CatalogProduct';
import { Container } from '../Container/Container';
import { Order } from '../Order/Order';

import style from './Catalog.module.css';

export const Catalog = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category.category);
  const activeCategory = useSelector((state) => state.category.activeCategory);

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    if (!category.length) {
      dispatch(fetchProducts('burger'));
    } else {
      dispatch(fetchProducts(category[activeCategory].title));
    }
  }, [activeCategory]);

  return (
    <section className={style.catalog}>
      <Container className={style.container}>
        <Order />

        <div className={style.wrapper}>
          <h2 className={style.title}>{category[activeCategory]?.rus}</h2>
          {!loading && products && !products?.length ? (
            <p className={style.empty}>
              К сожалению товаров данной категории нет
            </p>
          ) : null}
          <div className={style.wrap_list}>
            <ul className={style.list}>
              {products &&
                Array.isArray(products) &&
                products.map((item) => (
                  <li className={style.item} key={item.id}>
                    <CatalogProduct {...item} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
