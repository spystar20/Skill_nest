import { Link } from "react-router-dom"
import { FaHeart } from "react-icons/fa"
import { MdOutlineFavoriteBorder } from "react-icons/md"

import { useFetchWishlist } from "@/hooks/CoursesHooks/wishlist/useWishlist"
import ProjectCard from "@/Pages/Course/ProjectCard"
import DashboardPageHeader from "../DashboardComponents/DashboardPageHeader"

const Wishlist = () => {
  const { data: wishlistData, isLoading, isError } = useFetchWishlist()

  const courses = wishlistData?.courses || []

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-page px-2 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl">
          <DashboardPageHeader
            title="My Wishlist"
            description="Courses you've saved for later. Come back whenever you're ready to start learning."
          />

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-xl border border-border bg-card p-2.5 shadow-sm"
              >
                <div className="aspect-video animate-pulse rounded-lg bg-page" />

                <div className="space-y-3 p-2">
                  <div className="h-5 w-full animate-pulse rounded bg-page" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-page" />
                  <div className="h-8 w-1/3 animate-pulse rounded-full bg-page" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full bg-page px-2 py-6 md:px-8 md:py-8">
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error/10">
              <MdOutlineFavoriteBorder className="text-2xl text-error" />
            </div>

            <h2 className="font-heading text-xl font-semibold text-text md:text-2xl">
              Couldn't load your wishlist
            </h2>

            <p className="mt-2 font-body text-sm leading-relaxed text-text-light">
              Something went wrong while fetching your saved courses.
              Please try again later.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-page px-2 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">

        <DashboardPageHeader
          title="My Wishlist"
          description="Courses you've saved for later. Come back whenever you're ready to start learning."
        />

        {courses.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-text shadow-sm">
              {courses.length}{" "}
              {courses.length === 1 ? "Course" : "Courses"} saved
            </div>

            <span className="hidden text-sm text-text-light sm:block">
              Your saved courses
            </span>
          </div>
        )}

        {courses.length === 0 ? (
          <div className="mt-8 flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 text-center shadow-sm">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <MdOutlineFavoriteBorder className="text-4xl text-primary" />
            </div>

            <h2 className="font-heading text-2xl font-semibold text-text">
              Your wishlist is empty
            </h2>

            <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-text-light md:text-base">
              Save courses you're interested in and come back to them when
              you're ready to learn.
            </p>

            <Link
              to="/courses"
              className="mt-6 rounded-full bg-primary px-6 py-2.5 font-body text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-primary-light hover:scale-95"
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <ProjectCard
                key={course._id}
                course={course}
              />
            ))}
          </div>
        )}

        {courses.length > 0 && (
          <div className="mt-10 rounded-2xl border border-border bg-card px-6 py-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <FaHeart className="text-xl text-primary" />
            </div>

            <h3 className="font-heading text-xl font-semibold text-text">
              Keep exploring
            </h3>

            <p className="mx-auto mt-2 max-w-lg font-body text-sm leading-relaxed text-text-light">
              Found something else you want to learn? Explore more courses
              and save them to your wishlist.
            </p>

            <Link
              to="/courses"
              className="mt-5 inline-flex rounded-full bg-accent px-6 py-2.5 font-body text-sm font-medium text-white transition-all duration-300 hover:bg-primary-light hover:scale-95"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist