import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes';
import { baseTheme } from './assets/global/Theme-variables';
import { ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={baseTheme}>
        <RouterProvider router={routes}>
        </RouterProvider>
      </ThemeProvider>
  </React.StrictMode>,
);