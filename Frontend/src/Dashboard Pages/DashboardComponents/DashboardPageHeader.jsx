import React from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const DashboardPageHeader = ({title,description}) => {
  return (
  <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-text">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm md:text-base text-text-light font-body">
            {description}
          </p>
        )}
      </div>

      <Link
        to="/"
        className="hidden md:flex items-center gap-2 font-body  hover:scale-105 transition-all duration-300"  >
        <FaAngleDoubleLeft />
        <span>Back to Home</span>
      </Link>
    </div>  )
}

export default DashboardPageHeader