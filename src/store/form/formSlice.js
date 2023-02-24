import { createSlice } from '@reduxjs/toolkit';
import { submitForm } from './formActions';

const initialState = {
  form: {
    name: '',
    phone: '',
    format: 'delivery',
    address: '',
    floor: '',
    intercom: '',
  },
  response: null,
  status: '',
  error: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormValue: (state, action) => {
      state.form[action.payload.field] = action.payload.value;
    },
    resetForm: (state) => {
      state.form = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'loading';
        state.response = null;
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.response = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateFormValue, resetForm } = formSlice.actions;

export default formSlice.reducer;
