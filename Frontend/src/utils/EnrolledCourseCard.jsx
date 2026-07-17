import React from "react";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";

const EnrolledCourseCard = ({
  className,
  LessonsLeft,
  img,
  course_name,
  instructor_name,
  progressPercent = 0,
  status = "in-progress", // not-started | in-progress | completed
}) => {
  return (
    <div
      className={`cards rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-3 gap-4 ${className}`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-xl group cursor-pointer">
        <img
          src={img}
          alt={course_name}
          className="aspect-[16/10] w-full object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

        <FaPlayCircle className="absolute text-5xl text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Top Badge */}

        {status === "not-started" && (
          <span className="absolute top-3 left-3 rounded-full bg-yellow-400 text-black px-3 py-1 text-xs font-medium">
            {LessonsLeft} Lessons
          </span>
        )}

        {status === "in-progress" && (
          <span className="absolute top-3 left-3 rounded-full bg-black/70 backdrop-blur text-white px-3 py-1 text-xs font-medium">
            {LessonsLeft} Left
          </span>
        )}

        {status === "completed" && (
          <span className="absolute top-3 left-3 rounded-full bg-green-600 text-white px-3 py-1 text-xs font-medium flex items-center gap-1">
            <FaCheckCircle />
            Completed
          </span>
        )}
      </div>

      {/* Content */}

      <div className="flex flex-col gap-4">

        <div>
          <h2 className="font-semibold text-lg line-clamp-2">
            {course_name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            By {instructor_name}
          </p>
        </div>

        {/* NOT STARTED */}

        {status === "not-started" && (
          <>
            <p className="text-sm text-gray-500">
              Ready to begin your learning journey.
            </p>

            <button className="rounded-full bg-[#0A1931] text-white py-2.5 font-medium hover:bg-[#13284b] transition">
              Start Learning
            </button>
          </>
        )}

        {/* IN PROGRESS */}

        {status === "in-progress" && (
          <>
            <div>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">
                  Progress
                </span>

                <span className="font-semibold text-[#0A1931]">
                  {progressPercent}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0A1931] transition-all duration-500"
                  style={{
                    width: `${progressPercent}%`,
                  }}
                />
              </div>
            </div>

            <button className="rounded-full bg-[#0A1931] text-white py-2.5 font-medium hover:bg-[#13284b] transition">
              Continue Learning
            </button>
          </>
        )}

        {/* COMPLETED */}

        {status === "completed" && (
          <>
            <div>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-600 font-medium">
                  Course Completed
                </span>

                <span className="font-semibold text-green-600">
                  100%
                </span>
              </div>

              <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-green-600 rounded-full" />
              </div>
            </div>

            <button className="rounded-full border border-[#0A1931] text-[#0A1931] py-2.5 font-medium hover:bg-[#0A1931] hover:text-white transition">
              Review Course
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourseCard;