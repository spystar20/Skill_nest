import React from 'react'
import { FiTrendingUp, FiUser } from 'react-icons/fi'

const EnrollmentSummary = ({enrollmentTotal,newStudentsCount,returningStudentsCount}) => {
    const newPercentage = Math.round((newStudentsCount/enrollmentTotal)*100)
    const returningPercentage = Math.round((newStudentsCount/enrollmentTotal)*100)
  return (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-text">
                Enrollment Summary
              </h3>
              <p className="mt-1 font-body text-xs text-text-light">
                Student growth this period.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FiUser />
            </div>
          </div>

          <div className="mt-6">
            <p className="font-heading text-3xl font-bold text-text">
{enrollmentTotal}            </p>

            <p className="mt-1 flex items-center gap-1 font-body text-xs font-medium text-success">
              <FiTrendingUp />
              8.4% increase
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center justify-between font-body text-xs">
                <span className="text-text-light">New Students</span>
                <span className="font-medium text-text">{newStudentsCount}</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-page">
                <div style={{width:`${newPercentage}%`}} className="h-full  rounded-full bg-primary" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between font-body text-xs">
                <span className="text-text-light">Returning Students</span>
                <span className="font-medium text-text">{returningStudentsCount}</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-page">
                <div style={{width:`${returningPercentage}%`}} className="h-full  rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </div>  )
}

export default EnrollmentSummary