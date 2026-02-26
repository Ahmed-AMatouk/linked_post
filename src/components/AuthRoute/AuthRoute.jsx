import React, { useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AuthRoute({children}) {
    let {token} = useContext(authContext)

    if(token) return <Navigate to={"/home"}/>
  return (children)
}
