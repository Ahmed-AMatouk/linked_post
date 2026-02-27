import React, { useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Card, Skeleton } from '@heroui/react'
import { PostCard } from './PostCard'

export default function MyPosts() {
    // https://route-posts.routemisr.com/posts/feed

    let {token} = useContext(authContext)
      function getMyPosts(){
        return axios.get("https://route-posts.routemisr.com/posts/feed",{
          headers:{Authorization: `Bearer ${token}`}})
      }
      
      let {data , isLoading , isFetching } = useQuery({
        queryKey:["myPosts"],
        queryFn:getMyPosts,
      })

        let posts = data?.data?.data?.posts || []      
  
    if(data && posts.length === 0) return <p className='text-center text-gray-500'>No Posts Yet</p>
    return (
        <div className="text-start">

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
        </div>
          
          
        
  )
}
