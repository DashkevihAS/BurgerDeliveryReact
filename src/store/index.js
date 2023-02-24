import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import categoryReducer from './category/categorySlice';
import productsReducer from './products/productsSlice';
import modalDeliveryReducer from './modalDelivery/modalDeliverySlice';
import orderReducer, { localStorageMiddleware } from './order/orderSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    products: productsReducer,
    order: orderReducer,
    modalDelivery: modalDeliveryReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
