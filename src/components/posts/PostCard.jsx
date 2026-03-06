import React, { useContext, useRef, useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton, Spinner, useDisclosure } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import Comment from "./Comment";
import axios from "axios";
import { authContext } from "../../context/AuthContext";
import MyData, { MyDataContext } from "../../context/MyData";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuUpload } from "react-icons/lu";
import { Circles } from "react-loader-spinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function PostCard({ post, comments ,isShared}) {

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

  let { isPending, mutate: mutateComment } = useMutation({
    mutationFn: sendComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", post._id])
      queryClient.invalidateQueries(["posts"])
      setCommentCount(prev => prev + 1)
      toast.success("Comment added successfully ✅", { position: "top-right" })
    },
    onError: (() => {
      toast.error("Failed to add comment ❌")
    })
  })
  let postbodyinput = useRef(null)
  let postimageinput = useRef(null)
  const [imgUrl, setimgUrl] = useState(post.image)
  let { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen:isSharedOpen, onOpen: onSharedOpen, onOpenChange:onShareChange } = useDisclosure();
  const formData = new FormData();
  function updatePost() {
    let body = postbodyinput.current?.value
    let imageFile = postimageinput.current?.files[0]
    if (body) formData.append("body", body);
    if (imageFile) formData.append("image", imageFile);
    return axios.put(`https://route-posts.routemisr.com/posts/${post._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  let { isPending: isPendingUpdate, mutate: mutateUpdate } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
      onOpenChange(false)
      toast.success("Post updated successfully ✅", { position: "top-right" })
    },
    onError: () => {
      toast.error("Failed to update post ❌")
    }
  })

  function clearImg() {
    setimgUrl(null)
    postimageinput.current.value = null
  }
  function creatUrlImage(e) {
    let imgPath = URL.createObjectURL(e.target.files[0])
    setimgUrl(imgPath)
  }

  function deletePost() {
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
      axios.delete(`https://route-posts.routemisr.com/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Post deleted successfully ✅", { position: "top-right" })
      queryClient.invalidateQueries(["posts"])
      
    } catch (error) {
      toast.error("Failed to delete post ❌", { position: "top-right" })
      console.log(error.response.data.message);
      
    }
  }
});
  }

  const isLiked = post.likes.some(
  like => like === user._id
  )
  const [likeState, setlikeState] = useState(isLiked)
  const [likesCount, setlikesCount] = useState(post.likesCount)
  async function handleLike(){
    try {
      setlikeState(prev => !prev)
      setlikesCount(prev => prev + (likeState ? -1 : 1))
      await axios.put(`https://route-posts.routemisr.com/posts/${post._id}/like` , {} ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      queryClient.invalidateQueries(["posts"])
    } catch (error) {
      console.log(error.response.data.message);
    }
  }  
  
  const [bookmark, setBookmark] = useState(post.bookmarked)
  async function handleBookmark(){
    try {
      
      setBookmark(prev => !prev)
      await axios.put(`https://route-posts.routemisr.com/posts/${post._id}/bookmark` , {} ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      queryClient.invalidateQueries(["posts"])
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  let sharedPostBody = useRef(null)
  const [shareLoading, setshareLoading] = useState(false)
  async function handleShare(){
    try {
      setshareLoading(true)
      await axios.post(`https://route-posts.routemisr.com/posts/${post._id}/share` , {body:sharedPostBody.current.value} ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setshareLoading(false)
      queryClient.invalidateQueries(["posts"])
      toast.success("Post Shared successfully ✅", { position: "top-right" })
      onShareChange(false)
    } catch (error) {
      console.log(error);
     toast.error("Failed to Share post ❌") 
    }

  }


  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100/50">

      {/* User header */}
      <div className="flex items-center gap-3 p-4">
        <Link to={`/user/${post.user._id}`} className="flex items-center gap-3">
          {!post.user.photo ?
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
            to={`/user/${post.user._id}`}
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

        {
          post?.user._id === user?._id &&
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly className="rounded-full" variant="light">
                <BsThreeDotsVertical className="cursor-pointer p-2 rounded-full box-content" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem onClick={()=>{onOpen();setimgUrl(post.image)}} key="edit">Edit post</DropdownItem>
              <DropdownItem onPress={deletePost} key="delete" className="text-danger" color="danger">
                Delete post
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        }
        <Modal isOpen={isOpen} onOpenChange={(isOpen) => {
          if (!isOpen) {
            setimgUrl(post.image)
            postimageinput.current.value = null
          }
          onOpenChange(isOpen)
        }}>
          <ModalContent>
            {(onClose) => (
              <>
                {/* <img src={user.photo} alt="User Photo" className=" w-40 h-40 object-cover rounded-full" /> */}
                <ModalHeader className="text-gray-400 text-3xl mb-4 mt-1 px-4">
                  Update Post
                </ModalHeader>
                <ModalBody >

                  <textarea defaultValue={post.body} ref={postbodyinput} placeholder="What's on your mind?" name="newpost" className="focus:ring-2 outline-none focus:ring-blue-400 w-full h-40 p-2 border border-gray-200 rounded-lg"></textarea>
                  {
                    imgUrl ?
                      <div className="w-full max-h-80 my-2 relative">
                        <img src={imgUrl} alt="Preview" className="w-full object-cover rounded-lg " />
                        <div onClick={clearImg} className="cursor-pointer hover:bg-red-500 hover:text-white text-gray-500 rounded-full p-2 font-bold absolute top-2 right-2 bg-white w-6 h-6 flex justify-center items-center">X</div>
                      </div>
                      :
                      <label htmlFor="postImage" className="mx-auto my-20 cursor-pointer text-sm text-gray-700 bg-gray-200 rounded-2xl p-4 hover:bg-gray-300 duration-200 font-bold w-fit flex items-center gap-2"><LuUpload className='font-bold' /> <span>Upload image</span></label>
                  }
                  <input id='postImage' ref={postimageinput} type="file" className=" hidden" onChange={creatUrlImage} />



                </ModalBody>


                <ModalFooter>
                  <Button color="danger" variant="light" onPress={() => onClose()}>
                    Close
                  </Button>

                  <Button className={`${isPendingUpdate ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} color="primary" onPress={mutateUpdate} disabled={isPendingUpdate}>
                    {
                      <Circles
                        height="20"
                        width="20"
                        color="#fff"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={isPendingUpdate}
                      />

                    }
                    {!isPendingUpdate && "Update"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>


      </div>
      
      {/* Post body */}
      {
      (post.body &&
        <div className="px-4 pb-2">
          <p className="text-gray-800">{post.body}</p>
        </div>)}

      {post.isShare &&
        <div className="m-4 mt-0 rounded-2xl border border-gray-200 ">
          <PostCard post={post.sharedPost} comments={[]} isShared={true}/>
        </div>
      }

      {/* Post image */}
      {
      post.isShare ||
      (post.image &&
        <div className="relative w-full bg-gray-100">
          <Image
            isBlurred
            removeWrapper
            alt={post.body}
            className="w-full h-full object-cover"
            src={post.image}
          />

        </div>)
      }

      {/* Actions */}
      
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-8 relative borderbottom border-gray-100 pb-4">
          <button

            className="flex items-center gap-2 transition-all duration-200 hover:scale-110"
          >
            <div className="">
              <Heart
              onClick={handleLike}
                className={`cursor-pointer w-6 h-6 transition-colors ${likeState
                  ? "fill-red-500 text-red-500"
                  : "text-gray-700 hover:text-red-500"
                  }`}
              />
              <p className="font-medium text-gray-500 text-sm">
                {likesCount}
              </p>
            </div>
          </button>

          <Link to={`/post/${post._id}`} className="flex items-center gap-2 transition-all duration-200 hover:scale-110">
            <div className="">
              <MessageCircle className="w-6 h-6 text-gray-700 hover:text-primary" />
              <p className="text-sm text-gray-500 p-1.5">{CommentCount}</p>
            </div>
          </Link>
          {
            !post.isShare ?
            (<>
                  <Link onClick={onSharedOpen} className="flex items-center gap-2 transition-all duration-200 hover:scale-110">
                  <div className="">
                    <Share2 className="w-6 h-6 text-gray-700 hover:text-primary" />
                    <p className="text-sm text-gray-500">Share</p>
                  </div>
                </Link>
                <Modal onOpenChange={onShareChange} isOpen={isSharedOpen} onShareChange={(isOpen) => {
                if (!isOpen) {
                  setimgUrl(post.image)
                  postimageinput.current.value = null
                }
                onShareChange(isOpen)
              }}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      {/* <img src={user.photo} alt="User Photo" className=" w-40 h-40 object-cover rounded-full" /> */}
                      <ModalHeader className="text-gray-400 text-3xl mb-4 mt-1 px-4">
                        Shared Post
                      </ModalHeader>
                      <ModalBody >
                        <textarea ref={sharedPostBody} placeholder="What's on your mind?" name="newpost" className="focus:ring-2 outline-none focus:ring-blue-400 w-full h-40 p-2 border border-gray-200 rounded-lg"></textarea>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onClose()}>
                          Close
                        </Button>
                        <Button className={`${shareLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} color="primary" onPress={handleShare} disabled={shareLoading}>
                          {
                            <Circles
                              height="20"
                              width="20"
                              color="#fff"
                              ariaLabel="circles-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={shareLoading}
                            />

                          }
                          {!shareLoading && "Share"}
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>)
            :
            ""
          }
          
          

          <button onClick={handleBookmark} className="flex items-center gap-2 ml-auto transition-all duration-200 hover:scale-110">
            
            <Bookmark className={`cursor-pointer w-6 h-6 ${bookmark?"text-emerald-500 fill-emerald-500":"text-gray-700 hover:text-emerald-500"} `} />
          </button>

        </div>

        {/* create comment */}
        
        { !isShared ?
        (<div className="flex items-center gap-2 mb-6">
          {!user?.photo ?
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
              <button onClick={() => newComment && mutateComment()} className={` text-white w-10 h-10 rounded-full text-xl flex justify-center items-center ${newComment ? "bg-blue-500 cursor-pointer" : "bg-blue-300"}`}>
                <FaArrowRightLong />
              </button>
          }
        </div>):""
        }


        {/* comments */}
      {
      !isShared ?
        (<>{comments ? comments.map((comment) => (
          <Comment key={comment._id} comment={comment} postId={post._id} />
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
        }</>):""
      }

      </div>
    </div>

  );
}

export default React.memo(PostCard);