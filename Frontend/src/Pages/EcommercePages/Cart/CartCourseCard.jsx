import { formatTime } from '@/utils/formatDuration'
import React from 'react'
import { CiClock1 } from 'react-icons/ci'
import { FaStar, FaRegBookmark } from 'react-icons/fa'
import { FiTrendingUp } from 'react-icons/fi'
import { PiBookDuotone } from 'react-icons/pi'
import { RiDeleteBinLine } from 'react-icons/ri'


const CartCourseCard = ({course}) => {
  return (
 <div  key={course._id} className="cards rounded-lg md:rounded-4xl md:grid grid-cols-3 gap-5 p-3 md:p-5 relative overflow-hidden">
  <div className="relative group cursor-pointer">
    <img src={course.thumbnail} className="aspect-square object-cover h-[200px] w-full rounded-2xl shadow-sm group-hover:brightness-75 transition-all duration-300" alt={course.course_name} />
    <span className="py-1.5 px-3 text-xs md:text-sm shadow-lg bg-primary/80 backdrop-blur rounded-full absolute top-3 left-3 text-white font-body">
      {course.category}
    </span>
  </div>

  <div className="flex flex-col gap-3 md:gap-4 col-span-2 pt-3 md:pr-10">
    <div className="flex flex-col text-left">
      <h2 className="text-base md:text-lg font-semibold leading-snug font-heading text-text">
        {course.title}
      </h2>
      <p className="text-xs md:text-sm mt-1 text-text-light line-clamp-2 font-body">
        {course.desc}
      </p>
    </div>

    <div className="flex items-center flex-wrap gap-2">
      <span className="py-1 px-2.5 text-xs font-medium rounded-full bg-page text-text-light flex items-center gap-1.5">
        <PiBookDuotone />{course.lessonCount}
      </span>
      <span className="py-1 px-2.5 text-xs font-medium rounded-full bg-page text-text-light flex items-center gap-1.5">
        <CiClock1 />{formatTime(course.duration)}
      </span>
      <span className="py-1 px-2.5 text-xs font-medium rounded-full bg-accent text-white flex items-center gap-1.5 capitalize">
        <FiTrendingUp />{course.difficulty}
      </span>
      <span className="py-1 px-2.5 text-xs font-medium rounded-full text-yellow-500 bg-yellow-100 flex items-center gap-1.5">
        <FaStar />{course.rating}
      </span>
    </div>

    <div className="hidden md:flex items-center gap-3">
      <img src={course.instructor.avatar} className="object-cover w-9 h-9 rounded-full" alt={course.instructor.name} />
      <div className="flex flex-col capitalize">
        <span className="text-sm font-semibold text-text">{course.instructor.name}</span>
        <span className="text-xs text-text-light">Instructor</span>
      </div>
    </div>

    <div className="mt-auto flex flex-row md:items-center gap-3 justify-between">
      <div>
        {course.price === 0 ? (
          <span className="text-xl font-semibold text-success">Free</span>
        ) : (
          <span className="text-xl md:text-2xl font-semibold text-primary">₹{course.price}</span>
        )}
      </div>

      <div className="flex gap-3 justify-end">
       
        <button className="transition-all bg-accent font-heading cursor-pointer text-white rounded-full py-1.5 px-5 w-full text-sm md:text-base font-medium hover:bg-primary-light hover:scale-[0.98] ">
          Buy Now
        </button>
         <div className="flex gap-2 md:absolute top-3 right-3 z-10">
      <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-text-light p-2 text-lg rounded-full cursor-pointer shadow-sm transition-all duration-200 hover:scale-110">
        <RiDeleteBinLine />
      </button>
      <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-text-light p-2 text-lg rounded-full cursor-pointer shadow-sm transition-all duration-200 hover:scale-110">
        <FaRegBookmark />
      </button>
    </div>
      </div>
    </div>

    <div className="md:flex gap-2 hidden absolute top-3 right-3 z-10">
      <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-text-light p-2 text-lg rounded-full cursor-pointer shadow-sm transition-all duration-200 hover:scale-110">
        <RiDeleteBinLine />
      </button>
      <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-text-light p-2 text-lg rounded-full cursor-pointer shadow-sm transition-all duration-200 hover:scale-110">
        <FaRegBookmark />
      </button>
    </div>
  </div>
</div>  )
}

export default CartCourseCard