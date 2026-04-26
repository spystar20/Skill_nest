import React from 'react'
import { FaAngleDown, FaAngleRight, FaCross } from "react-icons/fa";
import { GiNestBirds } from 'react-icons/gi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cross, MenuIcon } from 'lucide-react';
import { TfiAngleRight } from "react-icons/tfi";

import { IoCloseSharp } from 'react-icons/io5';
const Navbar = () => {

  const [open, setopen] = useState(false)
  const [openMenu , setOpenMenu] = useState(false)
const toggleMenu = ()=>{
  setOpenMenu(!openMenu)
}
  return (

    <div className='font-["Roboto"] fixed top-0 left-0 w-full z-[9999]  bg-transparent shadow-2xs border-b  shadow-black'>
      <div className="hidden  w-full py-6 font-heading md:flex justify-between px-12 items-cente text-white backdrop-blur-lg  bg-opacity-40 relative ">
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
            <Link to="/courses">
              <div className="cursor-pointer px-5 py-2 rounded-full flex items-center gap-1 hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] text-white/80 hover:text-white transition-all duration-300">
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
          <li className="cursor-pointer hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] rounded-full transition-all duration-300 hover:text-white hover:-translate-y-0.5 py-2 px-5 ">Teach</li>
        </ul>

        {/* button  */}
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
      </div>
      {/* mobile-menu */}
<div className="lg:hidden  w-full py-6 font-heading flex justify-between px-4 items-center text-white backdrop-blur-lg  bg-opacity-40 relative ">
  <div className="flex items-center justify-between gap-2">
          <GiNestBirds className="text-white text-4xl" />
          <span className="text-3xl font-semibold text-white flex gap-0">
            Skill <span className='font-span capitalize'>nest</span>
          </span>
          <span className="w-2 h-2 bg-[#1e3a8a] rounded-full mt-3"></span>
        </div>
      <MenuIcon onClick={toggleMenu} className='text-8xl font-semibold '/>
   
</div>
   {openMenu && (
  <div className="absolute top-0 right-0 bg-white shadow-lg rounded-bl-xl py-10 px-2 w-2xl min-h-10/12 transition-all duration-300">
    <span><IoCloseSharp onClick={toggleMenu}/></span>
    <div className='text-gray-900 font-body font-medium text-xl'>
    <ul className='flex flex-col gap-4'>
      <li><Link to="/"><div className='p-2 border-2 rounded-lg flex justify-between items-center font-medium font-heading active:bg-black active:text-white' ><span>Home</span><FaAngleRight className='text-xs font-semibold text-black hover:translate-y-1'/></div></Link></li>
   <li><Link to="/"><div>
   <div className='p-2 border-2 rounded-lg flex justify-between items-center font-medium font-heading active:bg-black active:text-white' ><span>Courses</span><FaAngleDown className='text-xs font-semibold text-black hover:translate-y-1'/></div>
   <div className='p-2 border-2 rounded-lg flexflex-col justify-between items-center font-medium font-heading' >
    <h4 className='text-lg font-semibold'>Development</h4>
    <ul>  
                      <li className=" text-gray-800 font-light">Web Development</li>
                      <li className="hover:text-white transition">Mobile Development</li>
                      <li className="hover:text-white transition">Game Development</li>
                      <li className="hover:text-white transition">Programming Languages</li>
    </ul>
    </div></div></Link></li>
    </ul>
    

    </div>
  </div>
)}

    </div>
    

  )
}
export default Navbar


