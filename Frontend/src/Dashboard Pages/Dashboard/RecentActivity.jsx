import { activityIcons, activityMessages } from '@/utils/utils.activity'
import React from 'react'
import { LuBookOpenCheck, LuTrophy } from 'react-icons/lu'

const RecentActivity = ({activities}) => {

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
       {activities.map((activity) => {
          const Icon = activityIcons[activity.type] || LuBookOpenCheck
return (
  <div
    key={activity._id}
    className='flex items-start gap-3'
  >
    <span className='shrink-0 p-2 rounded-lg bg-accent/10 text-accent text-base sm:text-lg'>
      <Icon />
    </span>

    <div className='min-w-0 flex-1'>
      <p className='text-xs sm:text-sm font-medium text-text truncate'>
        {activityMessages[activity.type]}
      </p>

      {activity.courseId && (
        <p className='text-[11px] sm:text-xs text-text-light mt-0.5 truncate'>
          {activity.courseId.title}
        </p>
      )}

      <p className='text-[11px] sm:text-xs text-text-light mt-1'>
        {new Date(activity.createdAt).toLocaleString()}
      </p>
    </div>
  </div>
)
})}
      </div>

    </div>
  )
}

export default RecentActivity