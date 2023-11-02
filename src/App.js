import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import ReservationsList from './components/ReservationsList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: 'items',
      //   element: <Carousel />,
      // },
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
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
