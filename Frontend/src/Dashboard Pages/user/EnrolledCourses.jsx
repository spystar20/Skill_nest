import { useAuth } from '@/context/AuthContext'
import { useFetchStore } from '@/Store/FetchStore'
import api from '@/utils/axios'
import EnrolledCourseCard from '@/utils/EnrolledCourseCard'
import EnrollFilterPill from '@/utils/EnrollFilterPill'
import ProjectCard from '@/utils/ProjectCard'
import React, { useEffect, useState } from 'react'
import { FaAngleDoubleLeft, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const EnrolledCourses = () => {
  const {user}=useAuth
const {fetchEnrolledCourses,enrolledCourses}=useFetchStore() 

  const startedCourse = enrolledCourses?.filter(course=>course.completedLessons.length>0)
   useEffect(()=>{
fetchEnrolledCourses()
  },[])
  return (
    <div className='w-full bg-neutral-100 min-h-screen overflow-x-hidden px-2 md:px-8 py-3 flex flex-col gap-6 '>
   <div className='flex justify-between items-center'> 
    <h2 className='text-3xl font-bold font-heading'>Learning</h2>
    <Link to='/'>
    <span className='cursor-pointer flex gap-2 items-center hover:scale-105 duration-300 transition-all ease-in'>
      <FaAngleDoubleLeft />Back to Home</span>
      </Link>
      </div>
{/* continue course */}
     <div className="w-full">
  <h4 className="text-gray-600 text-lg mb-3">
    Continue where you left off and track your progress.
  </h4>

  <div className="overflow-x-auto no-scrollbar w-full">
    {startedCourse.length === 0 ? (
      <div className="w-full min-h-[220px] rounded-3xl border border-dashed border-gray-300 bg-white flex flex-col items-center justify-center text-center px-6 py-10 shadow-sm">
    {/* Icon */}
    <div className="w-[280px] object-cover h-34 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
      <img  src="https://i.pinimg.com/1200x/03/86/d3/0386d374c8c476a62e36108781bee89e.jpg" alt="" />
    </div>

    {/* Heading */}
    <h3 className="text-xl font-semibold text-gray-900 font-heading">
      Ready to start learning?
    </h3>

    {/* Description */}
    <p className="text-sm md:text-base text-gray-500 max-w-md mt-2 leading-relaxed">
      You haven't started any of your enrolled courses yet.
      Pick a course below and begin your learning journey.
    </p>

    {/* CTA */}
    <button
      className="mt-5 px-6 py-2.5 rounded-full bg-[#0A1931] text-white text-sm font-medium
      hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
    >
      Start Learning
    </button>

  </div>
) : (
  <div className="rounded-2xl flex gap-6 box-border">
    {startedCourse.map((course) => (
      <EnrolledCourseCard
      status={course.status}
        key={course._id}
        progressPercent={100}
        className="max-w-[300px] shrink-0"
        img={course.courseId.thumbnail}
        instructor_name="khushi"
        course_name={course.courseId.title}
      />
    ))}
  </div>
)}

  </div>
</div>

      <div className='flex flex-col gap-4 py-6'>
        <h3 className='text-xl font-semibold capitalize font-heading' >Enrolled Courses (5)</h3>
        {/* search and filter */}
        <div className='flex justify-between'>
        <div className='flex flex-wrap items-center justify-start gap-4'>

          <EnrollFilterPill filter='all status'/>
                    <EnrollFilterPill filter='Not Started'/>
          <EnrollFilterPill filter='In progress'/>
          <EnrollFilterPill filter='Completed'/>

        </div>
 <div className='overflow-hidden rounded-full border-2 flex justify-between items-center'>
          <input  type="text" className='w-[120px] md:w-full h-full text-base  border-none outline-none placeholder:capitalize placeholder:font-[Roboto] placeholder:text-gray-900 placeholder:font-light px-1 md:px-4 ' placeholder='search desired courses' />
          <span className='h-9 text-white 
bg-[#0A1931]
transition-all duration-300 px-1  md:px-2  flex items-center justify-center rounded-full flex-1'><FaSearch className=' md:text-xl self-center scale-100 hover:scale-105 cursor-pointer text-white' /></span>
        </div>
        </div>
       {/* enrolled courses */}
       <div className=' grid gap-5 grid-cols-4  py-4'>
   {enrolledCourses?.map((course,index)=>(
<EnrolledCourseCard key={index}  status={course.status}
  className="shrink-0 max-w-[300px]" img={course.courseId.thumbnail} progressPercent={90} instructor_name='khushi' course_name={course.courseId.title}/>
))}
       </div>
      </div>
    </div>
  )
}

export default EnrolledCourses