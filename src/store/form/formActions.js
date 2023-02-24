import { createAsyncThunk } from '@reduxjs/toolkit';
import { closeModal } from '../modalDelivery/modalDeliverySlice';
import { clearOrder } from '../order/orderSlice';
import { resetForm } from './formSlice';

export const submitForm = createAsyncThunk(
  'form/submit',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://cloudy-slash-rubidium.glitch.me/api/order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error(` Ошибка: ${response.statusText}`);
      }

      dispatch(clearOrder());
      dispatch(closeModal());
      dispatch(resetForm());

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
