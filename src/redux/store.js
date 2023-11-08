import { configureStore } from '@reduxjs/toolkit';
import reservesReducer from './reserves/reserveSlice';
import itemReducer from './items/itemSlice';
import authReducer from './users/authSlice';

const store = configureStore({
  reducer: {
    item: itemReducer,
    auth: authReducer,
    reserves: reservesReducer,
  },
});

export default store;
