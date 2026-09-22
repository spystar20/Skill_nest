import React from 'react'
import { PiBooks, PiPencil, PiStudentFill } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const RecentCourses = ({course}
) => {
  return (
   <div
                      className="flex flex-col gap-3 rounded-xl border border-border bg-page p-3 transition hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="h-16 w-24 shrink-0 rounded-lg object-cover"
                        />

                        <div className="min-w-0">
                          <h4 className="line-clamp-1 font-heading text-sm font-semibold text-text">
                            {course.title}
                          </h4>

                          <div className="mt-1 flex flex-wrap items-center gap-3 font-body text-xs text-text-light">
                            <span className="flex items-center gap-1">
                              <PiStudentFill />
                              {course.studentCount || 0}
                            </span>

                            <span className="flex items-center gap-1">
                              <PiBooks />
                              {course.lessonCount || 0} lessons
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/dashboard/teacher/courses/${course._id}/edit`}
                        aria-label={`Edit ${course.title}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center self-end rounded-full bg-primary text-white transition hover:bg-primary-light sm:self-center"
                      >
                        <PiPencil className="text-xs" />
                      </Link>
                    </div>
  )
}

export default RecentCourses