
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAngleDoubleLeft, FaSearch } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { PiBooks, PiPencil, PiStudentFill } from 'react-icons/pi'
import { ImBin } from 'react-icons/im'
import { MdOutlineWatchLater } from 'react-icons/md'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

import Dataset from '@/utils/Dataset'
import { useTeacherCourses } from '@/hooks/CoursesHooks/useCourse'
import { useDeleteCourse } from '@/hooks/CoursesHooks/courseMutation'
import DashboardPageHeader from '../DashboardComponents/DashboardPageHeader'

const MyCourse = () => {
  const [sort, setSort] = useState('')
const [search,setSearch ]= useState('')
const [debouncedSearch,setDebouncedSearch]=useState('')
const params ={}
if(debouncedSearch){
  params.search= debouncedSearch
}
if(sort){
  params.sort = sort
}
const handleSearch = ()=>{
  setDebouncedSearch(search.trim())
}
useEffect(()=>{
const timer = setTimeout(() => {
  handleSearch()
}, 3000);
  return () => clearTimeout(timer)

},[search])
  const { isLoading, isError, data: Course } = useTeacherCourses(params)
  const { mutate: CourseDeleteMutation } = useDeleteCourse()

  const DeleteCourse = (courseId) => {
    CourseDeleteMutation(
      { courseId },
      {
        onSuccess: () => {
          toast.success('Course deleted successfully')
        }
      }
    )
  }

  return (
    <div className="min-h-screen w-full bg-page px-3 py-5 sm:px-5 md:px-8">
      {/* HEADER */}
<DashboardPageHeader title='Teaching' description='Manage your courses and keep your teaching content organized.'/>
      <div className="flex flex-col gap-6 lg:flex-row mt-6">
        {/* MAIN CONTENT */}
        <div className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-5 md:p-6">
          {/* SECTION HEADER */}
          <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold text-text">
                My Courses
              </h2>
              <p className="mt-1 font-body text-sm text-text-light">
                View and manage all your created courses.
              </p>
            </div>

            <Link to="/dashboard/teacher/add-course">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-all duration-200 hover:bg-primary-light sm:w-auto"
              >
                <FiPlus className="text-lg" />
                New Course
              </button>
            </Link>
          </div>

          {/* SEARCH + SORT */}
          <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
            {/* search */}
            <div className="flex w-full overflow-hidden rounded-full border border-border bg-page transition focus-within:border-accent sm:max-w-md">
              <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
onKeyDown={(e)=>{
  if(e.key==="Enter"){
    handleSearch()
  }
}}
                type="search"
                placeholder="Search your courses"
                className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm font-body text-text outline-none placeholder:text-text-light"
              />

              <button
onClick={handleSearch}
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-white transition hover:bg-primary-light"
              >
                <FaSearch className="text-sm" />
              </button>
            </div>

            <FormControl
              size="small"
              sx={{
                width: '100%',
                maxWidth: 180
              }}
            >
              <InputLabel>Sort By</InputLabel>

              <Select
                value={sort}
                label="Sort By"
                onChange={(e) => setSort(e.target.value)}
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* COURSES */}
          <Dataset loading={isLoading} error={isError}>
            <div className="space-y-4">
              {Course?.map((course) => (
                <div
                  key={course._id}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-3 transition-all duration-300 hover:shadow-md sm:p-4 lg:flex-row lg:items-center lg:justify-between"
                >
                  {/* COURSE INFO */}
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="aspect-video w-full shrink-0 rounded-xl object-cover sm:h-28 sm:w-40"
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h5 className="line-clamp-1 font-heading text-base font-semibold text-text sm:text-lg">
                          {course.title}
                        </h5>

                        <span className="rounded-full bg-success/10 px-2.5 py-1 font-body text-[11px] font-medium capitalize text-success">
                          {course.status}
                        </span>
                      </div>

                      <p className="mt-1 line-clamp-2 font-body text-sm leading-relaxed text-text-light">
                        {course.desc}
                      </p>

                      {/* META */}
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-body text-xs text-text-light sm:text-sm">
                        <span className="flex items-center gap-1.5">
                          <PiStudentFill />
                          120 Students
                        </span>

                        <span className="flex items-center gap-1.5">
                          <PiBooks />
                          {course.lessonCount} Lessons
                        </span>

                        <span className="flex items-center gap-1.5">
                          <MdOutlineWatchLater />

                          {course.updatedAt
                            ? `Updated ${formatDistanceToNow(
                                new Date(course.updatedAt),
                                { addSuffix: true }
                              )}`
                            : 'Just Now'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center justify-between gap-3 border-t border-border pt-3 sm:justify-end sm:border-0 sm:pt-0 lg:flex-col lg:items-end">
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to={`/dashboard/teacher/courses/${course._id}/edit`}
                        aria-label={`Edit ${course.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-all duration-200 hover:scale-105 hover:bg-primary-light"
                      >
                        <PiPencil />
                      </Link>

                      <button
                        type="button"
                        onClick={() => DeleteCourse(course._id)}
                        aria-label={`Delete ${course.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-page text-text transition-all duration-200 hover:scale-105 hover:border-error hover:bg-error/10 hover:text-error"
                      >
                        <ImBin className="text-sm" />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="rounded-full border border-border bg-page px-4 py-2 font-body text-xs font-medium text-text transition hover:border-accent hover:bg-accent/5 hover:text-primary"
                    >
                      Analytics
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Dataset>
        </div>

        {/* FUTURE RIGHT-SIDE CARDS */}
        <div className="basis-1/4">
        </div>
      </div>
    </div>
  )
}

export default MyCourse

