import { CircularProgress } from '@mui/material'
import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import CircularWithValueLabel from './CircularProgressWithLabel'

const EnrolledCourseCard = ({className,LessonsLeft,img,course_name,instructor_name,progressPercent}) => {
  return (
    <div className={`cards rounded-lg flex group hover:shadow-xl   flex-col gap-4 md:rounded-xl p-2  md:p-3 ${className}`}   style={{ outline: "2px solid red" }}
>
        <div className='relative  cursor-pointer '>
                        <img src={img} className='aspect-[16/10] object-top object-cover rounded-2xl shadow group-hover:brightness-50 transition-all ease-in duration-200' alt="" />
                        <span className="py-1 px-3 text-sm shadow-lg bg-black/70 backdrop-blur rounded-full absolute top-3 left-3 text-white font-body">
                          {LessonsLeft} Left
                        </span>
                        <FaPlayCircle className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black rounded-full border-0 text-5xl text-white/90'/>
                      </div>
                      <div className='flex flex-col gap-2 '>
                          <div className='flex flex-col text-left flex-wrap '>
                          <h2 className='text-sm md:text-lg font-medium leading-snug font-heading text-gray-950'>{course_name}</h2>
                          <p className='text-xs/4 md:text-sm mt-1 text-wrap font-body text-gray-700 line-clamp-1 capitalize '>By {instructor_name}
                          </p>
                        </div>
<div className='w-full flex   items-center justify-between'>
<div className='items-center flex gap-2 justify-center '>
 <span className='flex text-base justify-between text-black/80 capitalize mb-1'>progress </span> <CircularWithValueLabel  progress={progressPercent}/> 

</div>
<button className='text-white  cursor-pointer text-center rounded-full text-base font-medium hover:bg-[#0A1931]/80 duration-300 ease-in bg-[#0A1931] px-4 py-1.5'>
    Continue 
</button>
</div></div>
    </div>
  )
}

export default EnrolledCourseCard