import EnrolledCourseCard from '@/utils/EnrolledCourseCard'
import ProjectCard from '@/utils/ProjectCard'
import React from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const EnrolledCourses = () => {
  return (
    <div className='w-full bg-neutral-200 min-h-screen px-2 md:px-8 py-3 flex flex-col gap-6 '>
   <div className='flex justify-between items-center'> 
    <h2 className='text-3xl font-bold font-heading'>Learning</h2>
    <Link to='/'>
    <span className='cursor-pointer flex gap-2 items-center hover:scale-105 duration-300 transition-all ease-in'>
      <FaAngleDoubleLeft />Back to Home</span>
      </Link>
      </div>
      <div>
        <h4 className='text-xl font-medium'>
          Continue
        </h4>
        <div className='w-full overflow-x-scroll grid grid-cols-3'>
          {['demo1','demo2','demo3'].map((course,index)=>(
<EnrolledCourseCard key={index} img='https://i.pinimg.com/736x/dd/ce/a8/ddcea8f3c96bb4432e872a57accc3538.jpg' instructor_name='khushi' course_name='Lorem ipsum dolor sit amet. demo'/>
))}

        </div>
      </div>
    </div>
  )
}

export default EnrolledCourses