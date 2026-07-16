import EnrolledCourseCard from '@/utils/EnrolledCourseCard'
import EnrollFilterPill from '@/utils/EnrollFilterPill'
import ProjectCard from '@/utils/ProjectCard'
import React from 'react'
import { FaAngleDoubleLeft, FaSearch } from 'react-icons/fa'
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
{/* continue course */}
      <div className='w-full '>
        <h4 className='text-gray-600 text-lg mb-3'>
          
Continue where you left off and track your progress.
        </h4>
        <div className='w-full rounded-2xl overflow-x-auto no-scrollbar flex gap-6'>
          {['demo1','demo2','demo3',4,5].map((course,index)=>(
<EnrolledCourseCard key={index} progressPercent={100} className="shrink-0 max-w-[300px]" img='https://i.pinimg.com/736x/dd/ce/a8/ddcea8f3c96bb4432e872a57accc3538.jpg' instructor_name='khushi' course_name='Lorem ipsum dolor sit amet. demo'/>
))}

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
       <div className='grid grid-cols-4 gap-5 py-4'>
   {['demo1','demo2','demo3',4,5].map((course,index)=>(
<EnrolledCourseCard key={index} className="shrink-0 max-w-[300px]" img='https://i.pinimg.com/736x/dd/ce/a8/ddcea8f3c96bb4432e872a57accc3538.jpg' instructor_name='khushi' course_name='Lorem ipsum dolor sit amet. demo'/>
))}
       </div>
      </div>
    </div>
  )
}

export default EnrolledCourses