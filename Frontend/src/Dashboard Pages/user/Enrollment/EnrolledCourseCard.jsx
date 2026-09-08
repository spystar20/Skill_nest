import React, { useState } from "react";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import { FaStar } from "react-icons/fa";
import { useDeleteReview } from "@/hooks/EnrollmentHooks/review/useReview";
import { toast } from "sonner";
import DashboardPageHeader from "@/Dashboard Pages/DashboardComponents/DashboardPageHeader";

const EnrolledCourseCard = ({ enrollmentId, className, reviewData, course, showReviewUi }) => {
  const { mutate: deleteReview } = useDeleteReview()
  const LessonsLeft = course?.courseId?.lessonCount - course?.completedLessons?.length

  const handleDeleteReview = () => {
    const course_id = course._id
    deleteReview({ enrollmentId, course_id }, {
      onSuccess: () => {
        toast.success("review deleted ")
      }
    })
  }

  const [showReview, setShowReview] = useState(false)

  return (
    <div
      className={`cards flex flex-col gap-2.5 rounded-xl border border-border bg-card p-2.5 max-w-xs shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
    >
      {/* Thumbnail */}
      <div className="group relative cursor-pointer overflow-hidden rounded-lg">
        <img
          src={course?.courseId?.thumbnail}
          alt={course?.courseId?.title}
          className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />

        <FaPlayCircle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white sm:text-3xl" />

        {/* Top Badge */}
        {course?.status === "not-started" && (
          <span className="absolute left-2 top-2 rounded-full bg-warning px-2 py-0.5 text-[10px] font-medium text-white">
            {LessonsLeft} Lessons
          </span>
        )}

        {course?.status === "in-progress" && (
          <span className="absolute left-2 top-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
            {LessonsLeft} Lessons Left
          </span>
        )}

        {course?.status === "completed" && (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[10px] font-medium text-white">
            <FaCheckCircle className="text-[10px]" />
            Completed
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="line-clamp-1 font-heading text-xs md:text-sm font-semibold text-text">
            {course?.courseId?.title}
          </h2>

          <p className="mt-0.5 font-body text-[11px] text-text-light">
            By "khushi"
          </p>
        </div>

        {/* NOT STARTED */}
        {course?.status === "not-started" && (
          <>
            <p className="font-body text-[11px] text-text-light line-clamp-1">
              Ready to begin your learning journey.
            </p>

            <Link
              to={`/courses/${course?.courseId?.title}/${enrollmentId}/learn`}
              className="w-full rounded-full bg-primary py-1.5 text-center font-body text-xs font-medium text-white transition hover:bg-primary-light"
            >
              Start Learning
            </Link>
          </>
        )}

        {/* IN PROGRESS */}
        {course?.status === "in-progress" && (
          <>
            <div>
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="font-body text-text-light">
                  Progress
                </span>

                <span className="font-body font-semibold text-accent">
                  {course?.progress}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{
                    width: `${course?.progress}%`,
                  }}
                />
              </div>
            </div>

            <Link
              to={`/courses/${course?.courseId?.title}/${enrollmentId}/learn`}
              className="w-full rounded-full bg-primary py-1.5 text-center font-body text-xs font-medium text-white transition hover:bg-primary-light"
            >
              Continue Learning
            </Link>
          </>
        )}

        {/* COMPLETED */}
        {course?.status === "completed" && (
          <>
            <div>
              <div className="mb-1 flex justify-between text-[11px]">
                <span className="font-body text-text-light">
                  Progress
                </span>

                <span className="font-body font-semibold text-success">
                  {course?.progress}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-success transition-all duration-500"
                  style={{
                    width: `${course?.progress}%`,
                  }}
                />
              </div>
            </div>

            {/* REVIEW SECTION */}
            {showReviewUi && (
              <>
                {reviewData === null ? (
                  <div className="rounded-lg bg-page p-2">
                    {/* No review yet */}
                    <div className="flex flex-col items-center justify-between gap-1.5">
                      <div className="text-center">
                        <p className="font-heading text-xs font-semibold text-text">
                          Course Review
                        </p>

                        <p className="mt-0.5 font-body text-[10px] text-text-light">
                          Share your experience with this course.
                        </p>
                      </div>

                      <button
                        onClick={() => setShowReview(true)}
                        className="shrink-0 rounded-full bg-accent px-3 py-1 font-body text-xs font-medium text-white transition-all hover:scale-[0.98] hover:bg-primary-light w-full"
                      >
                        Write Review
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* existing review */}
                    <div className="rounded-lg bg-page p-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-heading text-xs font-semibold text-text">Your Review</p>
                          <div className="mt-1 flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar key={star} className={`text-[10px] transition-colors ${star <= reviewData?.rating ? "text-accent" : "text-text-light/20"}`} />
                            ))}
                            <span className="ml-1 text-[10px] font-medium text-text-light">{reviewData?.rating}/5</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <button type="button" onClick={() => setShowReview(true)} className="rounded-full bg-card px-2 py-0.5 font-body text-[10px] font-medium text-text transition-all duration-200 hover:scale-[0.98] hover:bg-accent hover:text-white">Edit</button>
                          <button type="button" onClick={handleDeleteReview} className="rounded-full bg-card px-2 py-0.5 font-body text-[10px] font-medium text-text-light transition-all duration-200 hover:scale-[0.98] hover:bg-red-500 hover:text-white">Delete</button>
                        </div>
                      </div>
                      {reviewData?.review && (
                        <p className="mt-1 rounded-md bg-card p-1 font-body text-[11px] leading-tight text-text-light line-clamp-1">{reviewData.review}</p>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
            {showReview && (<ReviewModal course={course} isExistingReview={reviewData} onClose={() => setShowReview(false)} />)}
          </>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourseCard;