import React, { useState } from 'react'
import { FaSearch, FaStar } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Course from '../data/course'
import courseCategories from '../data/CourseCategories';
import { IoTime } from "react-icons/io5";
import { SiBookstack } from "react-icons/si";
import { FaEye } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from 'react-icons/ci';
import { toggleStore } from '../Store/toggleStore';
import { useCourseStore } from '../Store/CourseFunc';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
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
    <div className=' bg-white w-full h-[100vh] font-[Roboto]'>
      <div className='w-full h-[30%] flex flex-col gap-3 justify-center items-center text-white  home-bg'>
        <h2 className='text-5xl font-semibold font-[Outfit]  capitalize '>courses</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, labore.</p>
      </div>
      {/* search and sort */}
      <div className='px-4 py-8 pr-16 flex justify-center gap-4 items-center shadow-xs'>
        <button className='text-xl font-normal capitalize border px-10 cursor-pointer rounded-xl py-2  hover:bg-gray-100'>
          filter
        </button>
        <div>
          <button onClick={() => toggle("showSort")} className='text-xl font-normal capitalize border px-10 cursor-pointer rounded-xl py-2  hover:bg-gray-100'>
            sort
          </button>
          <ul className={`absolute flex flex-col bg-pink-400 shadow-2xl mt-2 capitalize font-semibold text-white rounded-lg   cursor-pointer transition-all ease-out duration-300 w-[9.4vw] z-50 ${showSort ? 'visible translate-y-0' : 'invisible -translate-y-6'}`}>
            <li className=' hover:bg-white hover:text-pink-400  text-white p-3 rounded-t-lg  '>
              popular
            </li>
            <li onClick={() => handleSort("price")} className=' hover:bg-white hover:text-pink-400  text-white p-3 '>
              Price
            </li>
            <li onClick={() => handleSort("rating")} className='hover:bg-white hover:text-pink-400 text-white p-3 '>
              rating
            </li>
            <li onClick={() => handleSort("views")} className=' hover:bg-white hover:text-pink-400  text-white p-3 rounded-b-lg '>
              views
            </li>
          </ul>
        </div>
        <div className='w-[85%] border rounded-2xl border-black flex justify-between items-center'>
          <input value={search} onChange={(e) => setFilter("search", e.target.value)} type="text" className='text-xl border-none outline-none placeholder:capitalize placeholder:font-[Roboto] placeholder:text-gray-900 placeholder:font-light px-4 py-2' placeholder='search desired courses' />
          <span className='h-11 bg-pink-400 px-4  flex items-center rounded-2xl'><FaSearch className='text-xl scale-100 hover:scale-125 cursor-pointer text-white' /></span>
        </div>
      </div>
      {/* filter */}
      <div className='flex items-start justify-between '>
        <div className='flex flex-col justify-start items-start border-r px-5 mt-1 w-[23%] '>
          <div className=' font-[Outfit] w-full  '>
            <h2 onClick={() => toggle("openCourseCategories")} className='text-2xl font-medium py-4 pb-5 flex justify-between items-center   '>Categories <span><MdOutlineKeyboardArrowDown className={`text-4xl font-black rotate-0  transition-all cursor-pointer ease-out ${openCourseCategories ? 'rotate-180' : 'rotate-0'}`} /></span></h2>
            {openCourseCategories &&
              courseCategories.map((course, index) => {
                return (

                  <div key={index}>
                    <div onClick={() => toggleSubCategories(course.category)} className='flex items-center pt-2 hide '>
                      <label>
                        <span className='flex justify-center items-center'>
                          <input type="checkbox" className='w-3 cursor-pointer border-none h-3 accent-pink-400' name={course.category} checked={selectCourse === course.category} onChange={() => setFilter("selectCourse", course.category)} value={course.category} id="" />
                          <span className='text-xl px-3 text-wrap capitalize '>{course.category}</span>
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
                                  <span className='text-lg font-normal px-3 capitalize'>{subc}</span>
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
            <h2 className='text-2xl font-medium py-4 pb-5 flex justify-between items-center  capitalize '>rating<span><MdOutlineKeyboardArrowDown className='text-4xl font-black' /></span></h2>
            <div>

              <div className='pl-4'>
                {star.map((star, index) => {
                  return (
                    <div className='flex items-center  py-3 ' key={index}>
                      <label >
                        <span className='flex justify-center items-center'>
                          <input type="radio" className=' border-none  accent-pink-400' onChange={(e) => setFilter("rating", Number(e.target.value))} checked={Number(rating) === star} value={star} name={star} id="" />
                          <span className='text-lg font-normal px-3 capitalize'>{star} & above</span>
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
            <h2 className='text-2xl font-medium py-4 pb-5 flex justify-between items-center  capitalize '>price<span><MdOutlineKeyboardArrowDown className='text-4xl font-black' /></span></h2>
            <div>
              {PriceArr.map((arr, index) => {
                return (
                  <div className='pl-4' key={index} >
                    <div className='flex items-center  py-1 '>
                      <label>
                        <span className='flex justify-center items-center'>
                          <input type="checkbox" onChange={(e) => setFilter("price", e.target.value)} checked={price === arr.rate} value={arr.rate} className=' border-none  accent-pink-400' id="" />
                          <span className='text-lg font-normal px-3 capitalize'>{arr.rate}</span>
                        </span>
                      </label>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>

        </div>
        {/* courses */}
        {comingSoon ? (
          <div className="text-center flex justify-center items-center h-[20vh] w-full text-xl font-[Merienda] font-semibold text-gray-500 py-4">
            🚀 Courses will be available soon
          </div>
        ) : (
          <div className='w-[80%]'>
            <div className='grid grid-cols-3  gap-4 px-5 py-10'>
              {CurrentCourse.map((course) => {
                return (
                  <Link key={course.id} to={`/courses/${course.course_name}`}>
                  <div className='flex flex-col cursor-pointer shadow-2xl bg-white  w-full gap-3 rounded-2xl   h-full px-6 py-6'>
                    <div className='grid group '>
                      <div className='col-start-1 row-start-1 z-0'><img src={course.img} className='drop-shadow-xs col-span-1 rounded-2xl' alt="" /></div>
                      <div className='col-start-1 relative invisible group-hover:visible  px-3 py-3 flex  justify-between items-end row-start-1 z-10 bg-black  opacity-65  rounded-2xl'>
                        <div key={course.id} onClick={() => toggleLike(course.id)} className='absolute z-10 top-0 right-0  m-1 transition-all ease-out '>{Liked.includes(course.id) ? <FaHeart className='text-[1.8rem] text-pink-400' /> : <CiHeart className='text-4xl text-pink-400' />}</div>
                        <div >
                          <button className='flex justify-center items-center  transition-all hover:scale-95 scale-100 group    font-[Comic_Relief]  cursor-pointer bg-pink-400 text-white rounded-lg py-1 px-2 gap-1 text-lg  capitalize font-medium'><span><FaShoppingCart /></span> <span>add to cart</span></button></div>
                        <div>
                          <button className='flex justify-center items-center  transition-all hover:scale-95 scale-100 group    font-[Comic_Relief]  cursor-pointer bg-pink-400 text-white rounded-lg py-1 px-2 gap-1 text-lg  capitalize font-medium'>{course.price}</button></div>
                      </div>
                    </div>
                    <div className='flex justify-start items-center gap-3'>
                      <div><img src={course.instructor_img} className='w-16 rounded-full ' alt={course.instructor_img} /></div>
                      <div className='flex flex-col justify-start items-start capitalize font-[outfit]'>
                        <span className='text-lg font-medium'>{course.instructor_name}</span>
                        <span className='font-medium text-sm '>instructor</span>
                      </div>
                    </div>

                    <div className='flex flex-col text-left  flex-wrap'>
                      <h2 className='text-xl font-semibold'>{course.course_name} </h2>
                      <p className='text-lg text-wrap line-clamp-2'> {course.course_desc}</p>
                    </div>

                    <div className='flex  justify-between  items-center'>
                      <div className='flex border capitalize bg-black text-white text-sm font-medium  rounded-lg px-2 py-2 justify-start items-center gap-2'>
                        <span className='flex justify-center text-yellow-500'><FaStar /></span>
                        <h2 className=' font-medium'>{course.rating}</h2>
                      </div>
                      <div className='flex border capitalize bg-black text-white text-sm font-medium  rounded-lg px-2 py-2 justify-start items-center gap-3'>
                        <span><FaEye /></span><span>{course.view}</span>
                      </div>
                    </div>
                    <div className='flex justify-between items-center '><span className='flex items-center gap-2 text-lg capitalize '>< SiBookstack />{course.chapters} chapters</span><span className='flex items-center gap-2 text-lg capitalize '><IoTime />{course.duration}</span></div>
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