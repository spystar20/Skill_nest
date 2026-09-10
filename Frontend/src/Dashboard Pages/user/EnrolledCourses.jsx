
import { useAuth } from '@/context/AuthContext'
import { useEnrolledCourses, useFilteredEnrolledCourses } from '@/hooks/EnrollmentHooks/useEnrolledCourses'
import Dataset from '@/utils/Dataset'
import EnrolledCourseCard from '@/Dashboard Pages/user/Enrollment/EnrolledCourseCard'
import EnrollFilterPill from '@/Dashboard Pages/user/Enrollment/EnrollFilterPill'
import {  FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DashboardPageHeader from '../DashboardComponents/DashboardPageHeader'
import React, { useState } from 'react'
import { LuBook } from 'react-icons/lu'

const EnrolledCourses = () => {
  const { user } = useAuth()
  const { isLoading, isError, data } = useEnrolledCourses()
  const enrolledCoursesProgress = data?.enrolledCoursesProgress || []
  const params = {}
 
  const [status,setStatus]=useState("")
if(status){
  params.status = status
}
 const {data:filteredCourse}=useFilteredEnrolledCourses(params)
 console.log(filteredCourse?.enrolledCourses)
 const courses = filteredCourse?.enrolledCourses
  const startedCourse = enrolledCoursesProgress.filter(
    course => course.completedLessons.length > 0
  )
const filter = [
  'all-status','in-progress','completed','not-started'
]

  return (
    <Dataset loading={isLoading} error={isError}>
      <div className='w-full min-h-screen bg-page px-2 py-6 md:px-8 md:py-8 flex flex-col gap-5'>

        <DashboardPageHeader
          title='My Courses'
          description='Continue learning from where you left off'
        />

        {/* Continue Course */}
        <div className='w-full'>
          <div className='overflow-x-auto no-scrollbar w-full'>
            {startedCourse.length === 0 ? (
              <div className='w-full min-h-[220px] rounded-3xl border border-dashed border-gray-300 bg-white flex flex-col items-center justify-center text-center px-6 py-10 shadow-sm'>

                <div className='w-[280px] max-w-full h-34 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5 overflow-hidden'>
                  <img
                    src='https://i.pinimg.com/1200x/03/86/d3/0386d374c8c476a62e36108781bee89e.jpg'
                    alt=''
                    className='w-full h-full object-cover'
                  />
                </div>

                <h3 className='text-xl font-semibold text-gray-900 font-heading'>
                  Ready to start learning?
                </h3>

                <p className='text-sm md:text-base text-gray-500 max-w-md mt-2 leading-relaxed'>
                  You haven't started any of your enrolled courses yet.
                  Pick a course below and begin your learning journey.
                </p>

                <button
                  type='button'
                  className='mt-5 px-6 py-2.5 rounded-full bg-[#0A1931] text-white text-sm font-medium hover:scale-105 transition-all duration-300 shadow-md cursor-pointer'
                >
                  Start Learning
                </button>
              </div>
            ) : (
              <div className='rounded-2xl flex gap-4 md:gap-6 box-border'>
                {startedCourse.map(course => (
                  <EnrolledCourseCard
                    showReviewUi={true}
                    key={course._id}
                    course_id={course.courseId._id}
                    enrollmentId={course._id}
                    status={course.status}
                    className='shrink-0 max-w-[300px]'
                    img={course.courseId.thumbnail}
                    progressPercent={course.progress}
                    instructor_name='khushi'
                    course={course}
                    course_name={course.courseId.title}
                    reviewData={course.review}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-4 py-6'>

          <h3 className='text-xl font-semibold capitalize font-heading'>
            Enrolled Courses ({enrolledCoursesProgress?.length})
          </h3>

          {/* Search and Filter */}
          <div className='flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center'>

            <div className='flex flex-wrap items-center gap-2 sm:gap-4'>
              {filter.map((filter,index)=>(
              <EnrollFilterPill filter={filter} key={index} setStatus={setStatus} />
              ))}
       
            </div>

            <div className='w-full lg:w-auto overflow-hidden rounded-full border-2 flex justify-between items-center'>
              <input
                type='text'
                className='w-full lg:w-[280px] h-9 border-none outline-none placeholder:capitalize placeholder:font-[Roboto] placeholder:text-gray-900 placeholder:font-light px-3 md:px-4'
                placeholder='search desired courses'
              />

              <span className='h-9 text-white bg-[#0A1931] transition-all duration-300 px-2 flex items-center justify-center rounded-full'>
                <FaSearch className='md:text-xl scale-100 hover:scale-105 cursor-pointer text-white' />
              </span>
            </div>

          </div>

          {/* Enrolled Courses */}
          <div className='grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-5 py-4'>
            {courses?.length ===0 ?(  <div className='col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center shadow-sm'>
    <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-2xl text-primary'>
      <LuBook/>
    </div>

    <h3 className='font-heading text-lg font-semibold text-text'>
      No courses found for this status
    </h3>

    <p className='mt-2 max-w-md font-body text-sm text-text-light'>
      You don't have any courses in this category yet. Explore your enrolled
      courses or start learning something new.
    </p>
  </div>):(
  <>
            {courses?.map(course => (
              <EnrolledCourseCard
                showReviewUi={true}
                key={course._id}
                course_id={course.courseId._id}
                enrollmentId={course._id}
                status={course.status}
                className='shrink-0 max-w-[300px]'
                img={course.courseId.thumbnail}
                progressPercent={course.progress}
                instructor_name='khushi'
                course={course}
                course_name={course.courseId.title}
                reviewData={course.review}
              />
            ))}
            </>
)}
          </div>

        </div>
      </div>
    </Dataset>
  )
}

export default EnrolledCourses

