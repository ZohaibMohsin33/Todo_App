import { React, useContext } from 'react'
import Login from "../pages/Auth/Login";
import { AuthContext } from '../context/AuthContext'

export default function PrivateRoutes(props) {

  const { Component } = props;
  const { isAuthenticated } = useContext(AuthContext);
  // const { isAuthenticated } = staty;

  if (!isAuthenticated)
    return <Login />

  return (
    <Component />
  )
}
