import React, { useContext, useRef, useState } from 'react'
import { authContext } from '../../context/AuthContext';
import { PostCard } from '../posts/PostCard';
import { Card, Skeleton } from '@heroui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { MyDataContext } from '../../context/MyData';
import { LuUpload } from "react-icons/lu";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Circles } from 'react-loader-spinner';
import { toast } from 'react-toastify';


export default function Home() {
  const [laodingnewpost, setlaodingnewpost] = useState(false)
  let postbodyinput = useRef(null)
  let postimageinput = useRef(null)
  const [imgUrl, setimgUrl] = useState(null)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {user} = useContext(MyDataContext)
  let {token} = useContext(authContext);
  function getAllPosts(){
        return axios.get("https://route-posts.routemisr.com/posts" , {
            headers:{Authorization: `Bearer ${token}`}
        })
    }
    let {data, isLoading} = useQuery({
        queryKey:["posts"],
        queryFn:getAllPosts,
           
        })
    let posts = data?.data?.data?.posts || []
    
    function creatUrlImage(e){
      let imgPath  = URL.createObjectURL(e.target.files[0])
      setimgUrl(imgPath) 
    }
    function clearImg(){
      setimgUrl(null)
      postimageinput.current.value = null
    }

    let queryClient = useQueryClient()
    async function createPost(){
        let body = postbodyinput.current.value
        let imageFile = postimageinput.current.files[0]
        const formData = new FormData();
        if(body) formData.append("body", body);
        if(imageFile) formData.append("image", imageFile);
        try {
          setlaodingnewpost(true)
          await axios.post("https://route-posts.routemisr.com/posts", formData, {
              headers:{Authorization: `Bearer ${token}`}
            })
          setlaodingnewpost(false)
          onOpenChange(false)
          postbodyinput.current.value = ""
          postimageinput.current.value = null
          setimgUrl(null)
          toast.success("Post created successfully ✅",{position:"top-right"})
          queryClient.invalidateQueries(["posts"])
          
        } catch (error) {
          console.log(error);
          
          setlaodingnewpost(false)
          toast.error("Failed to create post ❌",{position:"top-right"})
        }
        
        
    }
 
  return (
    <>
    
      <main className="flex-1 lg:p-8 p-2">

        {/* Create Post */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 mb-6">
          
          {!user?
            <div>
                <Skeleton className="flex rounded-full w-10 h-10" />
            </div>
            :
            <img
            src={user.photo}
            className="w-10 h-10 rounded-full object-cover"
            />
            
            }
          <div onClick={onOpen} className="flex items-center gap-2 w-full">
            <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <Button onPress={onOpen} className="font-bold cursor-pointer bg-blue-600 text-white w-10 h-10 rounded-full flex justify-center items-center">
            New Post
          </Button>

          </div>
          {/* <Button onPress={onOpen}>Open Modal</Button> */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  {/* <img src={user.photo} alt="User Photo" className=" w-40 h-40 object-cover rounded-full" /> */}
                  <ModalHeader className="text-gray-400 text-3xl mb-4 mt-1 px-4">
                    Add New Post
                  </ModalHeader>
                  <ModalBody >
                    
                      <textarea ref={postbodyinput} placeholder="What's on your mind?" name="newpost" className="focus:ring-2 outline-none focus:ring-blue-400 w-full h-40 p-2 border border-gray-200 rounded-lg"></textarea>
                      {
                        postimageinput.current?.files[0] ?
                        <div className="w-full max-h-80 my-2 relative">
                          <img src={imgUrl} alt="Preview" className="w-full object-cover rounded-lg " />
                          <div onClick={clearImg} className="cursor-pointer hover:bg-red-500 hover:text-white text-gray-500 rounded-full p-2 font-bold absolute top-2 right-2 bg-white w-6 h-6 flex justify-center items-center">X</div>
                        </div>
                        :
                        <label htmlFor="postImage" className="mx-auto my-20 cursor-pointer text-sm text-gray-700 bg-gray-200 rounded-2xl p-4 hover:bg-gray-300 duration-200 font-bold w-fit flex items-center gap-2"><LuUpload className='font-bold'/> <span>Upload image</span></label>
                      }
                      <input  id='postImage' ref={postimageinput} type="file" className=" hidden" onChange={creatUrlImage}/>
                    

                  
                  </ModalBody>


                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    
                    <Button className={`${laodingnewpost ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} color="primary" onPress={createPost} disabled={laodingnewpost}>
                      {
                        <Circles
                          height="20"
                          width="20"
                          color="#fff"
                          ariaLabel="circles-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={laodingnewpost}
                          />

                      }
                      {!laodingnewpost && "Add"}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>



          
        </div>

        {/* Post Card */}
        {
          isLoading? 
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
