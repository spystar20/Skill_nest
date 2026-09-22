import React from 'react'
import { FiStar, FiArrowUpRight } from 'react-icons/fi'
import { PiStudentFill } from 'react-icons/pi'

const CoursePerformance = (
{course,index}
) => {
  return (
   <div
                  className="flex items-center gap-3 rounded-xl border border-border bg-page p-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-heading text-sm font-semibold text-primary">
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 font-body text-sm font-medium text-text">
                      {course.title}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-text-light">
                      <span className="flex items-center gap-1">
                        <PiStudentFill />
                        {course.studentCount || 0} students
                      </span>

                      <span className="flex items-center gap-1 text-warning">
                        <FiStar />
                      {course.averageRating || 'No ratings'}
                      </span>
                    </div>
                  </div>

                  <FiArrowUpRight className="shrink-0 text-text-light" />
                </div>  )
}

export default CoursePerformance