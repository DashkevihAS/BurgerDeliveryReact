import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../../store/form/formActions';
import { updateFormValue } from '../../store/form/formSlice';
import { closeModal } from '../../store/modalDelivery/modalDeliverySlice';

import style from './ModalDelivery.module.css';

export const ModalDelivery = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modalDelivery.isOpen);
  const overlayRef = useRef(null);
  const svgCloseRef = useRef(null);

  const orderList = useSelector((state) => state.order.orderList);
  const form = useSelector((state) => state.form.form);

  const handleClose = (e) => {
    if (
      e.target === overlayRef.current ||
      e.target === svgCloseRef.current ||
      e.key === 'Escape'
    ) {
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleClose);

    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, []);

  const handleInputChange = (e) => {
    dispatch(
      updateFormValue({
        field: e.target.name,
        value: e.target.value,
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(submitForm({ ...form, orderList }));
  };

  return (
    isOpen && (
      <div className={style.modal} ref={overlayRef} onClick={handleClose}>
        <div className={style.mdelivery}>
          <div className={style.container}>
            <h2 className={style.title}>Доставка</h2>

            <form className={style.form} id='delivery' onSubmit={handleSubmit}>
              <fieldset className={style.fieldset}>
                <input
                  className={style.input}
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder='Ваше имя'
                />
                <input
                  className={style.input}
                  type='tel'
                  name='phone'
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder='Телефон'
                />
              </fieldset>

              <fieldset className={style.fieldset_radio}>
                <label className={style.label}>
                  <input
                    className={style.radio}
                    type='radio'
                    name='format'
                    value='pickup'
                    onChange={handleInputChange}
                    checked={form.format === 'pickup'}
                  />
                  <span>Самовывоз</span>
                </label>
                <label className={style.label}>
                  <input
                    className={style.radio}
                    type='radio'
                    name='format'
                    value='delivery'
                    onChange={handleInputChange}
                    checked={form.format === 'delivery'}
                  />
                  <span>Доставка</span>
                </label>
              </fieldset>

              {form.format === 'delivery' && (
                <fieldset className={style.fieldset}>
                  <input
                    className={style.input}
                    type='text'
                    name='address'
                    value={form.address}
                    onChange={handleInputChange}
                    placeholder='Улица, дом, квартира'
                  />
                  <input
                    className={classNames(style.input, style.input_half)}
                    type='number'
                    name='floor'
                    value={form.floor}
                    onChange={handleInputChange}
                    placeholder='Этаж'
                  />
                  <input
                    className={classNames(style.input, style.input_half)}
                    type='number'
                    name='intercom'
                    value={form.intercom}
                    onChange={handleInputChange}
                    placeholder='Домофон'
                  />
                </fieldset>
              )}
            </form>

            <button className={style.submit} type='submit' form='delivery'>
              Оформить
            </button>
          </div>

          <button
            className={style.modal__close}
            type='button'
            onClick={handleClose}
          >
            <svg
              ref={svgCloseRef}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='5.07422'
                y='5.28247'
                width='1'
                height='20'
                transform='rotate(-45 5.07422 5.28247)'
              />
              <rect
                x='5.78125'
                y='19.4246'
                width='1'
                height='20'
                transform='rotate(-135 5.78125 19.4246)'
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
};
