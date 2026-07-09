import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const FilterComponent = ({title,optionArray,
    setFilter,
    filterKey}) => {
 const   [open,setOpen]= useState(false)
   const handleToggle = ()=>{
    setOpen(!open)
   } 
  return (
<div  className=' font-[Outfit] w-full '>
 <h2 onClick={handleToggle} className='text-lg font-semibold mb-3 flex justify-between items-center '>{title} <span><MdOutlineKeyboardArrowDown className={`text-2xl text-gray-600 rotate-0 transition-all cursor-pointer ease-out ${open ? 'rotate-180' : 'rotate-0'}`} /></span></h2> 
 {
  open && optionArray?.map((option,index)=>(
    <React.Fragment key={index}>
    <div className='flex items-center pt-2 hide '>
     <label className='flex justify-center items-center gap-1'>
      <input type="radio"  value={option} onChange={(e)=>setFilter((prev)=>({...prev,[filterKey]:e.target.value}))}  className='w-3 cursor-pointer border-none h-3 accent-black' name="" id="" />
      {option}
     </label>
    </div>
    </React.Fragment>
  ))
 }
</div>  )
}

export default FilterComponent