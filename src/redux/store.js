import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './items/itemSlice';
import authReducer from './users/authSlice';

const store = configureStore({
  reducer: {
    item: itemReducer,
    auth: authReducer,
  },
});

export default store;
