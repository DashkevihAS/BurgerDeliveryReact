import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, POSTFIX } from '../../assets/const';

export const fetchCategory = createAsyncThunk('category/fetchCategory', () => {
  return fetch(`${API_URL}${POSTFIX}/category`)
    .then((req) => req.json())
    .catch((error) => ({ error }));
});
