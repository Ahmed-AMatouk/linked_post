import React, { useContext, useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Image, Spinner } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import Comment from "./Comment";
import axios from "axios";
import { authContext } from "../../context/AuthContext";
import MyData, { MyDataContext } from "../../context/MyData";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

export function PostCard({ post, comments }) {

  let { user } = useContext(MyDataContext)
  let queryClient = useQueryClient()
  const [newComment, setNewComment] = useState("");
  const [CommentCount, setCommentCount] = useState(post.commentsCount);
  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let { token } = useContext(authContext)
  function sendComment() {
      setNewComment("");
      return axios.post(
        `https://route-posts.routemisr.com/posts/${post._id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  }

  let {isPending , mutate} = useMutation({
    mutationFn: sendComment,
     onSuccess:()=>{
      queryClient.invalidateQueries(["comments", post._id])
      queryClient.invalidateQueries(["posts"])
      setCommentCount(prev => prev + 1)
      toast.success("Comment added successfully ✅",{position:"top-right"})
  },
    onError:(()=>{
      toast.error("Failed to add comment ❌")
    })
  })


  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100/50">

      {/* User header */}
      <div className="flex items-center gap-3 p-4">
        <Link to={`/profile/${post.user.name}`} className="flex items-center gap-3">
          {!user.photo?
            <div>
                <Skeleton className="flex rounded-full w-10 h-10" />
            </div>
            :
            <img
            src={post.user.photo}
            alt={post.user.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
          />
            
            }

          
        </Link>

        <div className="flex-1">
          <Link
            to={`/profile/${post.user.name}`}
            className="hover:text-primary transition-colors"
          >
            <p className="text-gray-900 inline font-bold">
              {post.user.name}
            </p>
          </Link>

          <p className="text-sm text-gray-500">
            @{post.user.username} · {formattedDate}
          </p>
        </div>

        <Dropdown>
      <DropdownTrigger>
        <BsThreeDotsVertical className="cursor-pointer p-2 rounded-full box-content"/>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit">Edit post</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete post
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
      </div>

      {/* Post body */}
      {post.body &&
        <div className="px-4 pb-2">
          <p className="text-gray-800">{post.body}</p>
        </div>}

      {/* Post image */}
      {post.image &&
        <div className="relative w-full bg-gray-100">
          <Image
            isBlurred
            removeWrapper
            alt={post.body}
            className="w-full h-full object-cover"
            src={post.image}
          />

        </div>
      }

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-8 relative borderbottom border-gray-100 pb-4">
          <button

            className="flex items-center gap-2 transition-all duration-200 hover:scale-110"
          >
            <div className="">
              <Heart
                className={`w-6 h-6 transition-colors ${post.likesCount
                  ? "fill-red-500 text-red-500"
                  : "text-gray-700 hover:text-red-500"
                  }`}
              />
              <p className="font-medium text-gray-500 text-sm">
                {post.likesCount}
              </p>
            </div>
          </button>

          <Link to={`/post/${post._id}`} className="flex items-center gap-2 transition-all duration-200 hover:scale-110">
            <div className="">
              <MessageCircle className="w-6 h-6 text-gray-700 hover:text-primary" />
              <p className="text-sm text-gray-500 p-1.5">{CommentCount}</p>
            </div>
          </Link>

          <Link className="flex items-center gap-2 transition-all duration-200 hover:scale-110">
            <div className="">
              <Share2 className="w-6 h-6 text-gray-700 hover:text-primary" />
              <p className="text-sm text-gray-500">Share</p>
            </div>
          </Link>

          <button className="flex items-center gap-2 ml-auto transition-all duration-200 hover:scale-110">
            <Bookmark className="w-6 h-6 text-gray-700 hover:text-emerald-500" />
          </button>

        </div>

        {/* create comment */}
        <div className="flex items-center gap-2 mb-6">
          {!user.photo?
            <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            :
            <img
            src={user.photo}
            loading="lazy"
            className="w-12 h-12 rounded-full object-cover"
            />
            
            }
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            type="text"
            placeholder="Add comment"
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          {
            isPending ?
              <button className={` text-white w-10 h-10 rounded-full text-xl flex justify-center items-center bg-blue-300`}>
                <Spinner />
              </button>
              :
              <button onClick={() => newComment && mutate()} className={` text-white w-10 h-10 rounded-full text-xl flex justify-center items-center ${newComment ? "bg-blue-500 cursor-pointer" : "bg-blue-300"}`}>
                <FaArrowRightLong />
              </button>
          }
        </div>


        {/* comments */}
        {comments ? comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        )) : 
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
                        </div>
                      </Card>
        
        }
        {
          comments.length > 0 ?
            <Link to={`/post/${post._id}`} className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer">
              View all comments
            </Link> : ""
        }


      </div>
    </div>

  );
}

export default React.memo(PostCard);