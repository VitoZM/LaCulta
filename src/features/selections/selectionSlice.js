import { createSlice } from '@reduxjs/toolkit';

export const selectionSlice = createSlice({
  name: 'selections',
  initialState: {
    selectedItem: 0,
    quantity: 0,
    totalCost: 0,
  },
  reducers: {
    updateValues: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateValues } = selectionSlice.actions;

export default selectionSlice.reducer;
