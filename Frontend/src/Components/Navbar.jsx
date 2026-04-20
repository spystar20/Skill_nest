import React from 'react'
import { FaAngleDown } from "react-icons/fa";
import { GiNestBirds } from 'react-icons/gi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {

  const [open, setopen] = useState(false)

  return (

    <div className='font-["Roboto"] fixed top-0 left-0 w-full z-[9999]  bg-transparent shadow-2xs border-b border-b-white/10 shadow-black'>
      <div className="w-full py-6 font-heading flex justify-between px-12 items-cente text-white backdrop-blur-lg  bg-opacity-40 relative ">
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
              <li className="cursor-pointer px-5 py-2 rounded-full flex items-center gap-1 hover:bg-gradient-to-tr hover:from-[#95b1ee] hover:to-[#728ccd] text-white/80 hover:text-white transition-all duration-300">
                Courses
                <FaAngleDown
                  className={`transition-transform duration-300 mt-[2px] ${open ? "rotate-180" : ""
                    }`}
                />
              </li>
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
    </div>

  )
}
export default Navbar