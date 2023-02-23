import { createSlice } from '@reduxjs/toolkit';
import { fetchOrder } from './orderActions';

const initialState = {
  orderList: JSON.parse(localStorage.getItem('order') || '[]'),
  orderData: [],
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
      const product = state.orderList.find(
        (item) => item.id === action.payload.id,
      );

      if (product) {
        product.count += 1;
      } else {
        state.orderList.push({ ...action.payload, count: 1 });
      }
    },

    removeProduct: (state, action) => {
      const product = state.orderList.find(
        (item) => item.id === action.payload.id,
      );

      if (product.count > 1) {
        product.count -= 1;
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
        state.orderData = action.payload;
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
