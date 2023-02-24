import { createSlice } from '@reduxjs/toolkit';
import { calaTotal } from '../../utils/calcTotal';
import { fetchOrder } from './orderActions';

const initialState = {
  orderList: JSON.parse(localStorage.getItem('order') || '[]'),
  orderData: [],
  totalCount: 0,
  totalPrice: 0,
  error: '',
  loading: true,
};

export const localStorageMiddleware = (store) => (next) => (action) => {
  const nextActions = next(action);

  if (nextActions.type.startsWith('order/')) {
    const orderList = store.getState().order.orderList;
    localStorage.setItem('order', JSON.stringify(orderList));
  }

  return nextActions;
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productOrderList = state.orderList.find(
        (item) => item.id === action.payload.id,
      );

      if (productOrderList) {
        productOrderList.count += 1;

        const productOrderData = state.orderData.find(
          (item) => item.id === action.payload.id,
        );
        productOrderData.count = productOrderList.count;

        [state.totalCount, state.totalPrice] = calaTotal(state.orderData);
      } else {
        state.orderList.push({ ...action.payload, count: 1 });
      }
    },

    removeProduct: (state, action) => {
      const productOrderList = state.orderList.find(
        (item) => item.id === action.payload.id,
      );

      if (productOrderList.count > 1) {
        productOrderList.count -= 1;

        const productOrderData = state.orderData.find(
          (item) => item.id === action.payload.id,
        );
        productOrderData.count = productOrderList.count;

        [state.totalCount, state.totalPrice] = calaTotal(state.orderData);
      } else {
        state.orderList = state.orderList.filter(
          (order) => order.id !== action.payload.id,
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.error = '';
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        const orderGoods = state.orderList.map((item) => {
          const product = action.payload.find(
            (product) => product.id === item.id,
          );
          product.count = item.count;

          return product;
        });

        state.orderData = orderGoods;

        [state.totalCount, state.totalPrice] = calaTotal(orderGoods);

        state.loading = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      });
  },
});

export const { addProduct, removeProduct } = orderSlice.actions;

export default orderSlice.reducer;
