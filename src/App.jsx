import { createHashRouter, RouterProvider } from "react-router-dom"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Signup from './components/signup/Signup';
import LayoutForm from "./components/LayoutForm/LayoutForm";
import { HeroUIProvider } from "@heroui/react";
import LayoutHome from "./components/LayoutHome/LayoutHome";
import Profile from "./components/profile/Profile";
import Massages from "./components/Massages/Massages";
import Notice from "./components/Notice/Notice";
import AuthContext from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Notfound from "./components/notfound/Notfound";
import PostDetails from "./components/posts/PostDetails";
import {QueryClientProvider , QueryClient} from "@tanstack/react-query";
import MyData from "./context/MyData";
import { ToastContainer } from "react-toastify";
import { Offline } from "react-detect-offline";
import UserProfile from "./components/profile/UserProfile";


let router = createHashRouter([
  {path:"" , element:<ProtectedRoutes> <LayoutHome/> </ProtectedRoutes>   ,children:[
    {index:true , element: <Home/>},
    {path:"home" , element: <Home/>},
    {path:"post/:id" , element: <PostDetails/>},
    {path:"profile" , element: <Profile/>},
    {path:"user/:id" , element: <UserProfile/>},
    {path:"massages" , element: <Massages/>},
    {path:"notice" , element: <Notice/>}
    
  ]},
  {path:"register" , element: <AuthRoute> <LayoutForm />  </AuthRoute> , children:[
    {path:"login" , element: <Login/>},
    {path:"signup" , element: <Signup/>},
  ]},
  {path:"*" , element: <Notfound/>}
  
  
])
export default function App() {
  let Client = new QueryClient()
  return (
    <QueryClientProvider client={Client}>
    
      <HeroUIProvider>
          <AuthContext>
        <MyData>


            <RouterProvider router={router} />
            <ToastContainer />
          <Offline className="fixed top-0 left-0 w-full bg-red-500 text-white text-center p-2 z-60">
            <p>You are currently offline. Please check your internet connection.</p>
          </Offline>
        </MyData>
          </AuthContext>
      </HeroUIProvider>
    
    </QueryClientProvider>
  )
}
