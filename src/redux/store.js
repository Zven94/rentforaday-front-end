import { configureStore } from '@reduxjs/toolkit';
import reservesReducer from './reserves/reserveSlice';

const store = configureStore({
  reducer: {
    reserves: reservesReducer,
  },
});

export default store;
