import { createSlice } from '@reduxjs/toolkit';
import {
  fetchReserves, deleteReserve, fetchItems, postReserve,
} from './apiReserves';

const initialState = {
  reserves: [],
  isLoading: false,
  error: undefined,
  status: undefined,
};

const reserveSlice = createSlice({
  name: 'reserves',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReserves.fulfilled, (state, action) => {
        state.reserves = action.payload;
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(fetchReserves.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchReserves.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        const uniqueCityObject = {};
        state.items.forEach((item) => {
          const { city } = item;
          if (!uniqueCityObject[city]) {
            uniqueCityObject[city] = item;
          }
        });
        state.itemsByCity = Object.values(uniqueCityObject);

        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postReserve.fulfilled, (state) => {
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(postReserve.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(postReserve.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.status = action.payload.error;
      });
  },
});

export default reserveSlice.reducer;
export { fetchReserves, deleteReserve };