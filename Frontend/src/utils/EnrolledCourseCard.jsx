
import React from "react";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const EnrolledCourseCard = ({
  enrollmentId,
  className,
  LessonsLeft,
  img,
  course_name,
  instructor_name,
  progressPercent = 0,
  status = "in-progress",
}) => {
  return (
    <div
      className={`cards flex flex-col gap-4 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* Thumbnail */}
      <div className="group relative cursor-pointer overflow-hidden rounded-xl">
        <img
          src={img}
          alt={course_name}
          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />

        <FaPlayCircle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white sm:text-5xl" />

        {/* Top Badge */}
        {status === "not-started" && (
          <span className="absolute left-3 top-3 rounded-full bg-warning px-3 py-1 text-xs font-medium text-white">
            {LessonsLeft} Lessons
          </span>
        )}

        {status === "in-progress" && (
          <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {LessonsLeft} Left
          </span>
        )}

        {status === "completed" && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-success px-3 py-1 text-xs font-medium text-white">
            <FaCheckCircle />
            Completed
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="line-clamp-2 font-heading text-lg font-semibold text-text">
            {course_name}
          </h2>

          <p className="mt-1 font-body text-sm text-text-light">
            By {instructor_name}
          </p>
        </div>

        {/* NOT STARTED */}
        {status === "not-started" && (
          <>
            <p className="font-body text-sm text-text-light">
              Ready to begin your learning journey.
            </p>

            <Link
              to={`/courses/${course_name}/${enrollmentId}/learn`}
              className="w-full rounded-full bg-primary py-2.5 text-center font-body font-medium text-white transition hover:bg-primary-light"
            >
              Start Learning
            </Link>
          </>
        )}

        {/* IN PROGRESS */}
        {status === "in-progress" && (
          <>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-body text-text-light">
                  Progress
                </span>

                <span className="font-body font-semibold text-accent">
                  {progressPercent}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />
              </div>
            </div>

            <Link
              to={`/courses/${course_name}/${enrollmentId}/learn`}
              className="w-full rounded-full bg-primary py-2.5 text-center font-body font-medium text-white transition hover:bg-primary-light"
            >
              Continue Learning
            </Link>
          </>
        )}

        {/* COMPLETED */}
        {status === "completed" && (
          <>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-body font-medium text-success">
                  Course Completed
                </span>

                <span className="font-body font-semibold text-success">
                  100%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-success/10">
                <div className="h-full w-full rounded-full bg-success" />
              </div>
            </div>

            <Link
              to={`/courses/${course_name}/${enrollmentId}/learn`}
              className="w-full rounded-full border border-primary py-2.5 text-center font-body font-medium text-primary transition hover:bg-primary hover:text-white"
            >
              Review Course
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourseCard;

