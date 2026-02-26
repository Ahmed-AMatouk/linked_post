import React, { useContext, useState } from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { authContext } from '../../context/AuthContext';
import { PostCard } from '../posts/PostCard';
import { Card, Skeleton } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MyDataContext } from '../../context/MyData';

export default function Home() {
  const {user} = useContext(MyDataContext)
  let {token} = useContext(authContext);
  function getAllPosts(){
        return axios.get("https://route-posts.routemisr.com/posts" , {
            headers:{Authorization: `Bearer ${token}`}
        })
    }
    let {data, isLoading , isFetching, isError} = useQuery({
        queryKey:["posts"],
        queryFn:getAllPosts,
           
        })
    let posts = data?.data?.data?.posts || []
    // const [postsState, setpostsState] = useState(posts)
    // isError && console.log(isError);
  
  return (
    <>
    
      <main className="flex-1 p-8 ">

        {/* Create Post */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 mb-6">
          <img
            src={user?.photo}
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <button className="cursor-pointer bg-blue-600 text-white w-10 h-10 rounded-full text-xl flex justify-center items-center">
            <FaPlusCircle />

          </button>
        </div>

        {/* Post Card */}
        {
          isLoading || isFetching ? 
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
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden my-5 p-4">
              {posts?.map((post) => (
                <div key={post._id} className="my-4">
                  <PostCard 
                    post={post} 
                    comments={post?.topComment ? [post.topComment] : []} 
                  />
                </div>
              ))}
                
              
            </div>
          
        }

      </main>
    </>
  )
}
