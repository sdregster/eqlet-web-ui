import { configureStore } from '@reduxjs/toolkit';
import charactersSlice from '../features/charactersSlice';

export const store = configureStore({
  reducer: {
    character: charactersSlice,
  },
});
