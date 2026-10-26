
import {  useEffect, useState } from 'react'
import {
  FiSearch,
  FiUsers,

  FiEye,
  FiMail,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import DashboardPageHeader from '@/Dashboard Pages/DashboardComponents/DashboardPageHeader'
import { useTeacherStudents } from '@/hooks/DahboardHooks/useDashboard'
import StudentsStat from './StudentsStat'
import { FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const InstructorStudents = () => {
    const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [debounceSearch,setDebounceSearch]=useState('')
    const [courseTitle, setCourseTitle] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
useEffect(()=>{
const timer =setTimeout(() => {
  setDebounceSearch(search)
}, 1000);
return ()=>clearTimeout(timer)
},[search])
   const {data:teacherData} = useTeacherStudents({status:statusFilter,title:courseTitle,search:debounceSearch,page:currentPage,limit:3})

  return (
    <div className="min-h-screen w-full bg-page px-3 py-5 sm:px-5 md:px-8">
      <DashboardPageHeader
        title="Students"
        description="View and manage students enrolled in your courses."
      />

      {/* STATS */}
     <StudentsStat totalEnrollments={teacherData?.totalEnrollments || 0} inProgressLearners={teacherData?.learnerCount || 0}  completedEnrollments={teacherData?.completedCourseCount || 0} averageProgres={teacherData?.courseCompletion || 0 } />

      {/* STUDENT LIST */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold text-text">
              All Students
            </h2>
            <p className="mt-1 font-body text-xs text-text-light">
              Track enrollment and learning progress.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* SEARCH */}
            <div className="flex w-full overflow-hidden rounded-full border border-border bg-page transition focus-within:border-accent sm:w-64 ">
              <div className="flex items-center pl-4 text-text-light">
                <FiSearch className="text-sm" />
              </div>

              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search students"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 font-body text-xs text-text outline-none placeholder:text-text-light"
              />
            </div>

            {/* COURSE FILTER */}
<FormControl  size="small"
              sx={{
                width: '100%',
                maxWidth: 180
              }}>
                <InputLabel>All Courses</InputLabel>
                <Select onChange={(e)=>{setCourseTitle(e.target.value),      setCurrentPage(1)}
} value={courseTitle} label=' Courses'>
                                    <MenuItem value='all'>All Courses</MenuItem>
                {teacherData?.courses?.map((course)=>(
                  
                                    <MenuItem key={course._id} value={course.title}>{course.title}</MenuItem>
                  
                ))}
                </Select>
              </FormControl>
            {/* STATUS FILTER */}
            <FormControl
              size="small"
              sx={{
                width: '100%',
                maxWidth: 180
              }}
            >
              <InputLabel>Status</InputLabel>

              <Select  onChange={(e) => {
    setStatusFilter(e.target.value)
    setCurrentPage(1)
  }}
              value={statusFilter}
                label="Status"
            >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem  value="completed">Completed</MenuItem>
                <MenuItem value="not-started">Not Started</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="mt-5 hidden overflow-x-auto lg:block">
       
          <TableContainer component={Paper}>
<Table>
<TableHead>
  <TableRow>
    <TableCell>
      Student
    </TableCell>
     <TableCell>
      Course
    </TableCell>
     <TableCell>
      Progress
    </TableCell>
     <TableCell>
      Enrolled
    </TableCell>
     <TableCell>
      Status
    </TableCell>
    <TableCell>
      Action
    </TableCell>
  </TableRow>

</TableHead>
<TableBody>
  {teacherData?.studentData?.map((student)=>(
<TableRow key={student._id}>
  <TableCell>
  <div className="flex items-center gap-3">
    {student.avatar ?(<img src={student.avatar} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10  "/>                    ):(   <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary">
                        {student.username.charAt(0)}
                      </div>)}
                   

                      <div className="min-w-0">
                        <p className="font-body text-sm font-semibold text-text">
                          {student.username}
                        </p>
                        <p className="truncate font-body text-[11px] text-text-light">
                          {student.email}
                        </p>
                      </div>
                    </div>  </TableCell>
                    <TableCell>
                      {student.title}
                    </TableCell>
                    <TableCell>
 <div className="flex w-28 items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-page">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>

                      <span className="font-body text-[11px] font-medium text-text-light">
                        {Math.round(student.progress)}%
                      </span>
                    </div>
                    </TableCell>
                    <TableCell>
  {new Date(student.createdAt).toLocaleDateString('en-IN',{day:"numeric",month:'short',year:'numeric'})}
                    </TableCell>
                    <TableCell>
    <span
                      className={`rounded-full px-2.5 py-1 font-body text-[10px] font-semibold ${
                        student.status === 'in-progress'
                          ? 'bg-success/10 text-success'
                          : student.status === 'completed'
                            ? 'bg-accent/10 text-primary'
                            : 'bg-page text-text-light'
                      }`}
                    >
                      {student.status}
                    </span>
                    </TableCell>
                    <TableCell>
                        <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        aria-label={`View ${student.username}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-page text-text transition hover:border-accent hover:text-primary"
                      >
                        <FiEye className="text-sm" />
                      </button>

                      <button
                        type="button"
                        aria-label={`Email ${student.username}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-page text-text transition hover:border-accent hover:text-primary"
                      >
                        <FiMail className="text-sm" />
                      </button>
                    </div>
                    </TableCell>
</TableRow>
  ))}
</TableBody>
</Table>
          </TableContainer>
        </div>

        {/* MOBILE / TABLET CARDS */}
        <div className="mt-5 grid gap-3 lg:hidden">
          {teacherData?.studentData?.map((student) => (
            <div
              key={student._id}
              className="rounded-xl border border-border bg-page p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary">
                    {student.username.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-body text-sm font-semibold text-text">
                      {student.username}
                    </p>
                    <p className="truncate font-body text-[11px] text-text-light">
                      {student.email}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 font-body text-[10px] font-semibold ${
                    student.status === 'Active'
                      ? 'bg-success/10 text-success'
                      : student.status === 'Completed'
                        ? 'bg-accent/10 text-primary'
                        : 'bg-page text-text-light'
                  }`}
                >
                  {student.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-text-light">
                    {student.title}
                  </span>

                  <span className="font-body text-xs font-semibold text-text">
                    {student.progress}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-card">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="font-body text-[11px] text-text-light">
                  {/* Enrolled {student.enrolled} */}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-text transition hover:border-accent hover:text-primary"
                  >
                    <FiEye className="text-sm" />
                  </button>

                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-text transition hover:border-accent hover:text-primary"
                  >
                    <FiMail className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {teacherData?.studentData?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FiUsers className="text-xl" />
            </div>

            <h3 className="mt-4 font-heading text-base font-semibold text-text">
              No students found
            </h3>

            <p className="mt-1 max-w-sm font-body text-xs text-text-light">
              Try changing your search or filters to find the students you are
              looking for.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        {teacherData?.studentData?.length > 0 && (
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <p className="font-body text-xs text-text-light">
              Showing{' '}
              <span className="font-semibold text-text">
                  {teacherData?.studentData?.length}
              </span>{' '}
              students
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-text transition hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronLeft />
              </button>
      <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-primary px-2 font-body text-xs font-semibold text-white">
        {currentPage} / {teacherData.totalPages}
      </span>

          

              <button
                type="button"
disabled={currentPage >= teacherData.totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-text transition hover:border-accent hover:text-primary"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InstructorStudents

