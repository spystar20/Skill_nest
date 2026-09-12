
import { useMemo, useState } from 'react'
import {
  FiSearch,
  FiUsers,
  FiCheckCircle,
  FiBookOpen,
  FiTrendingUp,
  FiEye,
  FiMail,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import DashboardPageHeader from '@/Dashboard Pages/DashboardComponents/DashboardPageHeader'

const InstructorStudents = () => {
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const students = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@example.com',
      course: 'React Fundamentals',
      progress: 74,
      enrolled: 'Aug 28, 2026',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      course: 'Node.js Essentials',
      progress: 91,
      enrolled: 'Aug 22, 2026',
      status: 'Active'
    },
    {
      id: 3,
      name: 'David Kumar',
      email: 'david.kumar@example.com',
      course: 'MongoDB Masterclass',
      progress: 100,
      enrolled: 'Aug 14, 2026',
      status: 'Completed'
    },
    {
      id: 4,
      name: 'Emily Carter',
      email: 'emily.carter@example.com',
      course: 'React Fundamentals',
      progress: 48,
      enrolled: 'Aug 10, 2026',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      course: 'Master Tailwind CSS',
      progress: 32,
      enrolled: 'Aug 5, 2026',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      course: 'Node.js Essentials',
      progress: 100,
      enrolled: 'Jul 28, 2026',
      status: 'Completed'
    },
    {
      id: 7,
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      course: 'React Fundamentals',
      progress: 17,
      enrolled: 'Jul 24, 2026',
      status: 'Inactive'
    },
    {
      id: 8,
      name: 'Ananya Singh',
      email: 'ananya.singh@example.com',
      course: 'MongoDB Masterclass',
      progress: 62,
      enrolled: 'Jul 19, 2026',
      status: 'Active'
    }
  ]

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase())

      const matchesCourse =
        courseFilter === 'all' || student.course === courseFilter

      const matchesStatus =
        statusFilter === 'all' || student.status === statusFilter

      return matchesSearch && matchesCourse && matchesStatus
    })
  }, [search, courseFilter, statusFilter])

  const courses = [...new Set(students.map((student) => student.course))]

  const stats = [
    {
      title: 'Total Students',
      value: '1,280',
      icon: FiUsers,
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Active Students',
      value: '746',
      icon: FiTrendingUp,
      color: 'text-success bg-success/10'
    },
    {
      title: 'Completed',
      value: '318',
      icon: FiCheckCircle,
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Avg. Progress',
      value: '68.5%',
      icon: FiBookOpen,
      color: 'text-warning bg-warning/10'
    }
  ]

  return (
    <div className="min-h-screen w-full bg-page px-3 py-5 sm:px-5 md:px-8">
      <DashboardPageHeader
        title="Students"
        description="View and manage students enrolled in your courses."
      />

      {/* STATS */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md sm:p-5"
            >
              <div>
                <p className="font-body text-xs font-medium text-text-light">
                  {stat.title}
                </p>

                <h3 className="mt-1 font-heading text-2xl font-bold text-text">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}
              >
                <Icon className="text-xl" />
              </div>
            </div>
          )
        })}
      </div>

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
            <div className="flex w-full overflow-hidden rounded-full border border-border bg-page transition focus-within:border-accent sm:w-64">
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
            <select
              value={courseFilter}
              onChange={(e) => {
                setCourseFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="rounded-full border border-border bg-page px-4 py-2.5 font-body text-xs text-text outline-none transition focus:border-accent"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>

            {/* STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="rounded-full border border-border bg-page px-4 py-2.5 font-body text-xs text-text outline-none transition focus:border-accent"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="mt-5 hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-3 pb-3 font-body text-[11px] font-semibold uppercase tracking-wide text-text-light">
                  Student
                </th>
                <th className="px-3 pb-3 font-body text-[11px] font-semibold uppercase tracking-wide text-text-light">
                  Course
                </th>
                <th className="px-3 pb-3 font-body text-[11px] font-semibold uppercase tracking-wide text-text-light">
                  Progress
                </th>
                <th className="px-3 pb-3 font-body text-[11px] font-semibold uppercase tracking-wide text-text-light">
                  Enrolled
                </th>
                <th className="px-3 pb-3 font-body text-[11px] font-semibold uppercase tracking-wide text-text-light">
                  Status
                </th>
                <th className="px-3 pb-3 text-right font-body text-[11px] font-semibold uppercase tracking-wide text-text-light">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="transition hover:bg-page/60">
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary">
                        {student.name.charAt(0)}
                      </div>

                      <div className="min-w-0">
                        <p className="font-body text-sm font-semibold text-text">
                          {student.name}
                        </p>
                        <p className="truncate font-body text-[11px] text-text-light">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <span className="font-body text-xs text-text">
                      {student.course}
                    </span>
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex w-28 items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-page">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>

                      <span className="font-body text-[11px] font-medium text-text-light">
                        {student.progress}%
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-4 font-body text-xs text-text-light">
                    {student.enrolled}
                  </td>

                  <td className="px-3 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 font-body text-[10px] font-semibold ${
                        student.status === 'Active'
                          ? 'bg-success/10 text-success'
                          : student.status === 'Completed'
                            ? 'bg-accent/10 text-primary'
                            : 'bg-page text-text-light'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        aria-label={`View ${student.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-page text-text transition hover:border-accent hover:text-primary"
                      >
                        <FiEye className="text-sm" />
                      </button>

                      <button
                        type="button"
                        aria-label={`Email ${student.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-page text-text transition hover:border-accent hover:text-primary"
                      >
                        <FiMail className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE / TABLET CARDS */}
        <div className="mt-5 grid gap-3 lg:hidden">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="rounded-xl border border-border bg-page p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary">
                    {student.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-body text-sm font-semibold text-text">
                      {student.name}
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
                    {student.course}
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
                  Enrolled {student.enrolled}
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
        {filteredStudents.length === 0 && (
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
        {filteredStudents.length > 0 && (
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <p className="font-body text-xs text-text-light">
              Showing{' '}
              <span className="font-semibold text-text">
                {filteredStudents.length}
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
                {currentPage}
              </span>

              <button
                type="button"
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

