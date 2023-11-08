import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';
import { fetchItems } from './redux/items/itemSlice';

import './index.css';

store.dispatch(fetchItems());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
