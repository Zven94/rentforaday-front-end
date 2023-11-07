import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
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
      // save the response data
      const data = await response.data;

      if (response.status === 200) {
        // destructure the response data to get the token and user
        const token = response.headers.authorization;
        const { user } = data;
        // save the token and user in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        // success message to the user
        toast.success(`Welcome, ${user.name}`);
      }

      // Return the user data
      return data;
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
      toast.success('Registration successful. Please login.');
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
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    // en un escenario de error, mostrar el error
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// export const {
//   authLoading,
//   authSuccess,
//   authFail,
//   logout,
// } = authSlice.actions;

export default authSlice.reducer;
