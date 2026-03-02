import { Link, useNavigate } from "react-router";
import { Settings, Calendar, ArrowLeft } from "lucide-react";
import { IoCamera } from "react-icons/io5";
import { Button } from "@heroui/button";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Alert, Card, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton, useDisclosure } from "@heroui/react";
import MyPosts from "../posts/MyPosts";
import { authContext } from "../../context/AuthContext";
import { MyDataContext } from "../../context/MyData";
import { toast } from "react-toastify";
import { Circles } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  let { token , settoken } = useContext(authContext)
  let { user, isLoading, refetch } = useContext(MyDataContext)
  const inputRef = useRef(null);


  function uploadProfilePhoto() {
    const file = inputRef.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);

    return axios.put(
      "https://route-posts.routemisr.com/users/upload-photo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  let { isPending, mutate } = useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: () => {
      toast.success("Profile photo uploaded ✅", { position: "top-right" })
      refetch()
    },
    onError: () => {
      toast.error("Failed to upload profile photo ❌")
    }
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  let schema = z.object({
    password: z.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ,"at least 8 char and must be contain Upper and Lower char and number and special char"),
    newPassword: z.string().nonempty("New Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ,"at least 8 char and must be contain Upper and Lower char and number and special char"),
  })
  let {register, handleSubmit , formState} = useForm(
      {
        defaultValues:{
          password: "",
          newPassword: ""
        },
        resolver:zodResolver(schema)
      }
    );

    let nav = useNavigate()
      function logout(){
          localStorage.removeItem("token")
          settoken(null)
          nav("/register/login")
      }
    const [error, seterror] = useState(null)
  async function changePassword(values) {
    try {
      await axios.patch("https://route-posts.routemisr.com/users/change-password", values, {
        headers: { Authorization: `Bearer ${token}` }
      })
      onOpenChange(false)
      toast.success("Password changed successfully ✅", { position: "top-right" })
      logout()
    } catch (error) {
      seterror(error.response?.data?.message || "Failed to change password")
      toast.error("Failed to change password ❌")
      
    }
  }





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
                      {user?.cover &&
                        <img
                          src={user.cover}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      }
                    </div>

                    {/* Info */}
                    <div className="relative px-6 pb-6">
                      <div className="flex justify-between items-start -mt-16 mb-4 ">
                        <div className="relative">
                          {
                            isPending ?
                              <Skeleton className="flex rounded-full w-32 h-32" />
                              :
                              <img
                                src={user?.photo}
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
                              />
                          }
                          <div className="p-2 rounded-full bg-white text-gray-700 shadow-md absolute bottom-5 right-5 translate-x-1/2 translate-y-1/2 cursor-pointer hover:bg-gray-100 transition-colors">
                            <input onChange={mutate} ref={inputRef} type="file" className="hidden" id="profile-upload" />
                            <label htmlFor="profile-upload"><IoCamera className="text-xl cursor-pointer" /></label>
                          </div>

                        </div>
                        <Button onClick={onOpen} className="mt-18 bg-linear-to-r from-primary to-blue-600 text-white rounded-xl">
                          <Settings className="w-4 h-4 mr-2" />
                          Change Password
                        </Button>

                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                          <ModalContent>
                            {(onClose) => (
                              <>
                                {/* <img src={user.photo} alt="User Photo" className=" w-40 h-40 object-cover rounded-full" /> */}
                                <ModalHeader className="text-gray-400 text-3xl mb-4 mt-1 px-4">
                                  Change Password
                                </ModalHeader>
                                <ModalBody >
                                    <div className={`overflow-hidden w-full flex items-center my-3 bg-red-200 rounded-2xl border border-red-500 ${!error && "hidden"}`}>
                                      <Alert className='text-red-700' color="warning" title={error} />
                                    </div>

                                  <form onSubmit={handleSubmit(changePassword)} className="bg-white mb-8 mx-auto max-w-lg w-full rounded-2xl p-8 shadow ">
                                    <div className="form-controls space-y-4 py-7">

                                      <div><label htmlFor="password" className="text-sm mb-1">Password</label>
                                        <div className="relative">
                                          <input {...register("password")} placeholder="your old password" className="form-control pl-11 outline-none" id="password" type="password" /><svg data-prefix="fas" data-icon="lock" className="svg-inline--fa fa-lock text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" role="img" viewBox="0 0 384 512" aria-hidden="true">
                                            <path fill="currentColor" d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z">
                                            </path>
                                          </svg></div>
                                          {formState.errors.password && <p className="text-red-500">*{formState.errors.password.message}</p>}
                                      </div>
                                      <div><label htmlFor="newPassword" className="text-sm mb-1">New Password</label>
                                        <div className="relative">
                                          <input {...register("newPassword")} placeholder="Create a strong password" className="form-control pl-11 outline-none" id="newPassword" type="password"/><svg data-prefix="fas" data-icon="lock" className="svg-inline--fa fa-lock text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" role="img" viewBox="0 0 384 512" aria-hidden="true">
                                            <path fill="currentColor" d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z">
                                            </path>
                                          </svg></div>
                                          {formState.errors.newPassword && <p className="text-red-500">*{formState.errors.newPassword.message}</p>}
                                      </div>

                                    </div>

                                    <ModalFooter>
                                  <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                  </Button>

                                  <Button type="submit" className={`${formState.isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} color="primary" disabled={formState.isSubmitting}>
                                        {
                                          <Circles
                                            height="20"
                                            width="20"
                                            color="#fff"
                                            ariaLabel="circles-loading"
                                            wrapperClass=""
                                            visible={formState.isSubmitting}
                                            />
                  
                                        }
                                        {!formState.isSubmitting && "Change Password"}
                                      </Button>
                                </ModalFooter>

                                  </form>
                                </ModalBody>


                                
                              </>
                            )}
                          </ModalContent>
                        </Modal>
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
                            <span className="font-bold text-gray-900">
                              {user.following?.toLocaleString()}
                            </span>
                            <span className="text-gray-600 ml-1">Following <span className="font-bold text-black pl-1">{user.followingCount}</span></span>
                          </button>
                          <button className="hover:underline">
                            <span className="font-bold text-gray-900">
                              {user.followers?.toLocaleString()}
                            </span>
                            <span className="text-gray-600 ml-2">Followers <span className="font-bold text-black pl-1">{user.followersCount}</span></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/50 mb-6">
                    <div className="flex border-b border-gray-200">

                      <button
                        onClick={() => setActiveTab("posts")}
                        className={`flex-1 px-6 py-4 font-medium transition-all duration-200
                    ${activeTab === "posts"
                            ? "text-primary border-b-2 border-primary"
                            : "text-gray-600 hover:bg-gray-50"}`}
                      >
                        Posts
                      </button>

                      <button
                        onClick={() => setActiveTab("media")}
                        className={`flex-1 px-6 py-4 font-medium transition-all duration-200
                    ${activeTab === "media"
                            ? "text-primary border-b-2 border-primary"
                            : "text-gray-600 hover:bg-gray-50"}`}
                      >
                        Media
                      </button>

                      <button
                        onClick={() => setActiveTab("bookmarks")}
                        className={`flex-1 px-6 py-4 font-medium transition-all duration-200
                    ${activeTab === "bookmarks"
                            ? "text-primary border-b-2 border-primary"
                            : "text-gray-600 hover:bg-gray-50"}`}
                      >
                        bookmarks
                      </button>

                    </div>
                  </div>

                  {/* Tab Content */}
                  {activeTab === "posts" && (
                    <div className="md:p-6 text-center text-gray-500">
                      <MyPosts />
                    </div>
                  )}

                  {activeTab === "media" && (
                    <div className="p-6 text-center text-gray-500">
                      Media Content
                    </div>
                  )}

                  {activeTab === "bookmarks" && (
                    <div className="p-6 text-center text-gray-500">
                      bookmark Content
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>

      }
    </div>


  )
}
