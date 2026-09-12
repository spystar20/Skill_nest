
import { Link } from 'react-router-dom'
import {
  FiPlus,
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiStar,
  FiTrendingUp,
  FiMessageSquare,
  FiBell,
  FiArrowUpRight,
  FiCheckCircle
} from 'react-icons/fi'
import { PiPencil, PiStudentFill, PiBooks } from 'react-icons/pi'
import { formatDistanceToNow } from 'date-fns'

import Dataset from '@/utils/Dataset'
import { useTeacherCourses } from '@/hooks/CoursesHooks/useCourse'
import DashboardPageHeader from '@/Dashboard Pages/DashboardComponents/DashboardPageHeader'

const TeacherDashboard = () => {
  const { isLoading, isError, data: courses } = useTeacherCourses({
    limit: 3,
    sort: 'newest'
  })

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,450',
      change: '+14%',
      icon: FiDollarSign,
      color: 'text-success bg-success/10'
    },
    {
      title: 'Total Students',
      value: '1,280',
      change: '+8%',
      icon: FiUsers,
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Active Courses',
      value: '12',
      change: '+2',
      icon: FiBookOpen,
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '★★★★★',
      icon: FiStar,
      color: 'text-warning bg-warning/10'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'enrollment',
      message: 'Sarah Jenkins enrolled in React Fundamentals',
      time: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
      id: 2,
      type: 'review',
      message: 'Alex M. left a 5-star review on Node.js Essentials',
      time: new Date(Date.now() - 1000 * 60 * 120)
    },
    {
      id: 3,
      type: 'question',
      message: 'New question asked in Chapter 3: Async/Await',
      time: new Date(Date.now() - 1000 * 60 * 240)
    }
  ]

  const pendingTasks = [
    {
      id: 1,
      task: 'Complete draft course',
      tag: 'Draft',
      path: '/dashboard/teacher/add-course'
    },
    {
      id: 2,
      task: 'Review unpublished course content',
      tag: 'Review',
      path: '/dashboard/teacher/courses'
    },
    {
      id: 3,
      task: 'Check recent student questions',
      tag: 'Support',
      path: '/dashboard/teacher/discussions'
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
            <div
              key={stat.title}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-5"
            >
              <div className="min-w-0">
                <p className="font-body text-xs font-medium text-text-light">
                  {stat.title}
                </p>

                <h3 className="mt-1 font-heading text-2xl font-bold text-text">
                  {stat.value}
                </h3>

                <span
                  className={`mt-1 inline-flex items-center gap-1 font-body text-xs font-medium ${
                    stat.title === 'Average Rating'
                      ? 'text-warning'
                      : 'text-success'
                  }`}
                >
                  {stat.title === 'Average Rating' ? (
                    stat.change
                  ) : (
                    <>
                      <FiTrendingUp />
                      {stat.change}
                    </>
                  )}
                </span>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.color}`}
              >
                <Icon className="text-xl" />
              </div>
            </div>
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
                    <div
                      key={course._id}
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
              {courses?.slice(0, 3).map((course, index) => (
                <div
                  key={course._id}
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
                        4.8
                      </span>
                    </div>
                  </div>

                  <FiArrowUpRight className="shrink-0 text-text-light" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex basis-full flex-col gap-6 lg:basis-1/3">
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
              {pendingTasks.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-page p-3 transition hover:border-accent hover:bg-accent/5"
                >
                  <span className="font-body text-xs font-medium text-text">
                    {item.task}
                  </span>

                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 font-body text-[10px] font-semibold text-primary">
                    {item.tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-heading text-base font-semibold text-text">
              Recent Activity
            </h3>

            <div className="mt-4 space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 border-b border-border/50 pb-3 last:border-none last:pb-0"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {activity.type === 'enrollment' && (
                      <FiUsers className="text-[10px]" />
                    )}

                    {activity.type === 'review' && (
                      <FiStar className="text-[10px]" />
                    )}

                    {activity.type === 'question' && (
                      <FiMessageSquare className="text-[10px]" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-body text-xs leading-relaxed text-text">
                      {activity.message}
                    </p>

                    <span className="font-body text-[10px] text-text-light">
                      {formatDistanceToNow(activity.time, {
                        addSuffix: true
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

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

