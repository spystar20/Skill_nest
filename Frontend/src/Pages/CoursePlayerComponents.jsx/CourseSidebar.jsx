import { formatTime } from '@/utils/formatDuration'
import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { TiArrowSortedDown } from 'react-icons/ti'

const CourseSidebar = ({ curriculum, enrolledData, enrolledCourse, toggleModule, syllabus, totalLesson, completedLessons, currentCourse, setCurrentCourse }) => {
  return (
    <aside className="min-w-0 lg:sticky lg:top-5 lg:h-[calc(100vh-40px)]">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md">
        <div className="shrink-0 border-b border-border bg-page px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-heading text-lg font-semibold text-primary sm:text-xl">
                Course Content
              </h2>
              <p className="mt-1 font-body text-xs text-text-light sm:text-sm">
                {curriculum?.length || 0} modules
              </p>
            </div>

            <button className="shrink-0 rounded-full p-2 text-text-light transition hover:bg-border hover:text-primary">
              <RxCross2 className="text-lg" />
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-body text-xs font-medium text-text-light sm:text-sm">
                Course Progress
              </span>
              <span className="font-body text-xs font-semibold text-[var(--color-accent)] sm:text-sm">
                {enrolledData?.progress || 0}%
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full  bg-[var(--color-accent)] transition-all duration-500"
                style={{ width: `${enrolledData?.progress || 0}%` }}
              />
            </div>

            <p className="mt-2 font-body text-xs text-text-light">
              {enrolledCourse?.completedLessons?.length || 0} of {totalLesson || 0} lessons completed
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-3 sm:p-4">
          {curriculum?.map((section, i) => {
            const moduleKey = `module${i + 1}`

            return (
              <div
                key={section._id}
                className="overflow-hidden rounded-xl border border-border"
              >
                <button
                  onClick={() => toggleModule(moduleKey)}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition sm:px-4 sm:py-4 ${
                    syllabus[moduleKey]
                      ? 'bg-primary text-white'
                      : 'bg-card text-text hover:bg-page'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <TiArrowSortedDown
                      className={`shrink-0 text-xl transition-transform duration-300 ${
                        syllabus[moduleKey] ? 'rotate-180' : ''
                      }`}
                    />
                    <span className="truncate font-body text-sm font-semibold sm:text-base">
                      {section.title}
                    </span>
                  </span>

                  <span className="shrink-0 font-body text-xs sm:text-sm">
                    {formatTime(section.duration)}
                  </span>
                </button>

                {syllabus[moduleKey] && (
                  <div className="bg-page p-2">
                    <ul className="space-y-1">
                      {section?.lesson?.map((lesson) => {
                        const isCompleted = completedLessons.includes(lesson._id)
                        const isCurrent = currentCourse?._id === lesson._id

                        return (
                          <li
                            key={lesson._id}
                            onClick={() => setCurrentCourse(lesson)}
                            className={`group flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-3 transition sm:px-4 ${
                              isCurrent
                                ? 'bg-accent/10 text-accent'
                                : 'bg-card text-text-light hover:bg-border/50 hover:text-text'
                            }`}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <FaPlayCircle
                                className={`shrink-0 text-sm ${
                                  isCurrent
                                    ? 'text-accent'
                                    : 'text-text-light group-hover:text-accent'
                                }`}
                              />

                              <span className="truncate font-body text-sm font-medium">
                                {lesson.lesson}
                              </span>
                            </span>

                            <span className="flex shrink-0 items-center gap-2 sm:gap-3">
                              <span className="font-body text-xs text-text-light">
                                {formatTime(lesson.duration)}
                              </span>

                              {isCompleted && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-xs text-white">
                                  ✓
                                </span>
                              )}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

export default CourseSidebar