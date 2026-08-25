import React, { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";

const ReviewModal = ({ course, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

      {/* MODAL */}
      <div className="relative w-full max-w-lg rounded-3xl bg-card p-6 shadow-2xl md:p-8">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-page text-text-light transition-all hover:scale-105 hover:text-text"
        >
          <FaTimes />
        </button>

        {/* HEADER */}
        <div className="mb-7 pr-10">
          <p className="font-body text-sm font-medium text-accent">
            Course Review
          </p>

          <h2 className="mt-1 font-heading text-2xl font-semibold text-text">
            Share your experience
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-text-light">
            Your feedback helps other students choose the right course.
          </p>
        </div>

        {/* COURSE */}
        <div className="mb-7 flex items-center gap-4 rounded-2xl bg-page p-3">
          <img
            src={course?.thumbnail}
            alt=""
            className="h-16 w-16 rounded-xl object-cover"
          />

          <div className="min-w-0">
            <h3 className="truncate font-heading font-semibold text-text">
              {course?.title}
            </h3>

            <p className="mt-1 text-xs text-text-light">
              Tell us what you thought about this course.
            </p>
          </div>
        </div>

        {/* RATING */}
        <div className="mb-6">
          <label className="font-heading text-sm font-semibold text-text">
            How would you rate this course?
          </label>

          <div className="mt-3 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="cursor-pointer transition-transform duration-200 hover:scale-110"
              >
                <FaStar
                  className={`text-2xl transition-colors duration-200 md:text-3xl ${
                    star <= rating
                      ? "text-accent"
                      : "text-text-light/25"
                  }`}
                />
              </button>
            ))}

            {rating > 0 && (
              <span className="ml-2 text-sm font-medium text-text-light">
                {rating}/5
              </span>
            )}
          </div>
        </div>

        {/* REVIEW */}
        <div>
          <div className="flex items-center justify-between">
            <label className="font-heading text-sm font-semibold text-text">
              Your review
            </label>

            <span className="text-xs text-text-light">
              Optional
            </span>
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What did you like about this course?"
            className="mt-3 min-h-32 w-full resize-none rounded-2xl border border-black/5 bg-page p-4 font-body text-sm text-text outline-none transition-all placeholder:text-text-light/60 focus:border-accent/30 focus:ring-2 focus:ring-accent/10"
          />
        </div>

        {/* ACTIONS */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full bg-page px-6 py-3 font-heading text-sm font-medium text-text transition-all hover:bg-black/5"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!rating}
            className={`rounded-full px-7 py-3 font-heading text-sm font-medium text-white transition-all ${
              rating
                ? "cursor-pointer bg-accent hover:scale-[0.98] hover:bg-primary-light"
                : "cursor-not-allowed bg-text-light/30"
            }`}
          >
            Submit Review
          </button>

        </div>

      </div>
    </div>
  );
};

export default ReviewModal;