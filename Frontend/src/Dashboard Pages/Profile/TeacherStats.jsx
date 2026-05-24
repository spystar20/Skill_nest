import React from 'react'

const TeacherStats = () => {
  return (
   <ul className='bg-[#0a1931] text-white rounded-2xl p-6 flex flex-col gap-4 shadow-lg'>
  <li className='flex justify-between items-center border-b border-white/10 pb-3'>
    <span className='text-white/70'>Published Courses</span>
    <span className='text-xl font-bold'>12</span>
  </li>

  <li className='flex justify-between items-center border-b border-white/10 pb-3'>
    <span className='text-white/70'>Total Students
</span>
    <span className='text-xl font-bold'>8</span>
  </li>

  <li className='flex justify-between items-center border-b border-white/10 pb-3'>
    <span className='text-white/70'>Reviews
</span>
    <span className='text-xl font-bold'>5</span>
  </li>

  <li className='flex justify-between items-center'>
    <span className='text-white/70'>Rating</span>
    <span className='text-xl font-bold'>42</span>
  </li>
</ul>
  )
}

export default TeacherStats