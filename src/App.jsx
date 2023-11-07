import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Elements for the router.
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Splash from './components/Splash';
import Item from './components/ItemList';
import ReservationsList from './components/ReservationsList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Splash />,
      },
      {
        path: 'items',
        element: <Item />,
      },
      // {
      //   path: 'registration',
      //   element: <Registration />,
      // },
      //   {
      //     path: 'login',
      //     element: <Login />,
      //   },
      //   {
      //     path: 'delete_item',
      //     element: <DeleteItem />,
      //   },
      //   {
      //   path: 'add_item',
      //     element: <AddItem />,
      //   },
      // {
      //   path: 'add_reserve',
      //   element: <AddReserve />,
      // },
      {
        path: 'reservation_list',
        element: <ReservationsList />,
      },
    ],
  }]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
