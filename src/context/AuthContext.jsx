/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export let authContext = createContext();

export default function AuthContext({children}) {
    const [token, settoken] = useState(()=>localStorage.getItem("token"))
    
    return (
    <authContext.Provider value={{token, settoken}}>
        {children}
    </authContext.Provider>
  )
}
