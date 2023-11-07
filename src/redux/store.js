import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './items/itemSlice';
import authReducer from './users/authSlice';
import tokenReducer from './users/tokenSlice';

const store = configureStore({
  reducer: {
    item: itemReducer,
    auth: authReducer,
    token: tokenReducer,
  },
});

export default store;
