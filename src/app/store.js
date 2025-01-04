import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from '../features/selections/selectionSlice';

export const store = configureStore({
  reducer: { selections: selectionReducer },
});
