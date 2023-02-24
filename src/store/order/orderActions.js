import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, POSTFIX } from '../../assets/const';

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (_, { getState }) => {
    const orderListId = getState().order.orderList.map((item) => item.id);

    return fetch(`${API_URL}${POSTFIX}?list=${orderListId}`)
      .then((req) => req.json())
      .catch((error) => ({ error }));
  },
);
