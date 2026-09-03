import React from 'react'
import EnrolledCourseCard from '../user/Enrollment/EnrolledCourseCard'

const MyCourses = () => {
  const sampleCourses = [1, 2, 3]

  return (
    <div className='bg-card rounded-xl border border-border shadow-sm p-3 md:p-5 flex flex-col gap-5'>

      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'>

        <div>
          <h2 className='text-lg sm:text-xl font-semibold text-text font-heading'>
            My Courses
          </h2>

          <p className='text-xs sm:text-sm text-text-light mt-1 font-body'>
            Continue learning where you left off
          </p>
        </div>

        <button
          type='button'
          className='self-start sm:self-auto px-3 sm:px-4 py-2 rounded-lg bg-primary text-white text-xs sm:text-sm font-medium font-body hover:bg-primary-light transition-colors'
        >
          View All
        </button>

      </div>

      {/* Courses */}
      {sampleCourses.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5'>

          {sampleCourses.map((item) => (
            <EnrolledCourseCard key={item} />
          ))}

        </div>
      ) : (
        <div className='py-8 text-center text-text-light text-sm border border-dashed border-border rounded-xl'>
          No enrolled courses found.
        </div>
      )}

    </div>
  )
}

export default MyCourses