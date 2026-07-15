import EnrolledCourseCard from '@/utils/EnrolledCourseCard'
import EnrollFilterPill from '@/utils/EnrollFilterPill'
import ProjectCard from '@/utils/ProjectCard'
import React from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const EnrolledCourses = () => {
  return (
    <div className='w-full bg-neutral-100 min-h-screen overflow-x-hidden px-2 md:px-8 py-3 flex flex-col gap-6 '>
   <div className='flex justify-between items-center'> 
    <h2 className='text-3xl font-bold font-heading'>Learning</h2>
    <Link to='/'>
    <span className='cursor-pointer flex gap-2 items-center hover:scale-105 duration-300 transition-all ease-in'>
      <FaAngleDoubleLeft />Back to Home</span>
      </Link>
      </div>

      <div className='w-full '>
        <h4 className='text-gray-600 text-lg mb-3'>
          
Continue where you left off and track your progress.
        </h4>
        <div className='w-full rounded-2xl overflow-x-auto no-scrollbar flex gap-6'>
          {['demo1','demo2','demo3',4,5].map((course,index)=>(
<EnrolledCourseCard key={index} className="shrink-0 max-w-[300px]" img='https://i.pinimg.com/736x/dd/ce/a8/ddcea8f3c96bb4432e872a57accc3538.jpg' instructor_name='khushi' course_name='Lorem ipsum dolor sit amet. demo'/>
))}

        </div>
      </div>
      <div>
        <h3 className='text-xl font-semibold capitalize font-heading' >Enrolled Courses (5)</h3>
        <div>
          <EnrollFilterPill filter='all status'/>
        </div>
      </div>
    </div>
  )
}

export default EnrolledCourses