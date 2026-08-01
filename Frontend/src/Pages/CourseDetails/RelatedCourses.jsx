
import React from "react";
import { Link } from "react-router-dom";
import { LuSignal } from "react-icons/lu";
import { IoTime } from "react-icons/io5";
import { SiBookstack } from "react-icons/si";

const RelatedCourses = ({ courses, instructorName }) => {
  if (!courses?.length) return null;

  return (
    <section className="py-12">

      {/* Heading */}
      <div className="mb-7">
        <p className="text-sm font-medium text-button uppercase tracking-wide">
          Keep learning
        </p>

        <h2 className="mt-2 text-3xl font-heading font-bold text-[#0A1931]">
          More courses by {instructorName}
        </h2>

        <p className="mt-2 text-gray-500">
          Continue learning with more courses from this instructor.
        </p>
      </div>

      {/* Courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {courses.map((course) => (

          <Link
            key={course._id}
            to={`/course/${course._id}`}
            className="group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >

            {/* Thumbnail */}
            <div className="relative overflow-hidden">

              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Category */}
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-[#0A1931]">
                {course.category}
              </span>

            </div>

            {/* Content */}
            <div className="p-5">

              <h3 className="text-lg font-semibold font-heading text-[#0A1931] line-clamp-2 group-hover:text-button transition">
                {course.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {course.desc}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-500">

                <span className="flex items-center gap-1.5">
                  <SiBookstack className="text-button" />
                  {course.lessonCount} Lessons
                </span>

                <span className="flex items-center gap-1.5">
                  <IoTime className="text-button" />
                  {course.duration}
                </span>

                <span className="flex items-center gap-1.5">
                  <LuSignal className="text-button" />
                  {course.difficulty}
                </span>

              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t">

                <span className="text-xl font-bold text-button">
                  ₹{course.price}
                </span>

                <span className="text-sm font-medium text-[#0A1931] group-hover:text-button transition">
                  View course →
                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
};

export default RelatedCourses;

