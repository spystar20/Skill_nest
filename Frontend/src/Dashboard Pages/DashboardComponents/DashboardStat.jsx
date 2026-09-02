import React from 'react'
import { FaArrowTrendUp } from 'react-icons/fa6'

const DashboardStat = ({ title, icon, growth, dataValue }) => {
  return (
    <div className='border border-[#E5E7EB] bg-white shadow-sm rounded-lg p-4 flex flex-col gap-3'>
      <div className='flex gap-2.5 items-center text-[#111827]'>
        <span className='rounded-md text-xl border w-9 h-9 items-center flex justify-center border-[#E5E7EB] bg-[#F8FAFC] text-[#0A1931]'>
          {icon}
        </span>
        <h6 className='text-base font-semibold' style={{ fontFamily: 'Outfit, sans-serif' }}>
          {title}
        </h6>
      </div>
      <h5 className='font-bold text-3xl text-[#0A1931]' style={{ fontFamily: 'Outfit, sans-serif' }}>
        {dataValue}
      </h5>
      <div className='flex justify-between items-center mt-1'>
        <span className='flex gap-1.5 text-xs items-center px-2 py-1 bg-[#6F8F5F]/10 font-semibold border border-[#6F8F5F]/20 rounded-md text-[#6F8F5F]' style={{ fontFamily: 'Inter, sans-serif' }}>
          <FaArrowTrendUp />
          {growth}
        </span>
        <p className='text-xs text-[#6B7280]' style={{ fontFamily: 'Inter, sans-serif' }}>
          more than last month
        </p>
      </div>
    </div>
  )
}

export default DashboardStat;
