import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import HomeView from './routes/home-view';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import NewAssetView from './routes/new-asset-view';

const router = createHashRouter([
  {
    path: '/',
    element: <HomeView />,
    children: [
      {
        path: 'new-asset',
        element: <NewAssetView />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
