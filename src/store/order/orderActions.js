import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, POSTFIX } from '../../assets/const';

export const fetchOrder = createAsyncThunk('order/fetchOrder', (orderList) => {
  return fetch(`${API_URL}${POSTFIX}?list=${orderList}`)
    .then((req) => req.json())
    .catch((error) => ({ error }));
});
