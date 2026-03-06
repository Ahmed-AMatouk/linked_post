import { Link, useParams } from "react-router";
import { Settings, Calendar, ArrowLeft } from "lucide-react";
import { IoCamera } from "react-icons/io5";
import { Button } from "@heroui/button";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Alert, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton } from "@heroui/react";
import MyPosts from "../posts/MyPosts";
import { MyDataContext } from "../../context/MyData";
import { Circles } from "react-loader-spinner";
import Bookmark from "../posts/Bookmark";
import axios from "axios";
import { authContext } from "../../context/AuthContext";
import UserPosts from "../posts/UserPosts";
export default function UserProfile() {
    const { id } = useParams()
    let { token } = useContext(authContext)
    function getUserDetails(){
        return axios.get(`https://route-posts.routemisr.com/users/${id}/profile` , 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
    
    
    let {data , isLoading} = useQuery({
        queryFn:getUserDetails,
        queryKey:["userdetails" , id]
    })
    let user = data?.data?.data?.user;

  return (
    <div className='flex-1 md:p-8 '>
      {
        isLoading ?
          <Card className="w-full h-100 space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          </Card>
          :
          <div className="w-full min-h-screen bg-linear-to-br from-gray-50 to-blue-50/30">
            <div className="w-full mx-auto px-4 py-6">
              <div className="gap-6">
                <div className="lg:col-span-6">

                  {/* Back Button */}
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-700 mb-4 hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                  </Link>

                  {/* Profile Header */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/50 mb-6">

                    {/* Cover */}
                    <div className="relative h-48 bg-linear-to-r from-primary to-blue-600">
                      {isLoading ?
                        <Skeleton className="flex w-full h-full" />
                      :
                        (<>
                        {user?.cover&&
                        
                        <img
                          src={user?.cover}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />}</>)
                      }
                      
                    </div>

                    {/* Info */}
                    <div className="relative px-6 pb-6">
                      <div className="flex justify-between items-start -mt-16 mb-4 ">
                        <div className="relative">
                          {
                            !user?.photo?
                              <Skeleton className="flex rounded-full w-32 h-32" />
                              :
                              <img
                                src={user?.photo}
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
                              />
                          }
                          

                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900">
                            {user.name}
                          </h1>
                          <p className="text-gray-500">@{user.username}</p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{`Joined ${new Date(user.createdAt).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", })}`}</span>
                          </div>
                        </div>

                        <div className="flex gap-6 pt-4">
                          <button className="hover:underline">
                            
                            <span className="text-gray-600 ml-1">Following <span className="font-bold text-black pl-1">{user.followingCount}</span></span>
                          </button>
                          <button className="hover:underline">
                            
                            <span className="text-gray-600 ml-2">Followers <span className="font-bold text-black pl-1">{user.followersCount}</span></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  

                  {/* Tab Content */}
                    <div className="md:p-6 text-center text-gray-500">
                      <UserPosts id={id}/>
                    </div>

                </div>
              </div>
            </div>
          </div>

      }
    </div>


  )
}
