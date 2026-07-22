import { popularCourses } from '@/Courses/popularCourse'
import { toggleStore } from '@/Store/toggleStore'
import React from 'react'
import { CiClock1 } from 'react-icons/ci'
import { FaHeart, FaCartArrowDown ,FaStar} from 'react-icons/fa'
import { FiTrendingUp } from 'react-icons/fi'
import { PiBookDuotone } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { formatTime } from './formatDuration'
const ProjectCard = ({img,category,course_id,course_name,course_desc,chapters,duration,level,rating,instructor_img,instructor_name,price,id,className='',onBuy}) => {
    const {Liked,toggleLike} = toggleStore()
    const stopNavigation = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
  return (
       
           <div  className={`cards rounded-lg  md:rounded-4xl p-2  md:p-5 ${className}`}>
         <Link key={id} to={`/courses/${course_name}/${course_id}`}>

                      <div className='relative group cursor-pointer '>
                        <img src={img} className='aspect-square object-cover rounded-2xl shadow group-hover:brightness-50 transition-all ease-in duration-200' alt="" />
                        <span className="py-2 px-4 text-sm shadow-lg bg-black/70 backdrop-blur rounded-full absolute top-3 left-3 text-white font-body">
                          {category}
                        </span>

                        <div className=' gap-5 items-center justify-start absolute bottom-1 right-0 z-40 text-xl text-black p-5 hidden group-hover:flex '><span className=' bg-white p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all'>
                          <FaHeart   onClick={(e) => {toggleLike(id),stopNavigation(e)}}
 className={`${Liked.includes(id)?"text-pink-300":"text-black"}`} /></span><span className=' bg-white p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all'><FaCartArrowDown onClick={(e)=>{stopNavigation(e)}} /></span></div>
                      </div>
  
                      <div className=' flex flex-col gap-2 md:gap-4 py-4'>
                        <div className='flex flex-col text-left flex-wrap '>
                          <h2 className='text-sm md:text-base font-semibold leading-snug font-heading text-gray-950'>{course_name}</h2>
                          <p className='text-xs/4 md:text-xs mt-1 text-wrap font-body text-gray-700 line-clamp-1 '>{course_desc}
                          </p>
                        </div>

                        <div className='flex items-center justify-start flex-wrap gap-2 '>
                          <span className=' p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm  font-body  rounded-sm md:rounded-full capitalize   bg-slate-100 text-slate-700 flex flex-row gap-1 md:gap-2 items-center'><span><PiBookDuotone className='text-sm ' /></span>{chapters}</span>
                          <span className=' p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm font-body   rounded-sm md:rounded-full bg-slate-100 text-slate-700 flex flex-row gap-1  items-center '><span><CiClock1 className='text-sm ' /></span> {formatTime(duration) }</span>
                          <span className=" p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium  shadow-sm  rounded-sm md:rounded-full bg-indigo-300 text-white flex gap-1 md:gap-2 items-center">
                            <FiTrendingUp className="text-sm " />
                            {level}    </span>
                              <span className=" p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium  shadow-sm  rounded-sm md:rounded-full   flex gap-1 md:gap-2 items-center bg-yellow-100  text-yellow-700">
                            <FaStar className="text-sm bg-gradient-to-r" />
                            {rating}   </span>
                        </div>
                        <div className='hidden md:flex justify-start items-center gap-3'>
                          <div><img src={instructor_img} className='object-cover w-8 md:w-12 rounded-full aspect-[1]' alt="" /></div>
                          <div className=' flex flex-col justify-start items-start capitalize font-[outfit]'>
                            <span className=' text-sm md:text-lg font-semibold md:font-medium'>{instructor_name}</span>
                            <span className='font-medium text-xs  md:text-sm '>instructor</span>
                          </div>
                        </div>
                        <div className='flex flex-col mt-auto md:flex-row md:items-center gap-2 items-start  justify-between'>
                          <div className="flex  items-center gap-3">
                         
                            <span className=" text-lg md:text-2xl font-semibold text-indigo-900">₹{price}</span>
                          </div>
                          <div className='w-full md:w-1/2 '>
                            <button onClick={(e)=>{stopNavigation(e),onBuy(course_id)}} className=' transition-all bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] font-[Comic_Relief]  cursor-pointer text-white rounded-full md:py-1.5 py-1 px-5 w-full text-lg box capitalize font-medium hover:scale-95'>buy now</button>
                            </div>
                            </div>
                      </div>
                              </Link>
                                  </div>
    
  )
}

export default ProjectCard