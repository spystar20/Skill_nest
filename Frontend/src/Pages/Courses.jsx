import React, { useState } from 'react'
import { FaCartArrowDown, FaSearch, FaStar } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Course from '../data/course'
import courseCategories from '../data/CourseCategories';
import { IoTime } from "react-icons/io5";
import { SiBookstack } from "react-icons/si";
import { FaEye } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CiClock1, CiHeart } from 'react-icons/ci';
import { toggleStore } from '../Store/toggleStore';
import { useCourseStore } from '../Store/CourseFunc';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import { FiTrendingUp } from 'react-icons/fi';
import { PiBookDuotone } from 'react-icons/pi';
const Courses = () => {

  const { openCourseCategories, showSort, openSubCategories, Liked, toggle, toggleSubCategories, toggleLike } = toggleStore()

  const { selectCourse, selectSubCategories, price, rating, search, sortBy, handleSearch, handleCategories, handleSubCategories, handleSort, handleRating, setFilter } = useCourseStore()

  const PriceArr = [{ rate: 'free' }, { rate: 'paid' }]
  const star = [5, 4, 3, 2, 1]
  const FilteredArray = Course.filter((course) => {
    const searchFields = `${course.category}${course.subcategory}${course.instructor_name}${course.course_desc}${course.price}${Number(course.duration)}`.toLowerCase()
    return ((selectCourse === '' || selectCourse === course.category) && (selectSubCategories === '' || selectSubCategories === course.subcategory) && (price === '' || price.toLowerCase() === course.price.toLowerCase()) && (rating === '' || course.rating >= rating) && (search === '' || searchFields.includes(search.toLowerCase()))
    )
  })
  const FinalArr = [...FilteredArray].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === " views") return b.view - a.view
  })
  const comingSoon = FinalArr.length === 0;
  const [page, setPage] = useState(1)
  const itemsPerPage = 6

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const CurrentCourse = FinalArr.slice(startIndex, endIndex)
  return (
    <div className='min-h-screen bg-white w-full font-[Roboto]'>
      <div className='w-full flex flex-col min-h-[320px] gap-3 pt-23 justify-center items-center text-white  home-bg'>
        <h2 className='text-5xl font-semibold font-[Outfit]  capitalize '>courses</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, labore.</p>
      </div>
      {/* search and sort */}
      <div className='p-6  flex justify-center gap-4 items-center shadow-xs font-body'>
        <button className='text-base h-12 px-8 font-normal text-gray-700  capitalize border  cursor-pointer rounded-lg  hover:bg-gray-100'>
          filter
        </button>
        <div className='relative'>
          <button onClick={() => toggle("showSort")} className='text-base h-12 px-8 text-gray-700 font-normal capitalize border cursor-pointer rounded-lg  hover:bg-gray-100'>
            sort
          </button>
          <ul className={`absolute flex flex-col bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] shadow-2xl mt-2 capitalize font-semibold text-white rounded-lg   cursor-pointer transition-all ease-out duration-300 w-34 z-50 ${showSort ? 'visible translate-y-0' : 'invisible -translate-y-6'}`}>
            <li className=' hover:bg-black  hover:text-white  text-white p-3 rounded-t-lg  '>
              popular
            </li>
            <li onClick={() => handleSort("price")} className=' hover:bg-black  hover:text-white  text-white p-3 '>
              Price
            </li>
            <li onClick={() => handleSort("rating")} className='hover:bg-black  hover:text-white text-white p-3 '>
              rating
            </li>
            <li onClick={() => handleSort("views")} className=' hover:bg-black  hover:text-white text-white p-3 rounded-b-lg '>
              views
            </li>
          </ul>
        </div>
        <div className='flex-1 overflow-hidden rounded-lg border flex justify-between items-center'>
          <input value={search} onChange={(e) => setFilter("search", e.target.value)} type="text" className=' flex-1 h-full text-base  border-none outline-none placeholder:capitalize placeholder:font-[Roboto] placeholder:text-gray-900 placeholder:font-light px-4 ' placeholder='search desired courses' />
          <span className='h-11 text-white
bg-gradient-to-tr from-[#95b1ee] to-[#728ccd]
transition-all duration-300  px-4  flex items-center rounded-lg'><FaSearch className='text-xl scale-100 hover:scale-125 cursor-pointer text-white' /></span>
        </div>
      </div>
   
      {/* filter */}
      <div className='flex items-start gap-8 '>
        <aside className=' border rounded-2xl p-6 sticky flex flex-col  shrink-0 self-start top-24 w-[300px] '>
          <div className=' font-[Outfit] w-full  '>
            <h2 onClick={() => toggle("openCourseCategories")} className='text-lg font-semibold mb-3 flex justify-between items-center   '>Categories <span><MdOutlineKeyboardArrowDown className={`text-2xl font-black rotate-0  transition-all cursor-pointer ease-out ${openCourseCategories ? 'rotate-180' : 'rotate-0'}`} /></span></h2>
            {openCourseCategories &&
              courseCategories.map((course, index) => {
                return (

                  <div key={index}>
                    <div onClick={() => toggleSubCategories(course.category)} className='flex items-center pt-2 hide '>
                      <label>
                        <span className='flex justify-center items-center'>
                          <input type="checkbox" className='w-3 cursor-pointer border-none h-3 accent-pink-400' name={course.category} checked={selectCourse === course.category} onChange={() => setFilter("selectCourse", course.category)} value={course.category} id="" />
                          <span className='text-base text-gray-700 px-3 text-wrap capitalize '>{course.category}</span>
                        </span>
                      </label>
                      <span ><MdOutlineKeyboardArrowDown className='text-xl cursor-pointer ' /></span>
                    </div>
                    {openSubCategories[course.category] && course.subcategories && (
                      <div className='pl-4'>
                        {course.subcategories.map((subc, index) => {
                          return (
                            <div key={index} className='flex items-center  py-3 '>
                              <label>
                                <span className='flex justify-center items-center'>
                                  <input type="checkbox" onChange={() => setFilter("selectSubCategories", subc)} checked={selectSubCategories === subc} value={subc} className=' border-none  accent-pink-400' name="web development" id="" />
                                  <span className='text-base font-normal px-3 capitalize'>{subc}</span>
                                </span>
                              </label>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
          {/* Rating */}
          <div className='font-[Outfit]  w-full'>
            <h2 className='text-lg font-medium mb-3 flex justify-between items-center  capitalize '>rating<span><MdOutlineKeyboardArrowDown className='text-2xl font-black' /></span></h2>
            <div>

              <div className='pl-4'>
                {star.map((star, index) => {
                  return (
                    <div className='flex items-center  py-3 ' key={index}>
                      <label >
                        <span className='flex justify-center items-center'>
                          <input type="radio" className=' border-none  accent-pink-400' onChange={(e) => setFilter("rating", Number(e.target.value))} checked={Number(rating) === star} value={star} name={star} id="" />
                          <span className='text-base text-gray-700 font-normal px-3 capitalize'>{star} & above</span>
                        </span>
                      </label>
                    </div>
                  )
                })}


              </div>

            </div>

          </div>
          {/* price */}
          <div className='font-[Outfit]  w-full'>
            <h2 className='text-lg font-semibold mb-3 flex justify-between items-center  capitalize '>price<span><MdOutlineKeyboardArrowDown className='text-2xl font-black' /></span></h2>
            <div className='space-y-1'>
              {PriceArr.map((arr, index) => {
                return (
                  <div key={index} >
                    <div className='flex items-center  py-1 '>
                      <label className='flex gap-3 p-2 rounded-lg transition hover:bg-gray-50 cursor-pointer   justify-center items-center'>
                       
                          <input type="radio" onChange={(e) => setFilter("price", e.target.value)} checked={price === arr.rate} value={arr.rate} className=' border-none  accent-pink-400' id="" />
                          <span className='text-base text-gray-700 font-normal capitalize'>{arr.rate}</span>
                      
                      </label>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>

        </aside>
     
        {/* courses */}
        {comingSoon ? (
          <div className="text-center flex justify-center items-center h-[20vh] w-full text-xl font-[Merienda] font-semibold text-gray-500 py-4">
            🚀 Courses will be available soon
          </div>
        ) : (
          <div className='flex-1 min-w-0'>
            <div className='grid grid-cols-3  gap-4 px-5 py-10'>
              {CurrentCourse.map((course,index) => {
                return (
                  <Link key={course.id} to={`/courses/${course.course_name}`}>
                    <div key={index} className='cards rounded-lg  md:rounded-4xl p-2  md:p-5'>
             
              <div className='relative group cursor-pointer'>
                <img src={course.img} className='aspect-square  rounded-2xl shadow group-hover:brightness-50 transition-all ease-in duration-200' alt="" />
              <span className="py-2 px-4 text-sm shadow-lg bg-black/70 backdrop-blur rounded-full absolute top-3 left-3 text-white font-body">
      {course.category}
    </span>

                <div className=' gap-5 items-center justify-start absolute bottom-1 right-0 z-40 text-xl text-black p-5 hidden group-hover:flex '><span className=' bg-white p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all'>
                  <FaHeart/></span><span className=' bg-white p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all'><FaCartArrowDown/></span></div>
              </div>
              
                <div className=' flex flex-col gap-2 md:gap-4'>
                    <div className='flex flex-col text-left flex-wrap '>
                <h2 className='text-sm md:text-xl font-semibold font-heading text-gray-950'>{course.course_name}</h2>
                <p className='text-xs/4 md:text-sm  mt-1 text-wrap font-body text-gray-800 line-clamp-2'>{course.course_desc}
                </p>
              </div>
             
<div className='flex items-center justify-start flex-wrap gap-2 md:gap-3'>
    <span className=' p-1 md:py-1 md:px-4 text-xs lg:text-sm font-medium shadow-sm  font-body  rounded-sm md:rounded-full capitalize   bg-slate-100 text-slate-700 flex flex-row gap-1 md:gap-2 items-center'><span><PiBookDuotone className='text-sm md:text-xl'/></span>{course.chapters}</span>
      <span className=' p-1 md:py-1 md:px-4 text-xs lg:text-sm font-medium shadow-sm font-body   rounded-sm md:rounded-full  bg-slate-100 text-slate-700 flex flex-row gap-1 md:gap-2 items-center '><span><CiClock1 className='text-sm md:text-xl'/></span>{course.duration}</span>
      <span className=" p-1 md:py-1 md:px-4 text-xs lg:text-sm font-medium  shadow-sm  rounded-sm md:rounded-full bg-indigo-300 text-white flex gap-1 md:gap-2 items-center">
        <FiTrendingUp className="text-sm md:text-xl" />
{course.level}      </span>
</div>
 <div className='hidden md:flex justify-start items-center gap-3'>
                <div><img src={course.instructor_img} className=' w-8 md:w-12 rounded-full aspect-[1]' alt="" /></div>
                <div className=' flex flex-col justify-start items-start capitalize font-[outfit]'>
                  <span className=' text-sm md:text-lg font-semibold md:font-medium'>{course.instructor_name}</span>
                  <span className='font-medium text-xs  md:text-sm '>instructor</span>
                </div>
              </div>
              <div className='flex flex-col  gap-2 items-start  justify-between'>
              <div className="flex items-center gap-3">
      <span className="text-sm line-through text-gray-400">₹2000</span>
      <span className=" text-lg md:text-3xl font-semibold text-indigo-900">₹{course.price}</span>
    </div>
    <div className='w-full'>
        <button className=' transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-[Comic_Relief]  cursor-pointer text-white rounded-full md:py-1.5 py-1 px-5 w-full text-lg box capitalize font-medium hover:scale-95'>buy now</button></div></div>
                </div>
            </div>
                  </Link>
                )
              })}

            </div>
            <div className='flex justify-center py-6'>
              <Pagination
                count={Math.ceil(FinalArr.length / itemsPerPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "rgb(244 114 182)", // tailwind pink-400
                    color: "white",
                  },
                  "& .MuiPaginationItem-root.Mui-selected:hover": {
                    backgroundColor: "rgb(236 72 153)", // tailwind pink-500 for hover
                  }
                }}
              />

            </div>
          </div>)}
      </div>




    </div>
  )
}

export default Courses