import { popularCourses } from '@/Courses/popularCourse'
import { toggleStore } from '@/Store/toggleStore'
import React from 'react'
import { CiClock1 } from 'react-icons/ci'
import { FaHeart, FaCartArrowDown, FaStar } from 'react-icons/fa'
import { FiTrendingUp } from 'react-icons/fi'
import { PiBookDuotone } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { formatTime } from './formatDuration'

const ProjectCard = ({ img, category, enrollmentId, course_id, course_name, course_desc, chapters, duration, level, rating, instructor_img, instructor_name, price, id, className = '', onBuy, status,handleCart }) => {
  const { Liked, toggleLike } = toggleStore()
  const stopNavigation = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  return (
    <div key={id} className={`cards rounded-lg md:rounded-4xl p-2 md:p-5 ${className}`}>
      <Link to={`/courses/${course_name}/${course_id}`}>
        <div className="relative group cursor-pointer">
          <img src={img} className="aspect-square object-cover rounded-2xl shadow group-hover:brightness-50 transition-all ease-in duration-200" alt="" />
          <span className="py-2 px-4 text-sm shadow-lg bg-primary/80 backdrop-blur rounded-full absolute top-3 left-3 text-white font-body">
            {category}
          </span>
          <div className="gap-5 items-center justify-start absolute bottom-1 right-0 z-40 text-xl text-text p-5 hidden group-hover:flex">
            <span className="bg-card p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all">
              <FaHeart onClick={(e) => { toggleLike(id); stopNavigation(e) }} className={`${Liked.includes(id) ? 'text-success' : 'text-text'}`} />
            </span>
            <span onClick={(e) => {stopNavigation(e),handleCart()}} className="bg-card p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all">
              <FaCartArrowDown  />
            </span>
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-2 md:gap-4 py-4">
        <div className="flex flex-col text-left flex-wrap">
          <h2 className="text-sm md:text-base font-semibold leading-snug font-heading text-text">{course_name}</h2>
          <p className="text-xs/4 md:text-xs mt-1 text-wrap font-body text-text-light line-clamp-1">{course_desc}</p>
        </div>
        <div className="flex items-center justify-start flex-wrap gap-2">
          <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm font-body rounded-sm md:rounded-full capitalize bg-page text-text-light flex flex-row gap-1 md:gap-2 items-center">
            <span><PiBookDuotone className="text-sm" /></span>{chapters}
          </span>
          <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm font-body rounded-sm md:rounded-full bg-page text-text-light flex flex-row gap-1 items-center">
            <span><CiClock1 className="text-sm" /></span>{formatTime(duration)}
          </span>
          <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm rounded-sm md:rounded-full bg-accent text-white flex gap-1 md:gap-2 items-center">
            <FiTrendingUp className="text-sm" />{level}
          </span>
          <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm rounded-sm md:rounded-full flex gap-1 md:gap-2 items-center text-yellow-500 bg-yellow-100">
            <FaStar className="text-sm" />{rating}
          </span>
        </div>
        <div className="hidden md:flex justify-start items-center gap-3">
          <div><img src={instructor_img} className="object-cover w-8 md:w-12 rounded-full aspect-[1]" alt="" /></div>
          <div className="flex flex-col justify-start items-start capitalize font-[outfit]">
            <span className="text-sm md:text-lg font-semibold md:font-medium text-text">{instructor_name}</span>
            <span className="font-medium text-xs md:text-sm text-text-light">instructor</span>
          </div>
        </div>
        <div className="flex flex-col mt-2 md:flex-row md:items-center gap-2 items-start justify-between">
          {(price === 0 && status === null) && (
            <>
              <div className="flex items-center gap-3">
                {price === 0 ? (
                  <span className="text-xl font-semibold text-success">Free</span>
                ) : (
                  <span className="text-2xl font-semibold text-primary">₹{price}</span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <button onClick={(e) => { stopNavigation(e); onBuy(course_id) }} className="transition-all bg-accent font-heading cursor-pointer text-white rounded-full md:py-1.5 py-1 px-5 w-full text-lg box capitalize font-medium hover:bg-primary-light hover:scale-95">Enroll now</button>
              </div>
            </>
          )}
          {(status === null && price !== 0) && (
            <>
              <div className="flex items-center gap-3">
                <span className="text-lg md:text-2xl font-semibold text-primary">₹{price}</span>
              </div>
              <div className="w-full md:w-1/2">
                <button onClick={(e) => { stopNavigation(e); onBuy() }} className="transition-all bg-accent font-heading cursor-pointer text-white rounded-full md:py-1.5 py-1 px-5 w-full text-lg box capitalize font-medium hover:bg-primary-light hover:scale-95">Buy now</button>
              </div>
            </>
          )}
          <>
            {status === "not-started" && (
              <Link to={`/courses/${course_name}/${enrollmentId}/learn`} className="transition-all bg-accent font-heading cursor-pointer text-white rounded-full md:py-1.5 py-1 px-5 w-full text-lg box capitalize font-medium hover:bg-primary-light hover:scale-95 text-center">
                Start Learning
              </Link>
            )}
            {status === "in-progress" && (
              <Link to={`/courses/${course_name}/${enrollmentId}/learn`} className="transition-all bg-accent font-heading cursor-pointer text-white rounded-full md:py-1.5 py-1 px-5 w-full text-lg box capitalize font-medium hover:bg-primary-light hover:scale-95 text-center">
                Continue Learning
              </Link>
            )}
            {status === "completed" && (
              <Link to={`/courses/${course_name}/${enrollmentId}/learn`} className="transition-all bg-accent font-heading cursor-pointer text-white rounded-full md:py-1.5 py-1 px-5 w-full text-lg box capitalize font-medium hover:bg-primary-light hover:scale-95 text-center">
                Review Course
              </Link>
            )}
          </>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
