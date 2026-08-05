
import React from 'react'

const VideoPlayer = ({lesson,completedLessons,handleEnded,handlePrevious,disablePrev,handleNext,disableNext,handleMarkComplete}) => {
  const isCompleted = completedLessons.includes(lesson?._id)

  return (
    <div className="overflow-hidden rounded-xl bg-card p-2 shadow-md sm:p-4">
      <video
        className="aspect-video w-full rounded-lg bg-black object-contain"
        src={lesson?.videoUrl}
        controls
        autoPlay
        onEnded={handleEnded}
      />

      {/* LESSON NAVIGATION */}
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-sm sm:p-4">
        <button
          onClick={handlePrevious}
          disabled={disablePrev}
          className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm font-medium text-text transition hover:border-accent hover:bg-accent/10 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:py-2.5"
        >
          <span>←</span>
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={disableNext}
          className="flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:py-2.5"
        >
          <span>Next</span>
          <span>→</span>
        </button>
      </div>

      {/* LESSON STATUS */}
      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-sm font-semibold text-primary sm:text-base">
            {lesson?.lesson}
          </h3>

          <p className="mt-1 font-body text-xs text-text-light sm:text-sm">
            {isCompleted
              ? "You've completed this lesson."
              : "Finish this lesson and mark it as complete."}
          </p>
        </div>

        <button
          disabled={isCompleted}
          onClick={() => handleMarkComplete(lesson?._id)}
          className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-all sm:px-5 ${
            isCompleted
              ? "bg-success/10 text-success"
              : "bg-accent text-white hover:opacity-90"
          }`}
        >
          {isCompleted ? (
            <>
              <span>✓</span> Completed
            </>
          ) : (
            "Mark as complete"
          )}
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer

