import React from 'react'
import { FaBell, FaBookmark, FaUnlockAlt, FaUserCircle } from 'react-icons/fa'
import { GiNestBirds } from 'react-icons/gi'
import { ImBook } from 'react-icons/im'
import { IoLogOutSharp } from 'react-icons/io5'
import { MdDashboard, MdPlayLesson } from 'react-icons/md'
import {  PiCertificateFill } from 'react-icons/pi'

const Sidebar = () => {
  return (
    <div className='min-h-screen bg-[#0a1931] w-64  fixed left-0 top-0 backdrop-blur-lg  bg-opacity-40 text-white flex flex-col justify-between '>
        <div>
  <div className="flex items-center gap-2 p-3">
          <GiNestBirds className="text-white text-3xl" />
          <span className="text-2xl font-semibold text-white flex gap-0">
            Skill <span className='font-span capitalize'>nest</span>
          </span>
          <span className="w-2 h-2 bg-[#1e3a8a] rounded-full mt-3"></span>
        </div>
<div>
    <div className='flex flex-col py-6 gap-3 border-b border-white/10'>
        <h2 className='text-white/80 uppercase text-sm  px-3 font-body'>Learning</h2>
    <ul className='flex flex-col font-heading gap-3 '>
        <li className='flex items-center justify-start gap-2 text-lg px-3 py-1 hover:translate-x-1 hover:bg-white hover:text-[#0a1931] rounded-l-full transition-all duration-200 ease-in cursor-pointer'><MdDashboard className='w-4 h-4 '/><span>Dashboard</span></li>
         <li className='flex items-center justify-start gap-2 text-lg px-3 py-1 hover:translate-x-1 hover:bg-white hover:text-[#0a1931] rounded-l-full transition-all duration-200 ease-in cursor-pointer'><ImBook className='w-4 h-4 '/><span>Courses</span></li>
          <li className='flex items-center justify-start gap-2 text-lg  px-3 py-1 hover:translate-x-1 hover:bg-white hover:text-[#0a1931] rounded-l-full transition-all duration-200 ease-in cursor-pointer'><MdPlayLesson className='w-4 h-4'/><span>Continue Learning</span></li>
           <li className='flex items-center justify-start gap-2 text-lg px-3 py-1 hover:translate-x-1 hover:bg-white hover:text-[#0a1931] rounded-l-full transition-all duration-200 ease-in cursor-pointer'><FaBookmark className='w-4 h-4 '/><span>BookMark</span></li>
            <li className='flex items-center justify-start gap-2 text-lg px-3 py-1 hover:translate-x-1 hover:bg-white hover:text-[#0a1931] rounded-l-full transition-all duration-200 ease-in cursor-pointer'><PiCertificateFill className='w-4 h-4 '/><span>Certificate</span></li>
    </ul>
    </div>
     <div className='flex flex-col py-6 gap-3 border-b border-white/10'>
      <h2 className='text-white/80 uppercase text-sm  px-3 font-body'>Account</h2>
     <ul className='flex flex-col font-heading gap-3'>
        <li className='flex items-center justify-start gap-2 text-lg px-3 py-1 hover:translate-x-1 hover:bg-white hover:text-[#0a1931] rounded-l-full transition-all duration-200 ease-in cursor-pointer'><FaUserCircle className='w-4 h-4 '/><span>Profile</span></li>
         <li className='flex items-center justify-start gap-2 text-lg px-3 py-1 hover:translate-x-1 hover:bg-white hover:text-[#0a1931] rounded-l-full transition-all duration-200 ease-in cursor-pointer'><FaUnlockAlt className='w-4 h-4 '/><span>Security</span></li>
          <li className='flex items-center justify-start gap-2 text-lg  px-3 py-1 hover:translate-x-1 hover:bg-white hover:text-[#0a1931] rounded-l-full transition-all duration-200 ease-in cursor-pointer'><FaBell className='w-4 h-4'/><span>Notifications</span></li>
      
    </ul>
    </div>
  
    
</div>
</div>

<div className='flex items-center justify-start gap-2 text-lg px-3 p-1 mb-4 hover:translate-x-1 hover:bg-white hover:text-[#0a1931] rounded-l-full transition-all duration-200 ease-in cursor-pointer '><IoLogOutSharp className='w-5 h-5'/><span>Logout</span></div>

    </div>
  )
}

export default Sidebar