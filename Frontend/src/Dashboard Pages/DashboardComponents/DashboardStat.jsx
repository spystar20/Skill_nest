import React from 'react'
import { FaArrowTrendUp } from 'react-icons/fa6'
import { HiOutlineBookOpen } from 'react-icons/hi2'

const DashboardStat = ({title,icon,growth,dataValue}) => {
  return (
<div className='border border-gray-400/20 shadow-xs rounded-lg p-3 flex flex-col gap-2.5'>
<div className='flex gap-2 text-neutral-800'>
  <span className='rounded-sm text-3xl border w-8 h-8 p-1 items-center flex justify-center  border-black/20'>{icon}</span>
  <h6 className='text-xl'>{title}</h6>
</div>
<h5 className='font-medium text-3xl'>{dataValue}</h5>
<div className=' flex justify-between items-center'>
  <span className='flex gap-2 text-sm items-center px-2 py-1 bg-success/10 font-semibold border-success border rounded-sm text-success'><FaArrowTrendUp />{growth}</span>
  <p>more than last month</p>
</div>
</div>
  )
}

export default DashboardStat