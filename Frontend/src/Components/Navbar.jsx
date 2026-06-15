import React from 'react'
import { FaAngleDown,  FaRegUser,  } from "react-icons/fa";
import { GiNestBirds } from 'react-icons/gi';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {  MenuIcon } from 'lucide-react';

import { IoCloseSharp } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { IoIosLogOut } from 'react-icons/io';
import api from '@/utils/axios';
import { toast } from 'sonner';
const Navbar = () => {

  const [open, setopen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [openProfile,setOpenProfile] = useState(false)
  const { user ,setUser } = useAuth()
  const navigate = useNavigate()
  console.log(user)
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }
  const toggleProfile = ()=>{
    setOpenProfile(!openProfile)
  }
  const handleLogout = async()=>{
    try{
const res = await api.post('/auth/logout',{},{withCredentials:true})

toast.success('succesfully logged out')
 setTimeout(() => {
  navigate('/login')
}, 500);
setUser(null)
    }catch(err){
      console.log(err)
    }
  }
  return (

    <div className='font-["Roboto"] fixed top-0 left-0 w-full z-[9999]  bg-transparent shadow-2xs border-b  shadow-black'>
      {/* desktop */}
      {/* student menu */}
      <div className="hidden  w-full py-6 font-heading md:flex justify-between px-12 items-center text-white backdrop-blur-lg  bg-opacity-40 relative ">
        <div className="flex items-center gap-2">
          <GiNestBirds className="text-white text-4xl" />
          <span className="text-3xl font-semibold text-white flex gap-0">
            Skill <span className='font-span capitalize'>nest</span>
          </span>
          <span className="w-2 h-2 bg-[#1e3a8a] rounded-full mt-3"></span>
        </div>


        <ul class="flex justify-center gap-3 font-heading  items-center h-full text-lg ">
          <li className="cursor-pointer hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] rounded-full transition-all duration-300 hover:text-white hover:-translate-y-0.5 py-2 px-5 "><Link to="/">  Home</Link></li>
          <li
            className="relative"
            onMouseEnter={() => setopen(true)}
            onMouseLeave={() => setopen(false)}
          >
            <Link to="/courses" >
              <div className="cursor-pointer  px-5 py-2 rounded-full flex items-center gap-1 hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] text-white/80 hover:text-white transition-all duration-300">
                Courses
                <FaAngleDown
                  className={`transition-transform duration-300 mt-[2px] ${open ? "rotate-180" : ""
                    }`}
                />
              </div>
            </Link>

            {open && (
              <div
                className="
          absolute top-full left-1/2 -translate-x-1/2
          w-[45vw]
          rounded-2xl
          bg-gradient-to-br from-[#141033] to-[#1d1850]
          border border-white/10
          shadow-2xl shadow-black/60
          p-10
          grid grid-cols-2 gap-12
          z-1000
          "
              >
                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-10">

                  {/* Development */}
                  <div className="group">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Development
                    </h3>
                    <ul className="flex flex-col gap-2 text-white/60 text-sm">
                      <li className="hover:text-white transition">Web Development</li>
                      <li className="hover:text-white transition">Mobile Development</li>
                      <li className="hover:text-white transition">Game Development</li>
                      <li className="hover:text-white transition">Programming Languages</li>
                    </ul>
                  </div>

                  {/* Business */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Business
                    </h3>
                    <ul className="flex flex-col gap-2 text-white/60 text-sm">
                      <li className="hover:text-white transition">Entrepreneurship</li>
                      <li className="hover:text-white transition">Marketing</li>
                      <li className="hover:text-white transition">Finance & Accounting</li>
                      <li className="hover:text-white transition">Management</li>
                    </ul>
                  </div>

                  {/* Design */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Design
                    </h3>
                    <ul className="flex flex-col gap-2 text-white/60 text-sm">
                      <li className="hover:text-white transition">Graphic Design</li>
                      <li className="hover:text-white transition">UI/UX Design</li>
                      <li className="hover:text-white transition">Animation</li>
                      <li className="hover:text-white transition">Interior Design</li>
                    </ul>
                  </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-10">

                  {/* Data Science */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Data Science
                    </h3>
                    <ul className="flex flex-col gap-2 text-white/60 text-sm">
                      <li className="hover:text-white transition">Machine Learning</li>
                      <li className="hover:text-white transition">Data Analysis</li>
                      <li className="hover:text-white transition">AI & Deep Learning</li>
                      <li className="hover:text-white transition">Statistics</li>
                    </ul>
                  </div>

                  {/* Health */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Health & Fitness
                    </h3>
                    <ul className="flex flex-col gap-2 text-white/60 text-sm">
                      <li className="hover:text-white transition">Yoga</li>
                      <li className="hover:text-white transition">Mental Health</li>
                      <li className="hover:text-white transition">Nutrition</li>
                      <li className="hover:text-white transition">Sports Training</li>
                    </ul>
                  </div>

                  {/* Language */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Language Learning
                    </h3>
                    <ul className="flex flex-col gap-2 text-white/60 text-sm">
                      <li className="hover:text-white transition">English</li>
                      <li className="hover:text-white transition">Spanish</li>
                      <li className="hover:text-white transition">Korean</li>
                      <li className="hover:text-white transition">Hindi / Regional</li>
                    </ul>
                  </div>

                </div>
              </div>
            )}
          </li>
          <li className="cursor-pointer hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] rounded-full transition-all duration-300 hover:text-white hover:-translate-y-0.5 py-2 px-5 ">About</li>
          <li className="cursor-pointer hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] rounded-full transition-all duration-300 hover:text-white hover:-translate-y-0.5 py-2 px-5 capitalize"><Link to='/teach'>{user?.role ==='teacher' ? 'teach on skillnest' : 'teacher dashboard'}</Link> </li>
        </ul>

       
      
{ (user) ?(
       <>
       {/* {user-profile} */}
        <div className='relative '>
          <div className='flex gap-2 items-center cursor-pointer ' onClick={toggleProfile}>
            <img src={user?.avatar} alt="user.img" className='w-12 h-12 rounded-full border border-gray-50/15' />
            <div className='flex flex-col  '>
              <h1 className='text-base font-medium capitalize'>{user?.firstName}</h1>
              <span className='text-xs text-white/45 font-light'>{user?.email}</span>
            </div>
          </div>
          
          <div className={`bg-white ${openProfile ? 'opacity-100 translate-y-0 ':'opacity-0 -translate-y-6 '}  text-gray-900 rounded-xl p-2 absolute mt-3 duration-200 transition-all ease-in min-w-[184px]`}>
            <Link to='/profile' ><div className='flex group items-center justify-start gap-3 hover:bg-neutral-200 rounded-xl cursor-pointer p-2 border-b duration-100 ease-in transition-all hover:border-b-gray-400'><FaRegUser className='  text-lg group-hover:scale-105 group-hover:rotate-3 transition-all ease-in duration-200' /><span className='text-base font-medium'>Profile</span></div></Link>
          {user.role=="student" &&(<Link to='/become-teacher '><div className='flex group items-center justify-start gap-3 hover:bg-neutral-200 rounded-xl cursor-pointer p-2 border-b  duration-100 ease-in transition-all hover:border-b-gray-400'><LiaChalkboardTeacherSolid className='  text-lg group-hover:scale-105 group-hover:rotate-3 transition-all ease-in duration-200' /><span className='text-base font-medium'>Become a Teacher</span></div></Link> ) } 
            <div onClick={()=>handleLogout()} className='flex group items-center justify-start gap-3 hover:bg-neutral-200 rounded-xl cursor-pointer p-2 border-b  duration-100 ease-in transition-all hover:border-b-gray-400'><IoIosLogOut className='  text-lg group-hover:scale-105 group-hover:rotate-3 transition-all ease-in duration-200' /><span className='text-base font-medium'>logout</span></div>
          </div>

        </div>
        </>
) :(
  <>
  {/* buttons */}
          <div class="flex justify-center text-xl  capitalize   gap-5 items-center h-full">

          <Link to="/login"><button className='
px-6 py-2 rounded-lg font-normal text-lg capitalize text-white border border-white hover:border-[#0e0929]
hover:bg-gradient-to-tr hover:from-[#0e0929] hover:via-[#1c1450] hover:to-[#2a1f75] hover:opacity-90 shadow-lg shadow-black/10 transition-all duration-300 hover:scale-95  cursor-pointer'>Log In</button></Link>
          <Link to="/signup" ><button className='
px-6 py-2 rounded-lg font-normal text-lg capitalize text-white
bg-gradient-to-tr from-[#0e0929] via-[#1c1450] to-[#2a1f75]
hover:opacity-90
shadow-lg shadow-black/10
transition-all duration-300 hover:scale-95  cursor-pointer box'>sign up</button></Link>


        </div>
        </>
        ) }
      </div>
      {/* mobile-menu */}
      {/* <div className="lg:hidden  w-full py-6 font-heading flex justify-between px-4 items-center text-white backdrop-blur-lg  bg-opacity-40 relative ">
        <div className="flex items-center justify-between gap-2">
          <GiNestBirds className="text-white text-4xl" />
          <span className="text-3xl font-semibold text-white flex gap-0">
            Skill <span className='font-span capitalize'>nest</span>
          </span>
          <span className="w-2 h-2 bg-[#1e3a8a] rounded-full mt-3"></span>
        </div>
        <MenuIcon onClick={toggleMenu} className='text-8xl font-semibold ' />

      </div>

      <div className={`fixed inset-0 z-50 flex flex-col px-4 py-6
transition-all duration-400 ease-in-out
${openMenu
          ? "opacity-100 visible bg-black/95"
          : "opacity-0 invisible bg-black/0"
        }`}>
        <div className="  w-full  font-heading flex justify-between items-center text-white backdrop-blur-lg  bg-opacity-40 mb-9 " >
          <div className="flex items-center justify-between gap-2">
            <GiNestBirds className="text-white text-4xl" />
            <span className="text-3xl font-semibold text-white flex gap-0">
              Skill <span className='font-span capitalize'>nest</span>
            </span>
            <span className="w-2 h-2 bg-[#1e3a8a] rounded-full mt-3"></span>
          </div>

          <span><IoCloseSharp className={`text-3xl font-semibold transition-all duration-500 ${openMenu ? 'rotate-0' : 'rotate-180'}`} onClick={toggleMenu} /></span>

        </div>

        <div className='text-gray-900 font-body font-medium text-xl flex flex-col justify-between flex-1 w-full'>
          <ul className='flex flex-col gap-4'>
            <li className={`p-3 border-2 border-gray-300 rounded-lg flex  justify-start font-medium text-gray-300 font-heading transition-all duration-500 ease-in-out ${openMenu ? 'translate-x-0' : 'translate-x-3'}`}><Link to="/">Home</Link></li>
            <li className={`p-3 border-2 border-gray-300 rounded-lg flex  justify-start font-medium text-gray-300 font-heading transition-all delay-100 duration-500 ease-in-out ${openMenu ? 'translate-x-0' : 'translate-x-3'}`}><Link to="/">Courses</Link></li>
            <li className={`p-3 border-2 border-gray-300 rounded-lg flex  justify-start font-medium text-gray-300 font-heading transition-all delay-200 duration-500 ease-in-out ${openMenu ? 'translate-x-0' : 'translate-x-3'}`}><Link to="/">About</Link></li>
            <li className={`p-3 border-2 border-gray-300 rounded-lg flex  justify-start font-medium text-gray-300 font-heading transition-all delay-300 duration-500 ease-in-out ${openMenu ? 'translate-x-0' : 'translate-x-3'}`}><Link to="/">Teach</Link></li>

          </ul>

{(user) ?(<><div></div></>):(     <div className='flex flex-col gap-3 mt-auto '>

            <Link to="/login"><button className='w-full
px-6 py-2 rounded-full font-normal text-xl capitalize text-gray-300 border-2 border-gray-300  hover:border-[#0e0929]
hover:bg-gradient-to-tr  shadow-lg shadow-black/10 transition-all duration-300   cursor-pointer'>Log In</button></Link>
            <Link to="/signup" ><button className=' w-full
px-6 py-2 rounded-full font-normal text-xl capitalize text-white
bg-gradient-to-tr from-[#0e0929] via-[#1c1450] to-[#2a1f75]
hover:opacity-90
shadow-lg shadow-black/10
transition-all duration-300 hover:scale-95  cursor-pointer box'>sign up</button></Link>
          </div>
          )
}     
        </div>

      </div> */}
{/* Mobile Navbar */}
<div className="lg:hidden w-full py-6 px-4 flex justify-between items-center text-white">
  <div className="flex items-center gap-2">
    <GiNestBirds className="text-4xl" />

    <span className="text-3xl font-semibold font-heading">
      Skill <span className="font-span capitalize">nest</span>
    </span>

    <span className="w-2 h-2 bg-[#1e3a8a] rounded-full mt-3"></span>
  </div>

  <MenuIcon
    onClick={toggleMenu}
    className="text-4xl"
  />
</div>

{/* Mobile Menu */}
<div
  className={`fixed inset-0 z-50 flex flex-col px-4 py-6
  transition-all duration-500
  ${
    openMenu
      ? "opacity-100 visible bg-black"
      : "opacity-0 invisible bg-black/0"
  }`}
>
  {/* Header */}
  <div className="w-full flex justify-between items-center text-white mb-8">
    <div className="flex items-center gap-2">
      <GiNestBirds className="text-4xl" />

      <span className="text-3xl font-semibold font-heading">
        Skill <span className="font-span capitalize">nest</span>
      </span>

      <span className="w-2 h-2 bg-[#1e3a8a] rounded-full mt-3"></span>
    </div>

    <IoCloseSharp
      onClick={toggleMenu}
      className={`text-4xl transition-all duration-500 ${
        openMenu ? "rotate-0" : "rotate-180"
      }`}
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1">

    {/* User Card */}
    {user && (
      <div
        className={`mb-8 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md
        transition-all duration-500
        ${
          openMenu
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-4">

          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${user?.name}`
            }
            alt="profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-[#1e3a8a]"
          />

          <div>
            <h3 className="text-white font-semibold text-lg">
              {user?.name}
            </h3>

            <p className="text-gray-400 text-sm">
              {user?.email}
            </p>
          </div>

        </div>
      </div>
    )}

    {/* Navigation */}
    <ul className="flex flex-col gap-4">

      <li
        className={`p-3 border border-gray-700 rounded-xl text-gray-300
        transition-all duration-500
        ${openMenu ? "translate-x-0" : "translate-x-3"}`}
      >
        <Link to="/">Home</Link>
      </li>

      <li
        className={`p-3 border border-gray-700 rounded-xl text-gray-300
        transition-all delay-100 duration-500
        ${openMenu ? "translate-x-0" : "translate-x-3"}`}
      >
        <Link to="/courses">Courses</Link>
      </li>

      <li
        className={`p-3 border border-gray-700 rounded-xl text-gray-300
        transition-all delay-200 duration-500
        ${openMenu ? "translate-x-0" : "translate-x-3"}`}
      >
        <Link to="/about">About</Link>
      </li>

      <li
        className={`p-3 border border-gray-700 rounded-xl text-gray-300
        transition-all delay-300 duration-500
        ${openMenu ? "translate-x-0" : "translate-x-3"}`}
      >
        <Link to="/teach">Teach</Link>
      </li>

    </ul>

    {/* Bottom Section */}
    {user ? (
      <div className="mt-auto flex flex-col gap-3">

        <Link to="/dashboard">
          <button
            className="w-full py-3 rounded-full
            border border-gray-700
            text-gray-300
            bg-white/5"
          >
            Dashboard
          </button>
        </Link>

        <button
       
          className="w-full py-3 rounded-full
          bg-red-500/20
          text-red-400
          border border-red-500/30"
        >
          Logout
        </button>

      </div>
    ) : (
      <div className="mt-auto flex flex-col gap-3">

        <Link to="/login">
          <button
            className="w-full py-3 rounded-full
            border border-gray-600
            text-gray-300"
          >
            Log In
          </button>
        </Link>

        <Link to="/signup">
          <button
            className="w-full py-3 rounded-full
            text-white
            bg-gradient-to-tr
            from-[#0e0929]
            via-[#1c1450]
            to-[#2a1f75]"
          >
            Sign Up
          </button>
        </Link>

      </div>
    )}

  </div>
</div>



    </div>

  )
}
export default Navbar

