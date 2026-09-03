import React from 'react'
import { LuBookOpenCheck, LuTrophy } from 'react-icons/lu'

const RecentActivity = () => {
  const activities = [
    {
      icon: <LuBookOpenCheck />,
      title: 'Completed a lesson',
      course: 'React Hooks',
      time: '2 hours ago'
    },
    {
      icon: <LuBookOpenCheck />,
      title: 'Completed a lesson',
      course: 'Node.js Authentication',
      time: 'Yesterday'
    },
    {
      icon: <LuTrophy />,
      title: 'Earned a certificate',
      course: 'JavaScript Fundamentals',
      time: '2 days ago'
    }
  ]

  return (
    <div className='bg-card rounded-xl border border-border shadow-sm p-3 md:p-4  flex flex-col gap-5'>

      {/* Header */}
      <div className='flex justify-between items-center gap-3'>
        <h2 className='text-base sm:text-lg font-semibold text-text font-heading'>
          Recent Activity
        </h2>

        <button
          type='button'
          className='shrink-0 text-xs sm:text-sm font-medium text-accent hover:text-primary transition-colors'
        >
          View All
        </button>
      </div>

      {/* Activities */}
      <div className='flex flex-col gap-4'>
        {activities.map((activity, index) => (
          <div
            key={index}
            className='flex items-start gap-3'
          >
            <span className='shrink-0 p-2 rounded-lg bg-accent/10 text-accent text-base sm:text-lg'>
              {activity.icon}
            </span>

            <div className='min-w-0 flex-1'>
              <p className='text-xs sm:text-sm font-medium text-text truncate'>
                {activity.title}
              </p>

              <p className='text-[11px] sm:text-xs text-text-light mt-0.5 truncate'>
                {activity.course}
              </p>

              <p className='text-[11px] sm:text-xs text-text-light mt-1'>
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default RecentActivity