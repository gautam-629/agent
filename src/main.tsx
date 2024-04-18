import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import Providers from './providers'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer/>
    </Providers>
  </React.StrictMode>,
)
