import React from 'react'
import { FiArrowUpRight, FiCalendar, FiStar } from 'react-icons/fi'
import { PiBooks, PiStudentFill } from 'react-icons/pi'

const CoursePerformanceCard = ({courses}) => {
  return (
   <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-text">
              Course Performance
            </h3>
            <p className="mt-1 font-body text-xs text-text-light">
              Compare your courses by students, completion, ratings, and revenue.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 self-start font-body text-xs font-semibold text-primary transition hover:text-primary-light"
          >
            View Details
            <FiArrowUpRight />
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 border-b border-border px-3 pb-3 font-body text-[11px] font-semibold uppercase tracking-wide text-text-light">
              <span>Course</span>
              <span>Students</span>
              <span>Completion</span>
              <span>Rating</span>
              <span>Revenue</span>
            </div>

            <div className="divide-y divide-border">
              {courses?.map((course) => (
                <div
                  key={course._id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-4 px-3 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <PiBooks />
                    </div>

                    <span className="truncate font-body text-sm font-medium text-text">
                      {course.title}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 font-body text-xs text-text-light">
                    <PiStudentFill />
                    {course.studentCount}
                  </span>

                  <span className="font-body text-xs font-medium text-text">
                    {course.completion|| 0 }%
                  </span>

                  <span className="flex items-center gap-1 font-body text-xs font-medium text-warning">
                    <FiStar />
                    {course.averageRating || 'No ratings yet'} 
                  </span>

                  <span className="font-body text-xs font-semibold text-text">
                   ₹{course.totalRevenue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default CoursePerformanceCard