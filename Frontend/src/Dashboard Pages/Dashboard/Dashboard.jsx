import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import DashboardPageHeader from '../DashboardComponents/DashboardPageHeader'
import { HiOutlineBookOpen, HiOutlineCheckBadge } from 'react-icons/hi2'
import { SlBadge } from 'react-icons/sl'
import DashboardStat from '../DashboardComponents/DashboardStat'
import { PiClockUser } from 'react-icons/pi'
import LearningChart from '../DashboardComponents/LearningChart'
import AiCommingSoon from '../DashboardComponents/AiCommingSoon'
import StreakCard from './StreakCard'
import RecentActivity from './RecentActivity'
import { useRecentActivity, useRecommendedCourses, useStudentDashboard } from '@/hooks/DahboardHooks/useDashboard'
import { formatTime } from '@/utils/formatDuration'
import { useEnrolledCourses } from '@/hooks/EnrollmentHooks/useEnrolledCourses'
import EnrolledCourseCard from '../user/Enrollment/EnrolledCourseCard'
import CoursesShowcase from './CoursesShowcase'
import { RecommendedCourses } from './RecommendedCourses'

const Dashboard = () => {
  const { user } = useAuth()
  const ranges = ['week', 'month', 'year']
  const [range,setRange ]=useState("year")
const {data:dashboard}=useStudentDashboard(range)
const {data:courses}=useEnrolledCourses()
const {data:recommended}=useRecommendedCourses()
const {data:activityData}= useRecentActivity()
const activities = activityData?.activities || []
const recommendedCourses = recommended?.courses
const continueCourses  = courses?.enrolledCoursesProgress?.filter(course=>course.status==="in-progress")

const recentCourses = courses?.enrolledCoursesProgress
  ?.slice(0, 3)
// const graphData = dashboard?.graphData?.map(item=>({
//   ...item
//   ,watchedTime:item?.watchedTime/3600
// }))

  return (
    <div className='w-full min-h-screen bg-page px-2  py-6 md:px-8 md:py-8 flex flex-col gap-5 '>
      <DashboardPageHeader
        title={`Welcome back, ${user?.firstName || 'Learner'}`}
        description='Manage your learning, track your progress, and keep growing.'
      />

      <section className='grid grid-cols-2  lg:grid-cols-4 gap-2'>
        <DashboardStat
          title='Enrolled Courses'
          dataValue={dashboard?.enrolledCourses?.length || 0}
          icon={<HiOutlineBookOpen className='text-xl text-primary' />}
          growth='10%'
        />

        <DashboardStat
          title='Completed Courses'
          dataValue={dashboard?.completedCourses?.length||0}
          icon={<HiOutlineCheckBadge className='text-xl text-success' />}
          growth='10%'
        />

        <DashboardStat
          title='Learning Hours'
          dataValue={formatTime( dashboard?.totalWatchedTime)}
          icon={<PiClockUser className='text-xl text-accent' />}
          growth='10.8%'
        />

        <DashboardStat
          title='Certificates Earned'
          dataValue={dashboard?.certificateCount||0}
          icon={<SlBadge className='text-xl text-warning' />}
          growth='10%'
        />
      </section>

      <main className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
        <div className='lg:col-span-2 flex flex-col gap-3.5'>
          <LearningChart
            range={range}
            ranges={ranges}
            setRange={setRange}
            data={dashboard?.graphData}
          />

          <CoursesShowcase title={`enrolled Courses`} desc={`View your enrolled courses and keep track of your learning journey.`} courses={recentCourses || []} enrollment={true}  />
          <RecommendedCourses title={`Recommended for You`} desc={`Explore courses selected to help you build new skills and keep learning.`} courses={recommendedCourses || []}  />
        </div>

        <aside className='flex flex-col gap-3.5'>
          <AiCommingSoon />
          <StreakCard streakCount={dashboard?.currentStreak||0} streakData={dashboard?.streakData ||[]}/>
          <div  className='bg-card rounded-xl border border-border shadow-sm p-3 md:p-4  flex flex-col gap-5'>
  <div className='flex justify-between items-center gap-3'>
        <h2 className='text-base sm:text-lg font-semibold text-text font-heading'>
Continue Learning        </h2>

        <button
          type='button'
          className='shrink-0 text-xs sm:text-sm font-medium text-accent hover:text-primary transition-colors'
        >
          View All
        </button>
      </div> 
      {continueCourses?.length === 0 ?(
         <div className='py-8 text-center text-text-light text-sm border border-dashed border-border rounded-xl'>
No courses in progress
Start learning from your enrolled courses.       
 </div>
      ):(
        <>
      {continueCourses?.map(course=>(
      <EnrolledCourseCard enrollmentId={course._id}  course={course} key={course._id} />
      ))}
      </>
      )}
          </div>
          <RecentActivity activities={activities}/>
        </aside>
      </main>
    </div>
  )
}

export default Dashboard