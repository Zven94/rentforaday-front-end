import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

import { setToken } from './tokenSlice';
import { fetchItems } from '../items/itemSlice';

import itemAPI from '../../API/itemAPI';

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${itemAPI.baseURL}${itemAPI.login}`,
        { user: formData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.status.code === 200 && response.data.status.message === 'Logged in sucessfully.') {
        // destructure the response data to get the token and user
        const token = response.headers.authorization;
        const user = response.data.data;
        toast.success(`Successful login. Welcome, ${user.name}`);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        thunkAPI.dispatch(fetchItems());
        thunkAPI.dispatch(setToken(token));
        setTimeout(() => {
          Navigate('/items');
        }, 6000);
      }
      if (response.data.status.success === false) {
        toast.error(`Registration failed. ${response.data.message[0]}`);
      }

      // Return the user data
      return response.data;
    } catch (error) {
      // Return the error message
      toast.error(`Login failed. ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  },

);

// Async Thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${itemAPI.baseURL}${itemAPI.registration}`,
        { user: formData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data.success === true) {
        toast.success('Registration successful. Please login.');
        setTimeout(() => {
          Navigate('/login');
        }, 6000);
      }
      if (response.data.success === false) {
        toast.error(`Registration failed. ${response.data.message[0]}`);
      }
      return response.data;
    } catch (error) {
      toast.error(`Registration failed. ${error.message}`);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    // en un escenario exitoso, guardar el token en el local storage
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload.data.name;
      state.isAuthenticated = true;
    });
    // en un escenario de error, mostrar el error
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
