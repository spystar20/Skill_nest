
import React, { useState } from "react";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import { FaStar } from "react-icons/fa";
import { useDeleteReview } from "@/hooks/EnrollmentHooks/review/useReview";
import { toast } from "sonner";
import DashboardPageHeader from "@/Dashboard Pages/DashboardComponents/DashboardPageHeader";
const EnrolledCourseCard = ({ enrollmentId, className,reviewData,   course}) => {
  const {mutate:deleteReview}=useDeleteReview()
  const LessonsLeft = course?.courseId?.lessonCount - course?.completedLessons.length
  const handleDeleteReview = ()=>{
    const course_id = course._id
    deleteReview({enrollmentId,course_id},{
      onSuccess:()=>{
        toast.success("review deleted ")
      }
    })
  }
const [showReview,setShowReview]=useState(false)
  return (
    <div
      className={`cards flex flex-col gap-4 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* Thumbnail */}
      <div className="group relative cursor-pointer overflow-hidden rounded-xl">
        <img
          src={course?.courseId?.thumbnail}
          alt={course?.courseId?.title}
          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />

        <FaPlayCircle className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white sm:text-5xl" />

        {/* Top Badge */}
        {course?.status === "not-started" && (
          <span className="absolute left-3 top-3 rounded-full bg-warning px-3 py-1 text-xs font-medium text-white">
            {LessonsLeft} Lessons
          </span>
        )}

        {course?.status === "in-progress" && (
          <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {LessonsLeft} Lessons Left
          </span>
        )}

        {course?.status === "completed" && (
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
            {course?.courseId?.title}
          </h2>

          <p className="mt-1 font-body text-sm text-text-light">
            By "khushi"
          </p>
        </div>

        {/* NOT STARTED */}
        {course?.status === "not-started" && (
          <>
            <p className="font-body text-sm text-text-light">
              Ready to begin your learning journey.
            </p>

            <Link
              to={`/courses/${course?.courseId?.title}/${enrollmentId}/learn`}
              className="w-full rounded-full bg-primary py-2.5 text-center font-body font-medium text-white transition hover:bg-primary-light"
            >
              Start Learning
            </Link>
          </>
        )}

        {/* IN PROGRESS */}
        {course?.status === "in-progress" && (
          <>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-body text-text-light">
                  Progress
                </span>

                <span className="font-body font-semibold text-accent">
                  {course?.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-border">
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
              className="w-full rounded-full bg-primary py-2.5 text-center font-body font-medium text-white transition hover:bg-primary-light"
            >
              Continue Learning
            </Link>
          </>
        )}

        {/* COMPLETED */}
        {course?.status === "completed" && (
          <>
           <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-body text-text-light">
                  Progress
                </span>

                <span className="font-body font-semibold text-success">
                  {course?.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-success transition-all duration-500"
                  style={{
                    width: `${course?.progress}%`,
                  }}
                />
              </div>
            </div>
          {/* REVIEW SECTION */}
          {reviewData===null ? (
<div className="rounded-2xl bg-page p-4">

  {/* No review yet */}
  <div className="flex flex-col items-center justify-between gap-4">

    <div>
      <p className="font-heading text-sm font-semibold text-text">
        Course Review
      </p>

      <p className="mt-1 font-body text-xs text-text-light">
        Share your experience with this course.
      </p>
    </div>

    <button
      onClick={() => setShowReview(true)}
      className="shrink-0 rounded-full bg-accent px-4 py-2 font-body text-sm font-medium text-white  transition-all hover:scale-[0.98] hover:bg-primary-light w-full"  >
     Write Review
    </button>

  </div>

</div>
):(<>
         {/* existing review */}
        <div className="rounded-xl bg-page p-2">
  <div className="flex items-start justify-between gap-4">
    <div className="min-w-0">
      <p className="font-heading text-sm font-semibold text-text">Your Review</p>
      <div className="mt-2 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar key={star} className={`text-sm transition-colors ${star <= reviewData?.rating ? "text-accent" : "text-text-light/20"}`} />
        ))}
        <span className="ml-1 text-xs font-medium text-text-light">{reviewData?.rating}/5</span>
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-2">
      <button type="button" onClick={() => setShowReview(true)} className="rounded-full bg-card px-4 py-2 font-body text-xs font-medium text-text transition-all duration-200 hover:scale-[0.98] hover:bg-accent hover:text-white">Edit</button>
      <button type="button" onClick={handleDeleteReview} className="rounded-full bg-card px-4 py-2 font-body text-xs font-medium text-text-light transition-all duration-200 hover:scale-[0.98] hover:bg-red-500 hover:text-white">Delete</button>
    </div>
  </div>
  {reviewData?.review && (
    <p className=" rounded-xl bg-card p-1 font-body text-sm leading-relaxed text-text-light line-clamp-1 ">{reviewData.review}</p>
  )}
</div>
</>
        )} 
        
        
          {showReview &&(  <ReviewModal course={course} isExistingReview={reviewData} onClose={()=>setShowReview(false)}/>)}
          </>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourseCard;

