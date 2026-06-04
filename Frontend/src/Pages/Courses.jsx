import React, { useEffect, useState } from 'react'
import {  FaSearch, FaSortAlphaDownAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Course from '../data/course'
import courseCategories from '../data/CourseCategories';
import { IoFilterSharp, IoTime } from "react-icons/io5";
import { toggleStore } from '../Store/toggleStore';
import { useCourseStore } from '../Store/CourseFunc';
import Pagination from '@mui/material/Pagination';

import ProjectCard from '@/utils/ProjectCard';
import api from '@/utils/axios';
import { Import } from 'lucide-react';
const Courses = () => {
  const [ courses , setCourses] = useState(null)
  useEffect(()=>{
    handleCourses()
    console.log(courses)
  },[])
 const handleCourses = async()=>{
  try{
const res =await api.get('/auth/courses',{withCredentials:true}
)
setCourses(res?.data?.courses)

  console.log(res)

  }catch(err){
console.log(err)
  }
 }
  const { openCourseCategories, showSort, openSubCategories,  toggle, toggleSubCategories ,filter,} = toggleStore()

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
      <div className='md:p-6 p-3  flex justify-center gap-2 md:gap-4 items-center shadow-xs font-body'>
        <button onClick={()=>toggle("filter")} className='hidden md:block text-base h-12 px-3 font-normal text-gray-700  capitalize border  cursor-pointer rounded-lg  hover:bg-gray-100'>
          filter
        </button>
        <button  onClick={()=>toggle("filter")} className='md:hidden text-lg h-12 px-4 font-normal text-gray-700  capitalize border  cursor-pointer rounded-lg  hover:bg-gray-100'>
          <IoFilterSharp/>
        </button>
        <div className='relative'>
          <button onClick={() => toggle("showSort")} className=' hidden md:block text-base h-12 px-8 text-gray-700 font-normal capitalize border cursor-pointer rounded-lg  hover:bg-gray-100 '>
            sort
          </button>
          <button onClick={() => toggle("showSort")} className='md:hidden text-lg h-12 px-3 text-gray-700 font-normal capitalize border cursor-pointer rounded-lg  hover:bg-gray-100' >
          <FaSortAlphaDownAlt/>
          </button>
          <ul className={`absolute flex flex-col bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] shadow-2xl mt-2 capitalize font-semibold text-white rounded-lg z-[10000]   cursor-pointer transition-all ease-out duration-300 w-34  ${showSort ? 'visible translate-y-0' : 'invisible -translate-y-6'}`}>
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
          <input value={search} onChange={(e) => setFilter("search", e.target.value)} type="text" className=' flex-1 h-full text-base  border-none outline-none placeholder:capitalize placeholder:font-[Roboto] placeholder:text-gray-900 placeholder:font-light px-2 md:px-4 ' placeholder='search desired courses' />
          <span className='h-11 text-white
bg-gradient-to-tr from-[#95b1ee] to-[#728ccd]
transition-all duration-300 px-3  md:px-4  flex items-center rounded-lg'><FaSearch className='text-xl scale-100 hover:scale-125 cursor-pointer text-white' /></span>
        </div>
      </div>

      {/* filter */}
      <div className={`flex relative items-start transition-all duration-300 ease-out ${filter?'gap-8':'gap-0'}`}>

        <aside   className={`transition-all absolute top-2 bg-white z-[99] h-full md:sticky md:top-24 duration-300 overflow-hidden shrink-0
  ${filter ? 'w-[300px] p-6 border rounded-2xl' : 'w-0 p-0 border-0'}
  `}
>
          <div className=' font-[Outfit] w-full '> <h2 onClick={() => toggle("openCourseCategories")} className='text-lg font-semibold mb-3 flex justify-between items-center '>Categories <span><MdOutlineKeyboardArrowDown className={`text-2xl text-gray-600 rotate-0 transition-all cursor-pointer ease-out ${openCourseCategories ? 'rotate-180' : 'rotate-0'}`} /></span></h2> {openCourseCategories && courseCategories.map((course, index) => { return (<div key={index}> <div onClick={() => toggleSubCategories(course.category)} className='flex items-center pt-2 hide '> <label> <span className='flex justify-center items-center'> <input type="checkbox" className='w-3 cursor-pointer border-none h-3 accent-pink-400' name={course.category} checked={selectCourse === course.category} onChange={() => setFilter("selectCourse", course.category)} value={course.category} id="" /> <span className='text-base text-gray-700 px-3 text-wrap capitalize '>{course.category}</span> </span> </label> <span ><MdOutlineKeyboardArrowDown className='text-xl cursor-pointer text-gray-700 ' /></span> </div> {openSubCategories[course.category] && course.subcategories && (<div className='pl-4'> {course.subcategories.map((subc, index) => { return (<div key={index} className='flex items-center py-2 '> <label className='flex justify-start items-center hover:bg-gray-50 cursor-pointer w-full' >  <input type="checkbox" onChange={() => setFilter("selectSubCategories", subc)} checked={selectSubCategories === subc} value={subc} className=' border-none accent-pink-400' name="web development" id="" /> <span className='text-base font-normal text-gray-700 px-3 capitalize'>{subc}</span>  </label> </div>) })} </div>)} </div>) })} </div>
          {/* Rating */}
          <div className='font-[Outfit] w-full'>
             <h2 className='text-lg font-medium mb-3 flex justify-between items-center capitalize '>rating<span><MdOutlineKeyboardArrowDown className='text-2xl font-black' /></span></h2> 
             <div> 
              <div> {star.map((star, index) => { return (<div className='flex items-center  ' key={index}>
                 <label className='flex gap-3 py-2 rounded-lg transition hover:bg-gray-50 cursor-pointer w-full justify-start items-center' > <input type="radio" className=' border-none accent-pink-400' onChange={(e) => setFilter("rating", Number(e.target.value))} checked={Number(rating) === star} value={star} name={star} id="" /> <span className='text-base text-gray-700 font-medium capitalize'>{star} & above</span> </label> </div>) })} </div> </div> </div>
          {/* price */}
          <div className='font-[Outfit]  w-full'>
            <h2 className='text-lg font-semibold mb-3 flex justify-between items-center  capitalize '>price<span><MdOutlineKeyboardArrowDown className='text-2xl text-gray-600' /></span></h2>
            <div className='space-y-1'>
              {PriceArr.map((arr, index) => {
                return (
                  <div key={index} >
                    <div className='flex items-center   '>
                      <label className='flex gap-3 py-2 rounded-lg transition hover:bg-gray-50 cursor-pointer w-full  justify-start items-center'>

                        <input type="radio" onChange={(e) => setFilter("price", e.target.value)} checked={price === arr.rate} value={arr.rate} className=' border-none accent-pink-400' id="" />
                        <span className='text-base font-medium text-gray-700 capitalize'>{arr.rate}</span>

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
            <div className={`grid  gap-4 px-5 py-4 md:py-10 grid-cols-1 ${filter?'md:grid-cols-3 ':'md:grid-cols-4'}`}>
              {courses?.map((course, index) => {
                return (
               
                 <ProjectCard img={course.thumbnail} price={course.price} key={index} category={course.category} course_desc={course.desc} course_name={course.title} chapters={12} duration={course.duration} level={course.difficulty} rating={5} instructor_img={course.thumbnail} instructor_name={course.instructor.firstName} />
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