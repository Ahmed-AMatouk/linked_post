import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCalendar, FaHouseUser, FaUser } from "react-icons/fa";
import { BsGenderAmbiguous } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {Alert} from "@heroui/react";
import { useState } from 'react';
import { Circles } from 'react-loader-spinner';



let schema = z.object({
  name: z.string("Plz enter your Name").nonempty("Name is required").min(3,"min length is 3").max(10,"max length is 10"),
  username: z.string("Plz enter your UserName").nonempty("UserName is required").min(3,"min length is 3").max(10,"max length is 10"),
  email: z.email("Invalid Email"),
  password: z.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ,"at least 8 char and must be contain Upper and Lower char and number and special char"),
  rePassword: z.string().nonempty("repassword is required"),
  dateOfBirth: z.string().nonempty("Date is required"),
  gender: z.enum(["male","female"] ,"Choose male or female")
}).refine((values)=>values.password == values.rePassword , {message:"repassword must be equal Password",path:["rePassword"]})
export default function Signup() {
  let nav = useNavigate()
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  let {register, handleSubmit , formState} = useForm(
    {
      defaultValues:{
        name: "",
        username: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        rePassword: ""
      },

      resolver:zodResolver(schema)
    }

  );

  async function Submit(values){
    console.log(values);
    try {
      setLoading(true)
      let {data} = await axios.post("https://route-posts.routemisr.com/users/signup", values);
      setError(null)
      console.log(data);
      setSuccess(data.message);
      setTimeout(() => {
        setSuccess(null);
        setLoading(false);
        nav("/login")
      }, 2000);
      
      
      
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message)
      setSuccess(null)
    }
    

    
  }
  return (
    <>
      
      <form onSubmit={handleSubmit(Submit)} className="bg-white m-8 mx-auto max-w-lg w-full rounded-2xl p-8 shadow ">
                  <h1 className='text-4xl font-bold text-center mb-3'>Sign up</h1>
                  <p className='text-center'>Don't have an account?  <Link className='text-blue-500' to={"/register/login"}>Login</Link> </p>
                  <div className="my-5 flex items-center gap-3 *:grow">
                    <button className="rounded-xl border border-gray-300 btn hover:scale-105 transition-transform duration-200"><svg data-prefix="fab" data-icon="google" className="svg-inline--fa fa-google text-red-500" role="img" viewBox="0 0 512 512" aria-hidden="true">
                      <path fill="currentColor" d="M500 261.8C500 403.3 403.1 504 260 504 122.8 504 12 393.2 12 256S122.8 8 260 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9c-88.3-85.2-252.5-21.2-252.5 118.2 0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9l-140.8 0 0-85.3 236.1 0c2.3 12.7 3.9 24.9 3.9 41.4z">
                      </path>
                    </svg><span className='ms-2'>Google</span>
                    </button>
                    <button className="rounded-xl border border-gray-300 btn bg-blue-500 text-white hover:scale-105 transition-transform duration-200"><svg data-prefix="fab" data-icon="facebook-f" className="svg-inline--fa fa-facebook-f" role="img" viewBox="0 0 320 512" aria-hidden="true">
                      <path fill="currentColor" d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z">
                      </path>
                    </svg><span className='ms-2'>Facebook</span>
                    </button>
                  </div>
                  <div className="text-center text-gray-400 relative after:content-[''] after:h-0.5 after:w-1/3 w-full after:bg-linear-to-r after:from-white after:via-gray-400 after:to-white after:absolute after:right-0 after:top-1/2 mx-auto
                                    before:content-[''] before:h-0.5 before:w-1/3 before:bg-linear-to-r before:from-white before:via-gray-400 before:to-white before:absolute before:left-0 before:top-1/2  text-sm">or continue with email</div>
                  <div className="form-controls space-y-4 py-7">
                    {
                      success &&
                      <div className="w-full flex items-center my-3 bg-emerald-200 rounded-2xl border border-emerald-500">
                        <Alert className='text-emerald-700' color="success" title={success} />
                      </div>
                    }
                    {
                      error &&
                      <div className="w-full flex items-center my-3 bg-red-200 rounded-2xl border border-red-500">
                        <Alert className='text-red-700' color="warning" title={error} />
                      </div>
                    }
                    
                    <div><label htmlFor="name" className="text-sm mb-1">Full Name</label>
                      <div className="relative">
                        <input placeholder="Enter your full name" className="form-control  pl-11 outline-none" id="name" type="text" {...register("name")} />
                        <FaUser className='text-gray-400 text-xl absolute top-1/2 left-4 -translate-y-1/2 '/>
                      </div>
                      {formState.errors.name && <p className="text-red-500">*{formState.errors.name.message}</p>}
                    </div>
                    <div><label htmlFor="username" className="text-sm mb-1">UserName</label>
                      <div className="relative">
                        <input placeholder="Enter your username" className="form-control  pl-11 outline-none" id="username" type="text" {...register("username")}/>
                        <FaHouseUser className='text-gray-400 text-xl absolute top-1/2 left-4 -translate-y-1/2 '/>
                      </div>
                      {formState.errors.username && <p className="text-red-500">*{formState.errors.username.message}</p>}
                    </div>
                    
                    <div><label htmlFor="email" className="text-sm mb-1">Email Address</label>
                      <div className="relative">
                        <input placeholder="name@example.com" className="form-control  pl-11 outline-none" id="email" type="email" {...register("email")}/><svg data-prefix="fas" data-icon="envelope" className="svg-inline--fa fa-envelope text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" role="img" viewBox="0 0 512 512" aria-hidden="true">
                          <path fill="currentColor" d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z">
                          </path>
                        </svg></div>
                      {formState.errors.email && <p className="text-red-500">*{formState.errors.email.message}</p>}
                    </div>
                    
                    <div><label htmlFor="password" className="text-sm mb-1">Password</label>
                      <div className="relative">
                        <input placeholder="Create a strong password" className="form-control pl-11 outline-none" id="password" type="password" {...register("password")}/><svg data-prefix="fas" data-icon="lock" className="svg-inline--fa fa-lock text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" role="img" viewBox="0 0 384 512" aria-hidden="true">
                          <path fill="currentColor" d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z">
                          </path>
                        </svg></div>
                        {formState.errors.password && <p className="text-red-500">*{formState.errors.password.message}</p>}
                    </div>
                    <div><label htmlFor="rePassword" className="text-sm mb-1">Confirm Password</label>
                      <div className="relative">
                        <input placeholder="Confirme your Password" className="form-control pl-11 outline-none" id="rePassword" type="password" {...register("rePassword")}/><svg data-prefix="fas" data-icon="lock" className="svg-inline--fa fa-lock text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" role="img" viewBox="0 0 384 512" aria-hidden="true">
                          <path fill="currentColor" d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z">
                          </path>
                        </svg></div>
                        {formState.errors.rePassword && <p className="text-red-500">*{formState.errors.rePassword.message}</p>}
                    </div>
                    <div className="flex w-full items-center gap-3 ">
                      <div className='w-1/2'><label htmlFor="dateOfBirth" className="text-sm mb-1">Date Of Birth</label>
                        <div className="relative">
                          <input placeholder="name@example.com" className="form-control  pl-11 outline-none pe-3" id="dateOfBirth" type="date" {...register("dateOfBirth")}/>
                          <FaCalendar className='text-gray-400 text-xl absolute top-1/2 left-4 -translate-y-1/2 '/>
                        </div>
                        {formState.errors.dateOfBirth && <p className="text-red-500">*{formState.errors.dateOfBirth.message}</p>}
                      </div>
                      
                      <div className='w-1/2'><label htmlFor="Gender" className="text-sm mb-1">Gender</label>
                        <div className="relative">
                          <select {...register("gender")} id="Gender" className='form-control  pl-11 appearance-none outline-none' placeholder="fmkd">
                            <option value="" >Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          <BsGenderAmbiguous className='text-gray-400 text-xl absolute top-1/2 left-4 -translate-y-1/2 '/>
                        </div>
                        {formState.errors.gender && <p className="text-red-500">*{formState.errors.gender.message}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {
                    loading?
                      <button disabled className="cursor-not-allowed rounded-xl w-full py-3 bg-linear-to-r from-blue-600 to-blue-400 border-none text-white font-bold"><span className='flex justify-center'>
                        <Circles
                          height="40"
                          width="40"
                          color="#fff"
                          ariaLabel="circles-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          
                          />
                        </span></button>
                    :
                      <button type="submit" className=" rounded-xl pointer w-full py-3 bg-linear-to-r from-blue-600 to-blue-400 border-none text-white font-bold"><span>Sign
                        up</span><svg data-prefix="fas" data-icon="arrow-right" className="svg-inline--fa fa-arrow-right" role="img" viewBox="0 0 512 512" aria-hidden="true">
                          <path fill="currentColor" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z">
                          </path>
                        </svg></button>
                  }
                  
      
      
                </form>
    
    </>
  )
}
