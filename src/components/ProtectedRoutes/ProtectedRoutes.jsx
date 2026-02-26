import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { authContext } from '../../context/AuthContext';

export default function ProtectedRoutes({children}) {
    const {token} = useContext(authContext)
    
    if (!token) {
        console.log(token);
        
        return <Navigate to={"/register/login"}/>; 
    }
    
  return (children)
}
