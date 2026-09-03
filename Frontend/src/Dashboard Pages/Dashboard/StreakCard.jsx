import React, { useState } from 'react'
import { LuBadgeCheck, LuCircle } from 'react-icons/lu'

const StreakCard = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', "Fri", 'Sat']
    const [complete, setComplete] = useState(false)
    return (
        <div className='bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden p-5 flex flex-col gap-6'>
            <div className='flex justify-between items-center text-xl font-semibold font-heading'>
                <h2>Day Streak</h2>
                <span className='p-1 border-2 rounded-lg'>🔥</span>
            </div>
            <div className='flex gap-4'>
                {days.map((day)=>(
                <div className=' flex flex-col gap-3 items-center'>
                    {complete === true ? (<span className='text-2xl p-1 bg-accent text-white rounded-full'><LuBadgeCheck /></span>
                    ) : (<span className='text-2xl p-1 bg-gray-300/60 text-black/50 rounded-full'><LuCircle /></span>)}

                    <h6 className='text-lg font-medium font-body'>{day}</h6>
                </div>
                ))}
            </div>
        </div>
    )
}

export default StreakCard