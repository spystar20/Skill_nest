
import { Link } from 'react-router-dom'
import {
  FiPlus,
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiStar,
  FiMessageSquare,
  FiBell,
  FiArrowUpRight,
  FiCheckCircle
} from 'react-icons/fi'


import Dataset from '@/utils/Dataset'
import { useTeacherCourses } from '@/hooks/CoursesHooks/useCourse'
import DashboardPageHeader from '@/Dashboard Pages/DashboardComponents/DashboardPageHeader'
import { useTeacherDashboard } from '@/hooks/DahboardHooks/useDashboard'
import StatCard from './StatCard'
import RecentCourses from './RecentCourses'
import AiComingSoon from '@/Dashboard Pages/DashboardComponents/AiCommingSoon'
import RecentActivity from '@/Dashboard Pages/Dashboard/RecentActivity'
import CoursePerformance from './CoursePerformance'

const TeacherDashboard = () => {
  const { isLoading, isError, data: courses } = useTeacherCourses({
    limit: 3,
    sort: 'newest'
  })

  const {data:teacherData}=useTeacherDashboard()

  const stats = [
    {
      title: 'Total Revenue',
      change: '+14%',
      icon: FiDollarSign,
      color: 'text-success bg-success/10',
      value:teacherData?.totalRevenue
    },
    {
      title: 'Total Students',
      change: '+8%',
      icon: FiUsers,
      color: 'text-primary bg-primary/10',
      value:teacherData?.studentCount
    },
    {
      title: 'Active Courses',
      change: '+2',
      icon: FiBookOpen,
      color: 'text-accent bg-accent/10',
      value:teacherData?.activeCourses
    },
    {
      title: 'Average Rating',
      change: '★★★★★',
      icon: FiStar,
      color: 'text-warning bg-warning/10',
      value:teacherData?.averageReview
    }
  ]
  return (
    <div className="min-h-screen w-full bg-page px-3 py-5 sm:px-5 md:px-8">
      <DashboardPageHeader
        title="Instructor Dashboard"
        description="Welcome back! Here is an overview of your courses and student engagement."
      />

      {/* STATS */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
           <StatCard title={stat.title} value={stat.value} Icon={stat.icon} color={stat.color}/>
          )
        })}
      </div>

      {/* MAIN CONTENT */}
      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        {/* LEFT COLUMN */}
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              to="/dashboard/teacher/add-course"
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-accent hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <FiPlus className="text-lg" />
                </div>

                <div>
                  <h4 className="font-heading text-sm font-semibold text-text">
                    New Course
                  </h4>
                  <p className="font-body text-xs text-text-light">
                    Create new content
                  </p>
                </div>
              </div>

              <FiArrowUpRight className="text-text-light transition group-hover:text-accent" />
            </Link>

            <button
              type="button"
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:border-accent hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                  <FiMessageSquare className="text-lg" />
                </div>

                <div>
                  <h4 className="font-heading text-sm font-semibold text-text">
                    Announcement
                  </h4>
                  <p className="font-body text-xs text-text-light">
                    Broadcast to students
                  </p>
                </div>
              </div>

              <FiArrowUpRight className="text-text-light transition group-hover:text-accent" />
            </button>

            <button
              type="button"
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-4 text-left transition-all duration-200 hover:border-accent hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <FiBell className="text-lg" />
                </div>

                <div>
                  <h4 className="font-heading text-sm font-semibold text-text">
                    Q&A Board
                  </h4>
                  <p className="font-body text-xs text-text-light">
                    Check discussions
                  </p>
                </div>
              </div>

              <FiArrowUpRight className="text-text-light transition group-hover:text-accent" />
            </button>
          </div>

          {/* RECENT COURSES */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="font-heading text-lg font-semibold text-text">
                  Recent Courses
                </h3>
                <p className="font-body text-xs text-text-light">
                  Manage your latest courses
                </p>
              </div>

              <Link
                to="/dashboard/teacher/courses"
                className="font-body text-xs font-semibold text-primary transition hover:text-primary-light hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="mt-4">
              <Dataset loading={isLoading} error={isError}>
                <div className="space-y-3">
                  {courses?.map((course) => (
                   <RecentCourses key={course._id} course={course}/>
                  ))}
                </div>
              </Dataset>
            </div>
          </div>

          {/* COURSE PERFORMANCE */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="font-heading text-lg font-semibold text-text">
                  Course Performance
                </h3>
                <p className="font-body text-xs text-text-light">
                  A quick look at your top courses
                </p>
              </div>

              <Link
                to="/dashboard/teacher/analytics"
                className="font-body text-xs font-semibold text-primary transition hover:text-primary-light hover:underline"
              >
                Analytics
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {teacherData?.performance?.map((course,index) => (
              <CoursePerformance key={course._id} index={index} course={course}/>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex basis-full flex-col gap-6 lg:basis-1/3">
        <AiComingSoon/>
          {/* ACTION REQUIRED */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-base font-semibold text-text">
                  Action Required
                </h3>
                <p className="mt-1 font-body text-xs text-text-light">
                  Things that need your attention
                </p>
              </div>

              <FiBell className="text-text-light" />
            </div>

            <div className="mt-4 space-y-3">
              {teacherData?.draftCourses > 0 ? (
  <Link
    to="/dashboard/teacher/courses"
    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-page p-3 transition hover:border-accent hover:bg-accent/5"
  >
    <div>
      <p className="font-body text-xs font-medium text-text">
        Complete your draft course
      </p>
      <p className="mt-1 font-body text-[10px] text-text-light">
        {teacherData.draftCourses} course
        {teacherData.draftCourses > 1 ? 's' : ''} waiting to be completed
      </p>
    </div>

    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 font-body text-[10px] font-semibold text-primary">
      Continue
    </span>
  </Link>
) : (
  <div className="rounded-xl border border-border bg-page p-3">
    <p className="font-body text-xs font-medium text-text">
      You're all caught up
    </p>
    <p className="mt-1 font-body text-[10px] text-text-light">
      No draft courses need your attention.
    </p>
  </div>
)}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
  <RecentActivity activities={teacherData?.activities} role="teacher"/>
          {/* DASHBOARD TIP */}
          <div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiCheckCircle />
              </div>

              <div>
                <h3 className="font-heading text-sm font-semibold text-text">
                  Keep your courses active
                </h3>
                <p className="mt-1 font-body text-xs leading-relaxed text-text-light">
                  Regularly updating lessons and responding to students can
                  help keep your courses engaging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard

