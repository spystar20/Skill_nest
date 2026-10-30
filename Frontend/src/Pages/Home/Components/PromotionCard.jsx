import React from 'react'

const PromotionCard = ({stat,title,Icon}) => {
  return (
   <div className='flex flex-wrap border-2 opacity-95 hover:opacity-100  border-rose-200 inset-shadow-rose-300 inset-shadow-2xs  cursor-pointer shadow-md shadow-black hover:-translate-y-4 -translate-y-0 transition-all justify-start py-2 md:p-5 rounded-lg md:rounded-xl  items-center gap-2 bg-white capitalize duration-300 ease-in hover:scale-105 '>
            <span>
              <Icon className=' text-4xl p-1 md:mr-2.5 md:p-3 md:text-6xl  font-light icon' />
            </span>
            <span className='flex justify-start flex-col ' >
              <span className=' text-xl md:text-3xl font-semibold'>{stat}</span>
              <span className='text-sm  md:text-lg font-light'>{title}</span>
            </span>
          </div>  )
}

export default PromotionCard