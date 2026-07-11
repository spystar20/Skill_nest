import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const FilterChip = (
    {filter,onRemove}
) => {

  return (
           
 <button className={`px-3 mt-5 py-1.5 border-1 gap-1 shadow-xs flex items-center justify-center cursor-pointer hover:border-black border-black/30 rounded-full text-xs transition-all duration-200 ease-in ${filter ? 'opacity-100 translate-x-0':'opacity-0 -translate-x-3'}`}>{filter} <RxCross2 onClick={onRemove} className='text-sm mt-0.5'/></button>  )
}

export default FilterChip