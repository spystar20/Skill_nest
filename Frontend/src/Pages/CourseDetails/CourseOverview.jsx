import React from 'react'

const CourseOverview = ({description}) => {
  return (
 <div className="py-6 min-w-0 w-full">
                  <section className='w-full min-w-0'>
                    <h2 className="text-3xl font-heading font-semibold text-[#0A1931]">
                      About this course
                    </h2>
                    <p className="mt-5 leading-8 text-gray-600 text-lg">
                      {description}
                    </p>
                  </section>
                </div>  )
}

export default CourseOverview