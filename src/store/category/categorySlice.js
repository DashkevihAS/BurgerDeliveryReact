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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.error = '';
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer;
