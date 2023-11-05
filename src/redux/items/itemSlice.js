/* eslint-disable import/no-extraneous-dependencies */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import itemAPI from '../../API/itemAPI';

const initialState = {
  items: [],
};

export const fetchItems = createAsyncThunk(
  'item/fetchItems',
  async () => {
    try {
      const response = await axios.get(`${itemAPI.baseURL}${itemAPI.listItems}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch Items');
    }
  },
);

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default itemSlice.reducer;
