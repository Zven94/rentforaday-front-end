import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const idUser = '1';

const urlReserves = 'http://127.0.0.1:4000/api/v1/users/';

const fetchReserves = createAsyncThunk('reserves/fetchReserves', async () => {
  const response = await axios.get(`${urlReserves}${idUser}/appointments`);
  return response.data;
});

const deleteReserve = createAsyncThunk('reserves/deleteReserve', async (reserveId) => {
  const response = await axios.delete(`${urlReserves}${idUser}/appointments/${reserveId}`);
  return response.data;
});

const postReserve = createAsyncThunk('reserves/postReserve', async (dataObject, { rejectWithValue }) => {
  try {
    const options = {
      method: 'POST',
      url: `${urlReserves}${idUser}/appointments`,
      data: dataObject,
    };

    const response = await axios.request(options);
    return response.status;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get('http://127.0.0.1:4000/api/v1/items');
  return response.data;
});

export {
  fetchReserves, deleteReserve, postReserve, fetchItems,
};
