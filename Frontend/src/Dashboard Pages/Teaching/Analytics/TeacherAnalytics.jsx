
import { useState } from 'react'
import {
  FiDollarSign,
  FiUsers,
  FiBookOpen,
  FiStar,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiArrowUpRight
} from 'react-icons/fi'
import { PiStudentFill, PiBooks } from 'react-icons/pi'
import DashboardPageHeader from '@/Dashboard Pages/DashboardComponents/DashboardPageHeader'

const TeacherAnalytics = () => {
  const [period, setPeriod] = useState('30')

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,450',
      change: '+14.2%',
      positive: true,
      icon: FiDollarSign,
      color: 'text-success bg-success/10'
    },
    {
      title: 'Total Enrollments',
      value: '1,280',
      change: '+8.4%',
      positive: true,
      icon: FiUsers,
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Course Completion',
      value: '68.5%',
      change: '+5.2%',
      positive: true,
      icon: FiBookOpen,
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      positive: true,
      icon: FiStar,
      color: 'text-warning bg-warning/10'
    }
  ]

  const revenueData = [
    { month: 'Apr', revenue: '$2,140' },
    { month: 'May', revenue: '$2,680' },
    { month: 'Jun', revenue: '$1,920' },
    { month: 'Jul', revenue: '$2,850' },
    { month: 'Aug', revenue: '$2,860' }
  ]

  const courses = [
    {
      id: 1,
      title: 'React Fundamentals',
      students: 1240,
      completion: '74%',
      rating: '4.8',
      revenue: '$5,420'
    },
    {
      id: 2,
      title: 'Node.js Essentials',
      students: 842,
      completion: '69%',
      rating: '4.7',
      revenue: '$3,280'
    },
    {
      id: 3,
      title: 'MongoDB Masterclass',
      students: 615,
      completion: '63%',
      rating: '4.9',
      revenue: '$2,150'
    },
    {
      id: 4,
      title: 'Master Tailwind CSS',
      students: 384,
      completion: '58%',
      rating: '4.6',
      revenue: '$1,600'
    }
  ]

  const reviews = [
    {
      id: 1,
      name: 'Alex M.',
      course: 'Node.js Essentials',
      rating: 5,
      text: 'Really clear explanations and practical examples.'
    },
    {
      id: 2,
      name: 'Sarah J.',
      course: 'React Fundamentals',
      rating: 5,
      text: 'The project-based lessons made React much easier to understand.'
    },
    {
      id: 3,
      name: 'David K.',
      course: 'MongoDB Masterclass',
      rating: 4,
      text: 'Good course structure and useful database examples.'
    }
  ]

  return (
    <div className="min-h-screen w-full bg-page px-3 py-5 sm:px-5 md:px-8">
      <DashboardPageHeader
        title="Analytics"
        description="Track your course performance, student engagement, and revenue."
      />

      {/* PERIOD FILTER */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold text-text">
            Performance Overview
          </h2>
          <p className="mt-1 font-body text-xs text-text-light">
            Monitor how your teaching is performing over time.
          </p>
        </div>

        <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-card p-1 sm:w-auto">
          {[
            { value: '7', label: '7 Days' },
            { value: '30', label: '30 Days' },
            { value: '90', label: '90 Days' },
            { value: '365', label: 'Year' }
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setPeriod(item.value)}
              className={`flex-1 rounded-lg px-3 py-2 font-body text-xs font-medium transition sm:flex-none ${
                period === item.value
                  ? 'bg-primary text-white'
                  : 'text-text-light hover:bg-page hover:text-text'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

                <span
                  className={`mt-1 inline-flex items-center gap-1 font-body text-xs font-medium ${
                    stat.positive ? 'text-success' : 'text-error'
                  }`}
                >
                  {stat.positive ? <FiTrendingUp /> : <FiTrendingDown />}
                  {stat.change}
                </span>
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

      {/* MAIN ANALYTICS GRID */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* REVENUE CHART */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 xl:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-text">
                Revenue Overview
              </h3>
              <p className="mt-1 font-body text-xs text-text-light">
                Revenue generated from your courses.
              </p>
            </div>

            <div className="flex items-center gap-2 font-body text-xs text-success">
              <FiTrendingUp />
              14.2% this period
            </div>
          </div>

          <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
            {revenueData.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="font-body text-[10px] font-medium text-text-light">
                  {item.revenue}
                </span>

                <div
                  className={`w-full max-w-16 rounded-t-xl bg-primary transition-all duration-300 hover:bg-primary-light ${
                    item.month === 'Aug'
                      ? 'h-[88%]'
                      : item.month === 'Jul'
                        ? 'h-[84%]'
                        : item.month === 'Jun'
                          ? 'h-[58%]'
                          : item.month === 'May'
                            ? 'h-[76%]'
                            : 'h-[62%]'
                  }`}
                />

                <span className="font-body text-[10px] font-medium text-text-light">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ENROLLMENT SUMMARY */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-text">
                Enrollment Summary
              </h3>
              <p className="mt-1 font-body text-xs text-text-light">
                Student growth this period.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FiUsers />
            </div>
          </div>

          <div className="mt-6">
            <p className="font-heading text-3xl font-bold text-text">
              1,280
            </p>

            <p className="mt-1 flex items-center gap-1 font-body text-xs font-medium text-success">
              <FiTrendingUp />
              8.4% increase
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center justify-between font-body text-xs">
                <span className="text-text-light">New Students</span>
                <span className="font-medium text-text">384</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-page">
                <div className="h-full w-[72%] rounded-full bg-primary" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between font-body text-xs">
                <span className="text-text-light">Returning Students</span>
                <span className="font-medium text-text">896</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-page">
                <div className="h-full w-[84%] rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COURSE PERFORMANCE */}
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
              {courses.map((course) => (
                <div
                  key={course.id}
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
                    {course.students}
                  </span>

                  <span className="font-body text-xs font-medium text-text">
                    {course.completion}
                  </span>

                  <span className="flex items-center gap-1 font-body text-xs font-medium text-warning">
                    <FiStar />
                    {course.rating}
                  </span>

                  <span className="font-body text-xs font-semibold text-text">
                    {course.revenue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* STUDENT ENGAGEMENT */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-text">
                Student Engagement
              </h3>
              <p className="mt-1 font-body text-xs text-text-light">
                Overall learner activity across your courses.
              </p>
            </div>

            <FiCalendar className="text-text-light" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-page p-4">
              <p className="font-body text-xs text-text-light">
                Lessons Completed
              </p>
              <p className="mt-1 font-heading text-xl font-bold text-text">
                8,420
              </p>
            </div>

            <div className="rounded-xl border border-border bg-page p-4">
              <p className="font-body text-xs text-text-light">
                Avg. Completion
              </p>
              <p className="mt-1 font-heading text-xl font-bold text-text">
                68.5%
              </p>
            </div>

            <div className="rounded-xl border border-border bg-page p-4">
              <p className="font-body text-xs text-text-light">
                Active Learners
              </p>
              <p className="mt-1 font-heading text-xl font-bold text-text">
                746
              </p>
            </div>

            <div className="rounded-xl border border-border bg-page p-4">
              <p className="font-body text-xs text-text-light">
                Avg. Learning Time
              </p>
              <p className="mt-1 font-heading text-xl font-bold text-text">
                3.4h
              </p>
            </div>
          </div>
        </div>

        {/* RECENT REVIEWS */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-text">
                Recent Reviews
              </h3>
              <p className="mt-1 font-body text-xs text-text-light">
                Latest feedback from your students.
              </p>
            </div>

            <FiStar className="text-warning" />
          </div>

          <div className="mt-5 space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-border pb-4 last:border-none last:pb-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-body text-sm font-semibold text-text">
                      {review.name}
                    </p>
                    <p className="font-body text-[10px] text-text-light">
                      {review.course}
                    </p>
                  </div>

                  <div className="flex items-center gap-0.5 text-warning">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <FiStar key={index} className="fill-current text-xs" />
                    ))}
                  </div>
                </div>

                <p className="mt-2 font-body text-xs leading-relaxed text-text-light">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherAnalytics

