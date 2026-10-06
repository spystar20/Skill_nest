
import { useState } from 'react'
import {
  FiDollarSign,
  FiUsers,
  FiBookOpen,
  FiStar,
  FiCalendar,
} from 'react-icons/fi'
import DashboardPageHeader from '@/Dashboard Pages/DashboardComponents/DashboardPageHeader'
import { useTeacherAnalytics } from '@/hooks/DahboardHooks/useDashboard'
import StatCard from '../TeacherDashboard/StatCard'
import RecentReviews from './RecentReviews'
import RevenueChart from './RevenueChart'
import EnrollmentSummary from './EnrollmentSummary'
import CoursePerformanceCard from './CoursePerformanceCard'
import EngagementStats from './EngagementStats'

const TeacherAnalytics = () => {
  const [period, setPeriod] = useState('7')
const {data:Analytics}=useTeacherAnalytics({period})
const revenueData = Analytics?.chartData?.map(data=>({
  label:data._id,revenue:data.totalRevenue
})) || []
  const stats = [
    {
      title: 'Total Revenue',
      value: Analytics?.totalRevenue || 0,
      change: '+14.2%',
      positive: true,
      icon: FiDollarSign,
      color: 'text-success bg-success/10'
    },
    {
      title: 'Total Enrollments',
      value: Analytics?.totalEnrollments|| 0,
      change: '+8.4%',
      positive: true,
      icon: FiUsers,
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Course Completion',
      value: (`${Analytics?.courseCompletion}%`),
      change: '+5.2%',
      positive: true,
      icon: FiBookOpen,
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Average Rating',
      value: Analytics?.averageReview || 0,
      change: '+0.2',
      positive: true,
      icon: FiStar,
      color: 'text-warning bg-warning/10'
    }
  ]
const enrollmentTotal = Analytics?.overviewEnrollment?.reduce((acc,curr)=>acc+curr?.enrollment,0) ||0
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
         <StatCard title={stat.title} Icon={Icon} value={stat.value} color={stat.color}/>
          )
        })}
      </div>

      {/* MAIN ANALYTICS GRID */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* REVENUE CHART */}
<RevenueChart data={revenueData}/>
        {/* ENROLLMENT SUMMARY */}
   <EnrollmentSummary enrollmentTotal={enrollmentTotal} newStudentsCount={Analytics?.newStudent || 0} returningStudentsCount={Analytics?.returningStudent|| 0}/>
      </div>

      {/* COURSE PERFORMANCE */}
      <CoursePerformanceCard courses={Analytics?.coursePerformance}/>

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

       <EngagementStats averageCompletion={ Math.round(Analytics?.studentEngagement[0]?.averageCompletion)} InprogressLearner={Analytics?.learnerCount} averageLearningTime={   Math.round(Analytics?.averageLearningTime[0]?.averageLearningTime)} lessonCompleted={Analytics?.studentEngagement[0]?.totalLesson}/>
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
            {Analytics?.recentReviews?.map((review) => (
           <RecentReviews review={review} key={review._id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherAnalytics

