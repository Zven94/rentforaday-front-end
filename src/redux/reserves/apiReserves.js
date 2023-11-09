import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import itemAPI from '../../API/itemAPI';

let idUser = '0';

const fetchReserves = createAsyncThunk('reserves/fetchReserves', async () => {
  if (localStorage.getItem('user') !== null) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.id !== undefined) {
      idUser = user.id;
    }
  }
  const response = await axios.get(`${itemAPI.baseURL}${itemAPI.listReserves}${idUser}/appointments`);
  return response.data;
});

const deleteReserve = createAsyncThunk('reserves/deleteReserve', async (reserveId) => {
  const response = await axios.delete(`${itemAPI.baseURL}${itemAPI.listReserves}${idUser}/appointments/${reserveId}`);
  return response.data;
});

const postReserve = createAsyncThunk('reserves/postReserve', async (dataObject, { rejectWithValue }) => {
  try {
    const options = {
      method: 'POST',
      url: `${itemAPI.baseURL}${itemAPI.listReserves}${idUser}/appointments`,
      data: dataObject,
    };

    const response = await axios.request(options);
    return response.status;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  if (localStorage.getItem('user') !== null) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.id !== undefined) {
      idUser = user.id;
    }
  }
  const response = await axios.get(`${itemAPI.baseURL}${itemAPI.listItems}`);
  return response.data;
});

export {
  fetchReserves, deleteReserve, postReserve, fetchItems,
};
