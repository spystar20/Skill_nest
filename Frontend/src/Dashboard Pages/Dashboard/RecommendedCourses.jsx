import ProjectCard from '@/Pages/Course/ProjectCard'
import React from 'react'
import { Link } from 'react-router-dom'

export const RecommendedCourses = ({title,desc,link,courses}) => {
  return (
 <div className='bg-card rounded-xl border border-border shadow-sm p-3 md:px-5 md:py-7 flex flex-col gap-5'>

      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'>

        <div>
          <h2 className='text-lg sm:text-xl font-semibold text-text font-heading'>
{title}          </h2>

          <p className='text-xs sm:text-sm text-text-light mt-1 font-body'>
          {desc}
          </p>
        </div>

        <Link to={link}
          type='button'
          className='self-start sm:self-auto px-3 sm:px-4 py-2 rounded-lg bg-primary text-white text-xs sm:text-sm font-medium font-body hover:bg-primary-light transition-colors'
        >
          View All
        </Link>

      </div>

      {/* Courses */}

  
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5'>

          {courses?.map((course) => (
        <ProjectCard  course={course} key={course._id} />
        
          ))}

        </div>
     

    </div>
      )
}
