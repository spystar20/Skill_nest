import React from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { RiHome3Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const DashboardPageHeader = ({ title, description }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0A1931]" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm md:text-base text-[#6B7280]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {description}
          </p>
        )}
      </div>
  <Link
        to="/"
        className="w-9 h-9 hidden md:flex items-center justify-center rounded-lg border text-white border-[#E5E7EB] bg-black hover:text-[#0A1931] hover:bg-[#F8FAFC] hover:border-[#111827]/20 shadow-xs transition-all duration-200"
        title="Go to Home"
      >
        <RiHome3Line className="text-xl" />
      </Link>
    </div>
  )
}

export default DashboardPageHeader;
