import React, { useContext, useState } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { FaHome, FaUser } from 'react-icons/fa';
import { IoChatbubble, IoNotifications} from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { MdExitToApp } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link, Navigate, NavLink, Outlet , useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import { MyDataContext } from '../../context/MyData';
import { Skeleton } from '@heroui/react';

export default function LayoutHome() {
    const location = useLocation();
    const {user} = useContext(MyDataContext)
    let [follow, setfollow] = useState("")
    let nav = useNavigate()
    const {settoken} = useContext(authContext)
    
    function logout(){
        localStorage.removeItem("token")
        settoken(null)
        nav("/register/login")
    }
    
    const [detectArrow, setdetectArrow] = useState(true)
    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* LEFT SIDEBAR */}
            <aside className={`${detectArrow ?"-translate-x-full":""} md:translate-x-0 lg:w-64 bg-white shadow-sm p-3 lg:p-6 flex flex-col justify-between fixed md:sticky z-50 bottom-0 top-0 left-0 h-screen`}>
                <FaArrowRight onClick={() => setdetectArrow(!detectArrow)} className='md:hidden box-content px-2 py-1 rounded-e-full hover:bg-blue-500 duration-200 cursor-pointer bg-blue-300 absolute top-4 -right-8 text-white'/>
                <div>
                    <Link to={"/home"}>
                        <header className='mb-10'>
                            <h1>
                            <div className='flex gap-3 items-center'>
                                <span className='px-4.5 py-2.5 backdrop-blur-2xl rounded-xl border bg-[#5799fb62] border-[#0e2eff54] font-bold'>S</span><div className="font-bold text-2xl hidden lg:block">SocialHub</div>
                            </div></h1>
                        </header>
                    </Link>
                    

                    <nav className="space-y-3">

                        <NavLink
                            to="/home"
                            className ={`${location.pathname === "/"?"active":""} sidebaritem relative hover:bg-gray-100 px-4 py-3 rounded-xl flex items-center transition-all duration-200`}
                        >
                            {({ isActive }) => (
                            <>
                                <FaHome className={`text-xl ${isActive ||location.pathname === "/"? "text-white" : "text-gray-400"}`} />
                                <p className="pl-11 hidden lg:block">Home</p>
                            </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className ={`sidebaritem relative hover:bg-gray-100 px-4 py-3 rounded-xl flex items-center transition-all duration-200`}
                        >
                            {({ isActive }) => (
                            <>
                                <FaUser className={`text-xl ${isActive ? "text-white" : "text-gray-400"}`} />
                                <p className="pl-11 hidden lg:block">Profile</p>
                            </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/massages"
                            className ={`sidebaritem relative hover:bg-gray-100 px-4 py-3 rounded-xl flex items-center transition-all duration-200`}
                        >
                            {({ isActive }) => (
                            <>
                                <IoChatbubble className={`text-xl ${isActive ? "text-white" : "text-gray-400"}`} />
                                <p className="pl-11 hidden lg:block">Messages</p>
                            </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/notice"
                            className ={`sidebaritem relative hover:bg-gray-100 px-4 py-3 rounded-xl flex items-center transition-all duration-200`}
                        >
                            {({ isActive }) => (
                            <>
                                <IoNotifications className={`text-xl ${isActive ? "text-white" : "text-gray-400"}`} />
                                <p className="pl-11 hidden lg:block">Notifications</p>
                            </>
                            )}
                        </NavLink>

                    </nav>
                </div>

                <div>
                    
                    
                    <div className="flex items-center gap-3 mb-6">
                            {!user?.photo?
                            <div>
                                <Skeleton className="flex rounded-full w-12 h-12" />
                            </div>
                            :
                            <img
                            src={user?.photo}
                            className="w-12 h-12 rounded-full object-cover"
                            />
                            
                            }
                        
                        <div className='hidden lg:block'>
                            <p className="font-medium">{user&&user.name}</p>
                            <p className="text-sm text-gray-500">@{user&&user.username}</p>
                        </div>
                    </div>


                    <button onClick={logout} className="relative w-full text-xl border border-red-500 cursor-pointer hover:bg-red-300 bg-red-200 duration-300 text-white px-3 py-2 rounded-xl font-medium flex items-center">
                            <MdExitToApp className=' text-red-500 text-xl '/>
                            <p className='pl-11 hidden text-red-500 lg:block'>Logout</p>
                    </button>
                </div>
            </aside>


            {/* MIDDLE FEED */}
               
                <Outlet/>
            


            {/* RIGHT SIDEBAR */}
            <aside className="w-96 bg-gray-100 p-6 space-y-6 sticky top-0 bottom-0 h-screen right-0 hidden xl:block">

                {/* Suggested */}
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <h3 className="font-bold mb-4 text-2xl">
                        <div className="flex items-center gap-4">
                        <IoMdPersonAdd className='text-blue-500'/>
                        <p>Suggested for you</p>
                        </div>
                    </h3>
                    {[1, 2, 3].map((item , index) => (
                        <div key={item} className="flex items-center justify-between mb-4 hover:bg-gray-100 p-4 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <img
                                    src={`https://randomuser.me/api/portraits/men/${item +17}.jpg`}
                                    className="w-9 h-9 rounded-full"
                                />
                                <div>
                                    <p className="font-medium text-sm">User Name</p>
                                    <p className="text-xs text-gray-500">@username</p>
                                </div>
                            </div>

                            <button onClick={()=> setfollow(`${index}`+`${follow}`)} className={`px-3 py-1 rounded-lg text-sm ${follow.includes(`${index}`) ?"bg-gray-300 text-gray-500 cursor-not-allowed":"bg-blue-600 text-white cursor-pointer"}`} >
                                {follow.includes(`${index}`) ?"Following":"Follow"}
                            </button>
                        </div>
                    ))}

                    <p className="text-blue-600 text-sm cursor-pointer">
                        See all suggestions
                    </p>
                </div>

                {/* Trending */}
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <h3 className="font-bold mb-4 text-2xl ">
                        <div className="flex items-center gap-4">
                            <FaArrowTrendUp className='text-blue-500'/> 
                            <p>Trending Now</p>
                        </div>
                    </h3>

                    <div className="space-y-3 text-sm ">
                        <div>
                            <p className="font-bold py-2">#WebDesign</p>
                            <p className="text-gray-500">12.5K posts</p>
                        </div>
                        <div>
                            <p className="font-bold py-2">#Technology</p>
                            <p className="text-gray-500">45.2K posts</p>
                        </div>
                        <div>
                            <p className="font-bold py-2">#Photography</p>
                            <p className="text-gray-500">89.3K posts</p>
                        </div>
                        <div>
                            <p className="font-bold py-2">#Developer</p>
                            <p className="text-gray-500">23.1K posts</p>
                        </div>
                    </div>
                </div>

            </aside>

        </div>
    );
}
