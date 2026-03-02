import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from '@heroui/react';
import React, { useContext, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { MyDataContext } from '../../context/MyData';
import axios from 'axios';
import { authContext } from '../../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaArrowRightLong } from 'react-icons/fa6';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function Comment({comment , postId}) {
   let {user} = useContext(MyDataContext)
    const date = new Date(comment?.createdAt);
    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    let {token} = useContext(authContext)
    const [updateInputState, setupdateInputState] = useState(false)
    const [updateInput, setupdateInput] = useState(comment?.content)
    let formdata = new FormData()
    
    function updateComment(){
      formdata.append("content", updateInput)
      return axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`, formdata
      ,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    }
    let client = useQueryClient() 
    let {isPending , mutate} = useMutation({
      mutationFn:updateComment,
      onSuccess:()=>{
        toast.success("Comment updated ✅", { position: "top-right" })
        client.invalidateQueries(["comments", postId])
        setupdateInputState(false)
      },
      onError:()=>{
        toast.error("Comment updated failed ❌", { position: "top-right" })

      }
    })


  function deleteCommnet() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        axios.delete(`https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Comment deleted successfully ✅", { position: "top-right" })
      client.invalidateQueries(["comments", postId])
      client.invalidateQueries(["posts"])
      } catch (error) {
        toast.error("Failed to delete comment ❌", { position: "top-right" })
        console.log(error.response.data.message);
        
      }
      
      
    }
  });
    }
    
  return (
    comment &&
        <div className="mt-3 flex items-start gap-2">

            <img
                  src={comment.commentCreator.photo}
                  alt={comment.commentCreator.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                />
        <div className="bg-gray-100 rounded-2xl w-full ">


             <div className="flex items-center gap-3 pt-2 border-gray-100">
              <Link to={`/profile/${comment.commentCreator.name}`} className="flex items-center gap-3">
                
              </Link>

              <div className="flex-1">
                <Link
                  to={`/profile/${comment.commentCreator.name}`}
                  className="hover:text-primary transition-colors"
                >
                  <p className="font-bold text-gray-900 inline">
                    {comment.commentCreator.name}
                  </p>
                </Link>

                <p className="text-sm text-gray-500">
                  {formattedDate}
                </p>
              </div>

              {
                comment?.commentCreator._id === user?._id &&
              <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly className="rounded-full" variant="light">
                       <BsThreeDotsVertical className="cursor-pointer p-2 rounded-full box-content"/>
                    </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem onPress={()=>setupdateInputState(true)} key="edit">Edit Comment</DropdownItem>
                      <DropdownItem onPress={deleteCommnet} key="delete" className="text-danger" color="danger">
                        Delete Comment
                      </DropdownItem>
                    </DropdownMenu>
              </Dropdown>
              }
             </div>

                <div className="px-5 py-2">
                <p className="text-gray-800">
              {updateInputState ? (<div className=" flex items-center gap-2">
                  <input
                defaultValue={comment.content}
                value={updateInput}
                onChange={(e) => setupdateInput(e.target.value)}
                type="text"
                placeholder="Update comment"
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none ring-2 ring-emerald-400 transition duration-200"
              />
              {
                isPending ?
                  <button className={` text-white w-10 h-10 rounded-full text-xl flex justify-center items-center bg-emerald-300`}>
                    <Spinner color='#fff'/>
                  </button>
                  :
                  <button onClick={() => mutate()} className={` text-white w-10 h-10 rounded-full text-xl flex justify-center items-center ${updateInput ? "bg-emerald-500 cursor-pointer" : "bg-emerald-300"}`}>
                    <FaArrowRightLong />
                  </button>
              }
                
                </div>)
              :
              comment?.content
              }
                </p>
              </div>
        </div>

        </div>
          
  )
}
