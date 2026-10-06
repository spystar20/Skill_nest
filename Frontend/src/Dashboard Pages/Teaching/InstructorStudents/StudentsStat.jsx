import React from 'react'
import { FiBookOpen, FiCheckCircle, FiTrendingUp, FiUsers } from 'react-icons/fi'

const StudentsStat = ({totalEnrollments,inProgressLearners,completedEnrollments,averageProgres}) => {
     const stats = [
    {
      title: 'Total Students',
      value: totalEnrollments,
      icon: FiUsers,
      color: 'text-primary bg-primary/10'
    },
    {
      title: 'Active Students',
      value: inProgressLearners,
      icon: FiTrendingUp,
      color: 'text-success bg-success/10'
    },
    {
      title: 'Completed',
      value: completedEnrollments,
      icon: FiCheckCircle,
      color: 'text-accent bg-accent/10'
    },
    {
      title: 'Avg. Progress',
      value: `${averageProgres}%`,
      icon: FiBookOpen,
      color: 'text-warning bg-warning/10'
    }
  ]

  return (
<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md sm:p-5"
            >
              <div>
                <p className="font-body text-xs font-medium text-text-light">
                  {stat.title}
                </p>

                <h3 className="mt-1 font-heading text-2xl font-bold text-text">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}
              >
                <Icon className="text-xl" />
              </div>
            </div>
          )
        })}
      </div>  )
}

export default StudentsStat