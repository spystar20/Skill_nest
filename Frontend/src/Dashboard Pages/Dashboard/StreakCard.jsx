import React, { useState } from 'react'
import { LuBadgeCheck, LuCircleCheck, LuFlame } from 'react-icons/lu'

const StreakCard = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const [completedDays, setCompletedDays] = useState({
    Sun: true,
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: false,
    Sat: false
  })

  const toggleDay = (day) => {
    setCompletedDays((prev) => ({
      ...prev,
      [day]: !prev[day]
    }))
  }

  const streakCount = Object.values(completedDays).filter(Boolean).length

  return (
    <div className='bg-card rounded-xl border border-border shadow-sm p-3 md:p-5 flex flex-col gap-5 sm:gap-6 transition-all'>

      {/* Header */}
      <div className='flex justify-between items-center gap-3'>
        <div className='flex items-center gap-2 min-w-0'>
          <span className='shrink-0 p-2 bg-accent/10 text-accent rounded-xl text-lg'>
            <LuFlame />
          </span>

          <h2 className='text-base sm:text-lg font-semibold text-primary font-heading truncate'>
            Daily Streak
          </h2>
        </div>

        <span className='shrink-0 px-2.5 sm:px-3 py-1 bg-accent/10 text-accent text-[11px] sm:text-xs font-semibold rounded-full'>
          Active
        </span>
      </div>

      {/* Streak Count */}
      <div className='flex items-baseline gap-2 flex-wrap'>
        <h3 className='text-3xl sm:text-4xl font-extrabold text-primary font-heading tracking-tight'>
          {streakCount}
        </h3>

        <p className='text-xs sm:text-sm font-medium text-text-light'>
          days completed this week
        </p>
      </div>

      {/* Days */}
      <div className='grid grid-cols-7 gap-1 sm:gap-2 pt-2 border-t border-border'>
        {days.map((day) => {
          const isComplete = completedDays[day]

          return (
            <button
              key={day}
              type='button'
              onClick={() => toggleDay(day)}
              className='flex flex-col items-center gap-1.5 sm:gap-2 py-2 px-0.5 sm:px-1 rounded-xl transition-all hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-accent/20'
            >
              <span className='text-[10px] sm:text-xs font-semibold text-text-light font-body uppercase tracking-wide sm:tracking-wider'>
                {day}
              </span>

              {isComplete ? (
                <span className='text-xl sm:text-2xl text-accent transition-transform active:scale-95'>
                  <LuBadgeCheck />
                </span>
              ) : (
                <span className='text-xl sm:text-2xl text-neutral-300 transition-transform active:scale-95 hover:text-neutral-400'>
                  <LuCircleCheck />
                </span>
              )}
            </button>
          )
        })}
      </div>

    </div>
  )
}

export default StreakCard