import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import DashboardPageHeader from '../DashboardComponents/DashboardPageHeader'
import { HiOutlineBookOpen, HiOutlineCheckBadge } from "react-icons/hi2";
import { SlBadge } from "react-icons/sl";
import DashboardStat from '../DashboardComponents/DashboardStat';
import { PiClockUser } from 'react-icons/pi';
import LearningChart from '../DashboardComponents/LearningChart';

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
        <aside className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm flex flex-col gap-4">
          <div className="border-b border-[#E5E7EB] pb-3">
            <h3 className="text-md font-semibold text-[#0A1931]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Quick Stats Overview
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
              Current tracking window selection.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="flex justify-between items-center py-1">
              <span className="text-[#6B7280]">Active Filter</span>
              <span className="font-semibold text-[#0A1931] bg-[#0A1931]/5 px-2 py-0.5 rounded capitalize text-xs">
                {period}ly tracking
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[#6B7280]">System Status</span>
              <span className="font-medium text-[#6F8F5F] flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 bg-[#6F8F5F] rounded-full animate-pulse"></span>
                Fully Synchronized
              </span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default Dashboard;
