import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { authContext } from '../../context/AuthContext';
import { PostCard } from './PostCard';
import { Card, Skeleton } from '@heroui/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from "react-router";

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    let {token} = useContext(authContext)

    async function getPostDetails() {
        try {
            setLoading(true);
            let { data } = await axios.get(
            `https://route-posts.routemisr.com/posts/${id}`,{
                headers:{
                Authorization: `Bearer ${token}`
                }
            });
        setPost(data.data.post);
        setLoading(false);
        } catch (error) {
        console.log(error);
        }
    }
    async function getComment() {
        let {data} = await axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        setComments(data.data.comments)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getPostDetails();
        getComment()
    }, []);
    console.log(comments);
    
  return (
    <div className="m-6 flex-1 p-8">
        <Link
              to="/"
              className="flex items-center gap-2 text-gray-700 mb-4 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to feed</span>
            </Link>
        {
        loading?
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
            post && <PostCard post={post} comments={comments} />}
    </div>
    
  )
}
