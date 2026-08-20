import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaTrash } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { PiBookDuotone } from "react-icons/pi";
import { FiTrendingUp } from "react-icons/fi";
import { CiClock1 } from "react-icons/ci";

import { formatTime } from "@/utils/formatDuration";
import { useFetchWishlist } from "@/hooks/CoursesHooks/wishlist/useWishlist";
import ProjectCard from "@/Pages/Course/ProjectCard";


const Wishlist = () => {

const {data:wishlistData,isLoading,isError}  = useFetchWishlist()
console.log(wishlistData)
  const courses = wishlistData?.courses || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-page px-4 pb-20 pt-28 md:px-8 lg:px-12 ">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-card" />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl bg-card shadow-sm"
              >
                <div className="aspect-video animate-pulse bg-page" />
                <div className="space-y-3 p-5">
                  <div className="h-5 animate-pulse rounded bg-page" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-page" />
                  <div className="h-10 animate-pulse rounded-full bg-page" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-page px-4 pb-20 pt-28 md:ml-64 md:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center">
          <div className="rounded-3xl bg-card p-8 text-center shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-text">
              Couldn't load your wishlist
            </h2>

            <p className="mt-2 text-sm text-text-light">
              Something went wrong while fetching your saved courses.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page px-4 pb-20   md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 md:mb-10">
          <Link
            to="/courses"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-text-light transition-all hover:gap-3 hover:text-primary"
          >
            <FaArrowLeft className="text-xs" />
            Continue browsing
          </Link>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-sm">
                <FaHeart className="text-primary" />
              </div>

              <h1 className="font-heading text-3xl font-semibold text-text md:text-5xl">
                My Wishlist
              </h1>
            </div>

            <p className="max-w-2xl font-body text-sm text-text-light md:text-base">
              Courses you've saved for later. Come back whenever you're ready
              to start learning.
            </p>
          </div>
        </div>

        {/* COUNT */}
        {courses.length > 0 && (
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-card px-4 py-2 text-sm font-medium text-text shadow-sm">
              {courses.length}{" "}
              {courses.length === 1 ? "Course" : "Courses"} saved
            </span>

            <span className="hidden text-sm text-text-light sm:block">
              Your saved courses
            </span>
          </div>
        )}

        {/* EMPTY STATE */}
        {courses.length === 0 ? (
          <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl bg-card px-6 text-center shadow-sm">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-page">
              <MdOutlineFavoriteBorder className="text-5xl text-text-light" />
            </div>

            <h2 className="font-heading text-2xl font-semibold text-text md:text-3xl">
              Your wishlist is empty
            </h2>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-text-light md:text-base">
              Save courses you're interested in and come back to them when
              you're ready to learn.
            </p>

            <Link
              to="/courses"
              className="mt-7 rounded-full bg-accent px-7 py-3 font-heading text-sm font-medium text-white transition-all duration-300 hover:scale-95 hover:bg-primary-light"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          /* COURSE GRID */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <ProjectCard course={course} />
            ))}
          </div>
        )}

        {/* BOTTOM */}
        {courses.length > 0 && (
          <div className="mt-10 rounded-3xl bg-card p-6 text-center shadow-sm md:p-8">
            <FaHeart className="mx-auto mb-3 text-2xl text-primary" />

            <h3 className="font-heading text-xl font-semibold text-text">
              Keep exploring
            </h3>

            <p className="mx-auto mt-1 max-w-lg text-sm text-text-light">
              Found something else you want to learn? Explore more courses and
              add them to your wishlist.
            </p>

            <Link
              to="/courses"
              className="mt-5 inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-95 hover:bg-primary-light"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;