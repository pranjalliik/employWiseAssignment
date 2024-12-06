import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import AuthForm from './Features/Authentication/AuthForm.jsx'
import Dashboard from './Features/Dashboard/Dashboard.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js'
import ProtectRoute from './Features/ProtectRoute.js'
let router = createBrowserRouter([
  {
    path : '/',
    element : (<AuthForm/>)
  }, 
   {
    path : '/dashboard',
    element : (
    <ProtectRoute><Dashboard/></ProtectRoute>)
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
  <RouterProvider router={router}/> 
  </Provider>
  </StrictMode>,
)
