import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import DashboardPageHeader from '../DashboardComponents/DashboardPageHeader'
import { HiOutlineBookOpen, HiOutlineCheckBadge } from "react-icons/hi2";
import { SlBadge } from "react-icons/sl";
import DashboardStat from '../DashboardComponents/DashboardStat';
import { PiClockUser } from 'react-icons/pi';
import LearningChart from '../DashboardComponents/LearningChart';
import AiCommingSoon from '../DashboardComponents/AiCommingSoon';
import StreakCard from './StreakCard';

const Dashboard = () => {
  const { user } = useAuth()
  const [period, setPeriod] = useState("week")
  const periods = ["week", "month", "year"]

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] px-4 py-6 md:px-8 md:py-8 flex flex-col gap-8">
      <DashboardPageHeader 
        title={`Welcome back, ${user?.firstName || 'Learner'}`} 
        description="Manage your learning, track your progress, and keep growing."
      />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStat 
          title="Ongoing Courses"  
          dataValue="5" 
          icon={<HiOutlineBookOpen className="text-xl text-[#0A1931]" />} 
          growth="10%"
        />
        <DashboardStat 
          title="Completed Courses" 
          dataValue="8"  
          icon={<HiOutlineCheckBadge className="text-xl text-[#6F8F5F]" />} 
          growth="10%"
        />
        <DashboardStat 
          title="Learning Hours" 
          dataValue="62.7" 
          icon={<PiClockUser className="text-xl text-[#7C8FD6]" />} 
          growth="10.8%"
        />
        <DashboardStat 
          title="Certificates Earned" 
          dataValue="8" 
          icon={<SlBadge className="text-xl text-[#F59E0B]" />} 
          growth="10%"
        />
      </section>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <LearningChart period={period} periods={periods} setPeriod={setPeriod} />
        </div>
   <aside className='flex flex-col gap-5'>
    <AiCommingSoon/>
    <StreakCard/>
   </aside>
      </main>
    </div>
  )
}

export default Dashboard;
