import { createSlice } from '@reduxjs/toolkit';
import { fetchCategory } from './categoryActions';

const initialState = {
  category: [],
  error: '',
  activeCategory: 0,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: {
    [fetchCategory.pending.type]: (state) => {
      state.error = '';
    },
    [fetchCategory.fulfilled.type]: (state, action) => {
      state.category = action.payload;
    },
    [fetchCategory.rejected.type]: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer;
