import React from 'react'
import img from "../../assets/alex-avatar.png"
import { Outlet } from 'react-router-dom'

export default function LayoutForm() {
  return (
    <>
        <div className="row text-gray-700">
        <div className={`text-white p-8 lg:w-1/2 w-full relative linear min-h-screen bg-[linear-gradient(rgba(20,71,230,.8),rgba(20,71,230,.8)),url("../../../public/signup-bg.png")] bg-cover bg-center`}>
          <div className='flex gap-3 items-center'>
            <span className='px-4.5 py-2.5 backdrop-blur-2xl rounded-xl border bg-[#ffffff62] border-[#ffffff54] font-bold'>S</span><div className="font-bold text-2xl">SocialHub</div>
          </div>
          <div className="title"><h2 className="text-5xl font-bold max-w-96 my-4">Welcome <br /><span className="pb-4 bg-linear-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent">to SocialHub App</span></h2><p className="max-w-md">Signin to connect people all over the world</p></div>
          <section className="feature-section my-7">
            <h3 className="sr-only">Platform Features</h3>
            <ul className="feature-cards grid lg:grid-cols-2 gap-4">
              <li className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 hover:scale-105 transition-transform duration-200">
                <div className="p-3 size-10 flex justify-center items-center rounded-xl bg-teal-400/20 text-green-300"><svg data-prefix="fas" data-icon="message" className="svg-inline--fa fa-message" role="img" viewBox="0 0 512 512" aria-hidden="true">
                  <path fill="currentColor" d="M0 352L0 128C0 75 43 32 96 32l320 0c53 0 96 43 96 96l0 224c0 53-43 96-96 96l-120 0c-5.2 0-10.2 1.7-14.4 4.8L166.4 539.2c-4.2 3.1-9.2 4.8-14.4 4.8-13.3 0-24-10.7-24-24l0-72-32 0c-53 0-96-43-96-96z">
                  </path>
                </svg></div>
                <div className="card-body">
                  <h4>Real-time Chat</h4><span>Instant messaging</span>
                </div>
              </li>
              <li className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 hover:scale-105 transition-transform duration-200">
                <div className="p-3 size-10 flex justify-center items-center rounded-xl bg-blue-400/20 text-blue-100"><svg data-prefix="fas" data-icon="image" className="svg-inline--fa fa-image" role="img" viewBox="0 0 448 512" aria-hidden="true">
                  <path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z">
                  </path>
                </svg></div>
                <div className="card-body">
                  <h4>Share Media</h4><span>Photos &amp; videos</span>
                </div>
              </li>
              <li className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 hover:scale-105 transition-transform duration-200">
                <div className="p-3 size-10 flex justify-center items-center rounded-xl bg-pink-400/20 text-pink-100"><svg data-prefix="fas" data-icon="bell" className="svg-inline--fa fa-bell" role="img" viewBox="0 0 448 512" aria-hidden="true">
                  <path fill="currentColor" d="M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z">
                  </path>
                </svg></div>
                <div className="card-body">
                  <h4>Smart Alerts</h4><span>Stay updated</span>
                </div>
              </li>
              <li className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2 hover:scale-105 transition-transform duration-200">
                <div className="p-3 size-10 flex justify-center items-center rounded-xl bg-teal-400/20 text-green-300"><svg data-prefix="fas" data-icon="users" className="svg-inline--fa fa-users" role="img" viewBox="0 0 640 512" aria-hidden="true">
                  <path fill="currentColor" d="M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z">
                  </path>
                </svg></div>
                <div className="card-body">
                  <h4>Communities</h4><span>Find your tribe</span>
                </div>
              </li>
            </ul>
          </section>
          <section className='py-5'>
            <ul className="flex items-center gap-5">
              <li>
                <div className="size-10 flex gap-2 items-center"><svg data-prefix="fas" data-icon="users" className="svg-inline--fa fa-users" role="img" viewBox="0 0 640 512" aria-hidden="true">
                  <path fill="currentColor" d="M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z">
                  </path>
                </svg><span className="text-2xl font-bold">2M+</span></div>
                <p>Active Users</p>
              </li>
              <li>
                <div className="size-10 flex gap-2 items-center"><svg data-prefix="fas" data-icon="heart" className="svg-inline--fa fa-heart" role="img" viewBox="0 0 512 512" aria-hidden="true">
                  <path fill="currentColor" d="M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z">
                  </path>
                </svg><span className="text-2xl font-bold">10M+</span></div>
                <p>Posts Shared</p>
              </li>
              <li>
                <div className="size-10 flex gap-2 items-center"><svg data-prefix="fas" data-icon="message" className="svg-inline--fa fa-message" role="img" viewBox="0 0 512 512" aria-hidden="true">
                  <path fill="currentColor" d="M0 352L0 128C0 75 43 32 96 32l320 0c53 0 96 43 96 96l0 224c0 53-43 96-96 96l-120 0c-5.2 0-10.2 1.7-14.4 4.8L166.4 539.2c-4.2 3.1-9.2 4.8-14.4 4.8-13.3 0-24-10.7-24-24l0-72-32 0c-53 0-96-43-96-96z">
                  </path>
                </svg><span className="text-2xl font-bold">50M+</span></div>
                <p>Messages Sent</p>
              </li>
            </ul>
          </section>
          <section className='my-5 p-4 bg-[#ffffff33] backdrop-blur-2xl hover:bg-[#ffffff54] transition duration-200 rounded-2xl border border-[#ffffff6b]'>
            <div className="stars">
              <svg data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star hover:scale-110 transition-transform duration-200 text-yellow-300" role="img" viewBox="0 0 576 512" aria-hidden="true">
                <path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z">
                </path>
              </svg>
              <svg data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star hover:scale-110 transition-transform duration-200 text-yellow-300" role="img" viewBox="0 0 576 512" aria-hidden="true">
                <path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z">
                </path>
              </svg>
              <svg data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star hover:scale-110 transition-transform duration-200 text-yellow-300" role="img" viewBox="0 0 576 512" aria-hidden="true">
                <path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z">
                </path>
              </svg>
              <svg data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star hover:scale-110 transition-transform duration-200 text-yellow-300" role="img" viewBox="0 0 576 512" aria-hidden="true">
                <path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z">
                </path>
              </svg>
              <svg data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star hover:scale-110 transition-transform duration-200 text-yellow-300" role="img" viewBox="0 0 576 512" aria-hidden="true">
                <path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z">
                </path>
              </svg>

            </div>
            <p className='italic text-[20px] py-4'>"SocialHub has completely changed how I connect with friends and discover new communities. The experience is seamless!"</p>
            <div className='flex items-center gap-3'>
              <figure className='size-12 '>
                <img src={img} className='rounded-full' alt="" />
              </figure>
              <div className="">
                <p className=''>Alex Johnson</p>
                <p className='text-gray-400 text-sm'>Product Designer</p>
              </div>
            </div>
          </section>



        </div>
        <div className="lg:w-1/2 w-full bg-gray-100 flex items-center justify-center ">
          <Outlet/>
        </div>
      </div>
    
    </>
  )
}
