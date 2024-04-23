import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Register from './Register/'
import Login from './Login/'
import ForgotPassword from "./ForgotPassword"
export default function index() {
  return (
    <>
    
     <Routes>

         <Route path='/'>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            
         </Route>

     </Routes>

    </>
  )
}
