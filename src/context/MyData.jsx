import React, { createContext, useContext} from 'react'
import { authContext } from './AuthContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


// eslint-disable-next-line react-refresh/only-export-components
export let MyDataContext = createContext();
export default function MyData({children}) {
  let {token} = useContext(authContext)
  function getMyProfile(){
    return axios.get("https://route-posts.routemisr.com/users/profile-data",{
      headers:{Authorization: `Bearer ${token}`}})
  }
  
  let {data , isLoading , isFetching , refetch} = useQuery({
    queryKey:["profile"],
    queryFn:getMyProfile,

  })
  let user = data?.data?.data?.user || null
  console.log(user);
  return (
    <MyDataContext.Provider value={{user, isLoading, isFetching, refetch}}>
        {children}
    </MyDataContext.Provider>
  )
}
