import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import DashboardPageHeader from '../DashboardComponents/DashboardPageHeader'
import { HiOutlineBookOpen, HiOutlineCheckBadge } from "react-icons/hi2";
import { SlBadge } from "react-icons/sl";
import DashboardStat from '../DashboardComponents/DashboardStat';
import { PiClockUser } from 'react-icons/pi';
import LearningChart from '../DashboardComponents/LearningChart';

const Dashboard = () => {
  const {user}=useAuth()
  const [period, setPeriod] = useState("week")
  const periods = ["week", "month", "year"]
  return (
<div className="w-full min-h-screen bg-neutral-200 px-3 py-4 md:px-8 md:py-6 flex flex-col gap-6">
  <DashboardPageHeader title={`Welcome back, ${user?.firstName}`} description="Manage your learning, track your progress, and keep growing."/>
  {/* stat cards */}
  <div className='bg-white/90 p-5 rounded-lg gap-8 flex flex-col'>
    {/* stat cards */}

  <div className=' grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
<DashboardStat title={`Ongoing Courses`}  dataValue="5" icon={<HiOutlineBookOpen/>} growth={`10%`}/>
<DashboardStat title={`Completed Courses`} dataValue={`8`}  icon={<HiOutlineCheckBadge />} growth={`10%`}/>
<DashboardStat title={`Learning Hours`} dataValue={"6"} icon={<PiClockUser/>} growth={`10%`}/>
<DashboardStat title={`Certificate Earned`} dataValue={`8`} icon={<SlBadge/>} growth={`10%`}/>

  </div>

  <div className=''>
    <div className='grid grid-cols-[3fr_1.5fr]'>
<LearningChart period={period} periods={periods} setPeriod={setPeriod}/>
  </div>
</div>
  </div>
    </div>
  )
}

export default Dashboard