import React from 'react'
import { FiTrendingUp } from 'react-icons/fi'

const StatCard = ({title,value,Icon , color}) => {
  return (
         <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-5"
            >
              <div className="min-w-0">
                <p className="font-body text-xs font-medium text-text-light">
                  {title}
                </p>

                <h3 className="mt-1 font-heading text-2xl font-bold text-text">
                  {value}
                </h3>

                <span
                  className={`mt-1 inline-flex items-center gap-1 font-body text-xs font-medium ${
                    title === 'Average Rating'
                      ? 'text-warning'
                      : 'text-success'
                  }`}
                >
                  {title === 'Average Rating' ? (
                   5
                  ) : (
                    <>
                      <FiTrendingUp />
                      {6}
                    </>
                  )}
                </span>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${color}`}
              >
                <Icon className="text-xl" />
              </div>
            </div>
  )
}

export default StatCard