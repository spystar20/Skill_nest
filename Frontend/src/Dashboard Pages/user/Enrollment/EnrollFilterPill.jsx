import { useState } from 'react'

const EnrollFilterPill = ({ filter,setStatus }) => {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = () => {
    setIsActive(!isActive)
  }
  return (
    <button
      type='button'
      onClick={()=>{setStatus(filter),handleToggle}}
      className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium font-body border transition-all duration-200 ${
        isActive
          ? 'bg-primary text-white border-primary shadow-sm'
          : 'bg-card text-text-light border-border hover:border-accent hover:text-primary hover:bg-accent/5'
      }`}
    >
      {filter}
    </button>
  )
}

export default EnrollFilterPill