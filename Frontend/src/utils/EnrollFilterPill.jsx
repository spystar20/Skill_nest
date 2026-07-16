import React, { useState } from 'react'

const EnrollFilterPill = ({filter}) => {
  const [isActive,setIsActive]=useState(false)
  const handleToggle = ()=>{
    setIsActive(!isActive)
  }
  return (
    <div onClick={handleToggle} className={`cursor-pointer hover:bg-neutral-400 hover:scale-95 px-3 py-1 ${isActive? 'bg-neutral-400/85 shadow-none scale-95':'bg-neutral-200 shadow-sm scale-100'} rounded-full font-semibold text-base capitalize`}>
{filter}
    </div>
  )
}

export default EnrollFilterPill