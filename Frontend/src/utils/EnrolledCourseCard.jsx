import React from 'react'

const EnrolledCourseCard = ({className,LessonsLeft,img,course_name,instructor_name}) => {
  return (
    <div className={`cards rounded-lg flex group hover:shadow-xl   flex-col gap-4 md:rounded-4xl p-2 w-[330px]  md:p-2 ${className}`}>
        <div className='relative  cursor-pointer '>
                        <img src={img} className='aspect-square  object-cover rounded-2xl shadow group-hover:brightness-50 transition-all ease-in duration-200' alt="" />
                        <span className="py-1 px-3 text-sm shadow-lg bg-black/70 backdrop-blur rounded-full absolute top-3 left-3 text-white font-body">
                          {LessonsLeft} Left
                        </span>
                      </div>
                      <div className='flex flex-col gap-2 py-4'>
                          <div className='flex flex-col text-left flex-wrap '>
                          <h2 className='text-sm md:text-lg font-medium leading-snug font-heading text-gray-950'>{course_name}</h2>
                          <p className='text-xs/4 md:text-sm mt-1 text-wrap font-body text-gray-700 line-clamp-1 capitalize '>By {instructor_name}
                          </p>
                        </div>
<div className='w-full flex flex-col gap-3'>
<div className='w-full'>
 <span className='flex text-sm text-black/80 capitalize'>progress:  <span className='font-medium ml-1'>80%</span> </span> 
 <div className='w-full h-2 bg-black/30 rounded-full'><div className='bg-[#0A1931] h-2 rounded-full w-1/2'></div>
 </div>
</div>
<button className='text-white cursor-pointer text-center rounded-sm text-base bg-[#0A1931] px-4 py-1.5'>
    Continue 
</button>
</div></div>
    </div>
  )
}

export default EnrolledCourseCard