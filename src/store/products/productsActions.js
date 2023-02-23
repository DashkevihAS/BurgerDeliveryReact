import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, POSTFIX } from '../../assets/const';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  (category) => {
    return fetch(`${API_URL}${POSTFIX}?category=${category}`)
      .then((req) => req.json())
      .catch((error) => ({ error }));
  },
);
