import React, { useEffect, useState } from 'react'
import { FaSearch, FaSortAlphaDownAlt } from "react-icons/fa";
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
import FilterComponent from '@/utils/FilterComponent';
const Courses = () => {
  const [courses, setCourses] = useState(null)
  const [categories, setCategories] = useState([])
  const [openFilter,SetOpenFilter] = useState(false)
  const [ showSort,setShowSort] = useState(false)
  const [openCourseCategories,setOpenCourseCategories]=useState(false)
const  handleToggleFilter = ()=>{
  SetOpenFilter(!openFilter)
}
const handleSort = ()=>{
  setShowSort(!showSort)
}
const handleToggleCategories = ()=>{
  setOpenCourseCategories(!openCourseCategories)
}
  const [filter, setFilter] = useState({
    search: '', category: '', sort: '', priceType: '', minPrice: '', maxPrice: '', difficulty: ''
  })
  const params = {}
  if (filter.search) {
    params.search = filter.search
  }
  if (filter.category) {
    params.category = filter.category
  }
  if (filter.sort) {
    params.sort = filter.sort
  }
  if (filter.priceType) {
    params.priceType = filter.priceType
  }
  if (filter.minPrice) {
    params.minPrice = filter.minPrice
  }
  if (filter.maxPrice) {
    params.maxPrice = filter.maxPrice
  }
  if (filter.difficulty) {
    params.difficulty = filter.difficulty
  }
  useEffect(() => {
    handleCourses()
    fetchCategories()
    console.log(courses)
  }, [filter])
  const fetchCategories = async () => {
    try {
      const res = await api.get('/course/category')

      setCategories(res?.data?.category)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  const handleCourses = async () => {
    try {
      const res = await api.get('/course/', { params }, { withCredentials: true }
      )
      setCourses(res?.data?.courses)

      console.log(res)

    } catch (err) {
      console.log(err)
    }
  }

  // const star = [5, 4, 3, 2, 1]

  const comingSoon = courses?.length === 0;
  // const [page, setPage] = useState(1)
  // const itemsPerPage = 6

  // const startIndex = (page - 1) * itemsPerPage
  // const endIndex = startIndex + itemsPerPage
  // const CurrentCourse = FinalArr.slice(startIndex, endIndex)
  return (
    <div className='min-h-screen bg-white w-full font-[Roboto]'>
      <div className='w-full flex flex-col min-h-[320px] gap-3 pt-23 justify-center items-center text-white  home-bg'>
        <h2 className='text-5xl font-semibold font-[Outfit]  capitalize '>courses</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, labore.</p>
      </div>
      {/* search and sort */}
      <div className='md:p-6 p-3  flex justify-center gap-2 md:gap-4 items-center shadow-xs font-body'>
        <button onClick={handleToggleFilter} className='hidden md:block text-base h-12 px-3 font-normal text-gray-700  capitalize border  cursor-pointer rounded-lg  hover:bg-gray-100'>
          filter
        </button>
        <button onClick={handleToggleFilter} className='md:hidden text-lg h-12 px-4 font-normal text-gray-700  capitalize border  cursor-pointer rounded-lg  hover:bg-gray-100'>
          <IoFilterSharp />
        </button>
        <div className='relative'>
          <button onClick={handleSort} className=' hidden md:block text-base h-12 px-8 text-gray-700 font-normal capitalize border cursor-pointer rounded-lg  hover:bg-gray-100 '>
            sort
          </button>
          <button onClick={handleSort} className='md:hidden text-lg h-12 px-3 text-gray-700 font-normal capitalize border cursor-pointer rounded-lg  hover:bg-gray-100' >
            <FaSortAlphaDownAlt />
          </button>
          <select name="" id="">
            <option value=""></option>
          </select>
          <ul className={`absolute flex flex-col bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] shadow-2xl mt-2 capitalize font-semibold text-white rounded-lg z-[10000]   cursor-pointer transition-all ease-out duration-300 w-34  ${showSort ? 'visible translate-y-0' : 'invisible -translate-y-6'}`}>
            <li className=' hover:bg-black  hover:text-white  text-white p-3 rounded-t-lg  '>
              popular
            </li>
            <li className=' hover:bg-black  hover:text-white  text-white p-3 '>
              Price
            </li>
            <li className='hover:bg-black  hover:text-white text-white p-3 '>
              rating
            </li>
            <li className=' hover:bg-black  hover:text-white text-white p-3 rounded-b-lg '>
              views
            </li>
          </ul>
        </div>
        <div className='flex-1 overflow-hidden rounded-lg border flex justify-between items-center'>
          <input value={filter.search} onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))} type="text" className=' flex-1 h-full text-base  border-none outline-none placeholder:capitalize placeholder:font-[Roboto] placeholder:text-gray-900 placeholder:font-light px-2 md:px-4 ' placeholder='search desired courses' />
          <span className='h-11 text-white
bg-gradient-to-tr from-[#95b1ee] to-[#728ccd]
transition-all duration-300 px-3  md:px-4  flex items-center rounded-lg'><FaSearch className='text-xl scale-100 hover:scale-125 cursor-pointer text-white' /></span>
        </div>
      </div>

      {/* filter */}
      <div className={`flex relative items-start transition-all duration-300 ease-out ${openFilter ? 'gap-8' : 'gap-0'}`}>

        <aside className={`transition-all absolute top-2 bg-white z-[99] h-full md:sticky md:top-24 duration-300 overflow-hidden shrink-0
  ${openFilter ? 'w-[300px] p-6 border rounded-2xl' : 'w-0 p-0 border-0'}
  `}
        >
<div  className=' font-[Outfit] w-full '>
 <h2 onClick={handleToggleCategories} className='text-lg font-semibold mb-3 flex justify-between items-center '>Categories <span><MdOutlineKeyboardArrowDown className={`text-2xl text-gray-600 rotate-0 transition-all cursor-pointer ease-out ${openCourseCategories ? 'rotate-180' : 'rotate-0'}`} /></span></h2> 
 {
  openCourseCategories && categories?.map((category,index)=>(
    <React.Fragment key={index}>
    <div className='flex items-center pt-2 hide '>
     <label className='flex justify-center items-center gap-1'>
      <input type="checkbox"  value={category} onChange={(e)=>setFilter((prev)=>({...prev,category:e.target.value}))}  className='w-3 cursor-pointer border-none h-3 accent-black' name="" id="" />
      {category}
     </label>
    </div>
    </React.Fragment>
  ))
 }
</div>
        
        <FilterComponent title="category" setFilter={setFilter} filterKey={categories} optionArray={categories}/>
          {/* Rating */}
          {/* <div className='font-[Outfit] w-full'>
            <h2 className='text-lg font-medium mb-3 flex justify-between items-center capitalize '>rating<span><MdOutlineKeyboardArrowDown className='text-2xl font-black' /></span></h2>
            <div>
              <div> {star.map((star, index) => {
                return (<div className='flex items-center  ' key={index}>
                  <label className='flex gap-3 py-2 rounded-lg transition hover:bg-gray-50 cursor-pointer w-full justify-start items-center' > <input type="radio" className=' border-none accent-pink-400' onChange={(e) => setFilter("rating", Number(e.target.value))} checked={Number(rating) === star} value={star} name={star} id="" /> <span className='text-base text-gray-700 font-medium capitalize'>{star} & above</span> </label> </div>)
              })} </div> </div> </div> */}
          {/* price */}
          <div className='font-[Outfit]  w-full'>
            <h2 className='text-lg font-semibold mb-3 flex justify-between items-center  capitalize '>price<span><MdOutlineKeyboardArrowDown className='text-2xl text-gray-600' /></span></h2>
            <div className='space-y-1'>
        
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
            <div className={`grid  gap-4 px-5 py-4 md:py-10 grid-cols-1 ${filter ? 'md:grid-cols-3 ' : 'md:grid-cols-4'}`}>
              {courses?.map((course, index) => {
                return (

                  <ProjectCard img={course.thumbnail} course_id={course._id} price={course.price} key={index} category={course.category} course_desc={course.desc} course_name={course.title} chapters={12} duration={course.duration} level={course.difficulty} rating={5} instructor_img={course.thumbnail} instructor_name={course.instructor.firstName} />
                )
              })}

            </div>
            {/* <div className='flex justify-center py-6'>
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

            </div> */}
          </div>)}
      </div>
    </div>
  )
}

export default Courses