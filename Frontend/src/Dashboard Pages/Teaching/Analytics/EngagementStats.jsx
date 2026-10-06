import React from 'react'

const EngagementStats = ({averageLearningTime,lessonCompleted,averageCompletion,InprogressLearner}) => {
  return (
  <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-page p-4">
              <p className="font-body text-xs text-text-light">
                Lessons Completed
              </p>
              <p className="mt-1 font-heading text-xl font-bold text-text">
               {lessonCompleted}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-page p-4">
              <p className="font-body text-xs text-text-light">
                Avg. Completion
              </p>
              <p className="mt-1 font-heading text-xl font-bold text-text">
               {averageCompletion}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-page p-4">
              <p className="font-body text-xs text-text-light">
In Progress Learner              </p>
              <p className="mt-1 font-heading text-xl font-bold text-text">
{InprogressLearner}              </p>
            </div>

            <div className="rounded-xl border border-border bg-page p-4">
              <p className="font-body text-xs text-text-light">
                Avg. Learning Time
              </p>
              <p className="mt-1 font-heading text-xl font-bold text-text">
                {averageLearningTime}
              </p>
            </div>
          </div>  )
}

export default EngagementStats