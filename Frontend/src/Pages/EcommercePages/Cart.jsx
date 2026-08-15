import React from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaTrash,
  FaArrowLeft,
  FaLock,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
import { PiBookDuotone } from "react-icons/pi";
import { FiTrendingUp } from "react-icons/fi";

const mockCartItems = [
  {
    id: "1",
    course_name: "MERN Stack Development",
    course_desc:
      "Build full-stack applications using MongoDB, Express, React and Node.js.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    instructor_name: "John Doe",
    instructor_img:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
    rating: 4.8,
    chapters: 24,
    duration: 1820,
    level: "Intermediate",
    price: 799,
  },
  {
    id: "2",
    course_name: "Modern JavaScript",
    course_desc:
      "Master modern JavaScript concepts and build stronger frontend applications.",
    img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    instructor_name: "Sarah Wilson",
    instructor_img:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    rating: 4.9,
    chapters: 18,
    duration: 1260,
    level: "Beginner",
    price: 599,
  },
  {
    id: "3",
    course_name: "Advanced React",
    course_desc:
      "Learn advanced React patterns, state management and production architecture.",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    instructor_name: "Alex Morgan",
    instructor_img:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    rating: 4.7,
    chapters: 21,
    duration: 1500,
    level: "Advanced",
    price: 899,
  },
];

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};

const Cart = () => {
  const cartItems = mockCartItems;

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

  const discount = 0;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-page px-4 pb-20 pt-32 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-10">
          <Link
            to="/courses"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-text-light transition-colors hover:text-primary"
          >
            <FaArrowLeft className="text-xs" />
            Continue browsing
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl font-semibold text-text md:text-5xl">
              Your Cart
            </h1>

            <p className="font-body text-sm text-text-light md:text-base">
              Courses you've selected for your learning journey.
            </p>
          </div>
        </div>

        {/* ================= CART CONTENT ================= */}
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">

            {/* ================= LEFT ================= */}
            <div>

              {/* COURSE COUNT */}
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-card px-4 py-2 text-sm font-medium text-text shadow-sm">
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "Course" : "Courses"}
                </span>

                <span className="text-sm text-text-light">
                  Ready for checkout
                </span>
              </div>

              {/* COURSE LIST */}
              <div className="flex flex-col gap-5">
                {cartItems.map((course) => (
               <div key={course.id} className={`cards rounded-lg md:rounded-4xl grid grid-cols-3 gap-6 p-2 md:p-5 `}>
                      <div className="relative group cursor-pointer">
                        <img src={course.img} className="aspect-square object-cover rounded-2xl shadow group-hover:brightness-50 transition-all ease-in duration-200" alt="" />
                        <span className="py-2 px-4 text-sm shadow-lg bg-primary/80 backdrop-blur rounded-full absolute top-3 left-3 text-white font-body">
                          {course.category}
                        </span>
                        <div className="gap-5 items-center justify-start absolute bottom-1 right-0 z-40 text-xl text-text p-5 hidden group-hover:flex">
                          <span className="bg-card p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all">
                            <FaHeart onClick={(e) => { toggleLike(id); stopNavigation(e) }} className="" />
                          </span>
                        
                        </div>
                      </div>
                
                    <div className="flex flex-col gap-2 md:gap-4 py-4 col-span-2">
                      <div className="flex flex-col text-left flex-wrap">
                        <h2 className="text-sm md:text-base font-semibold leading-snug font-heading text-text">{course.course_name}</h2>
                        <p className="text-xs/4 md:text-xs mt-1 text-wrap font-body text-text-light line-clamp-1">{course.course_desc}</p>
                      </div>
                      <div className="flex items-center justify-start flex-wrap gap-2">
                        <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm font-body rounded-sm md:rounded-full capitalize bg-page text-text-light flex flex-row gap-1 md:gap-2 items-center">
                          <span><PiBookDuotone className="text-sm" /></span>{course.chapters}
                        </span>
                        <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm font-body rounded-sm md:rounded-full bg-page text-text-light flex flex-row gap-1 items-center">
                          <span><CiClock1 className="text-sm" /></span>{formatTime(course.duration)}
                        </span>
                        <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm rounded-sm md:rounded-full bg-accent text-white flex gap-1 md:gap-2 items-center">
                          <FiTrendingUp className="text-sm" />{course.level}
                        </span>
                        <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm rounded-sm md:rounded-full flex gap-1 md:gap-2 items-center text-yellow-500 bg-yellow-100">
                          <FaStar className="text-sm" />{course.rating}
                        </span>
                      </div>
                      <div className="hidden md:flex justify-start items-center gap-3">
                        <div><img src={course.instructor_img} className="object-cover w-8 md:w-12 rounded-full aspect-[1]" alt="" /></div>
                        <div className="flex flex-col justify-start items-start capitalize font-[outfit]">
                          <span className="text-sm md:text-lg font-semibold md:font-medium text-text">{course.instructor_name}</span>
                          <span className="font-medium text-xs md:text-sm text-text-light">instructor</span>
                        </div>
                      </div>
                      <div className="flex flex-col mt-2 md:flex-row md:items-center gap-2 items-start justify-between">
                        {course.price === 0 && (
                          <>
                            <div className="flex items-center gap-3">
                              {course.price === 0 ? (
                                <span className="text-xl font-semibold text-success">Free</span>
                              ) : (
                                <span className="text-2xl font-semibold text-primary">₹{price}</span>
                              )}
                            </div>
                         
                          </>
                        )}
                        {( course.price !== 0) && (
                          <>
                            <div className="flex items-center gap-3">
                              <span className="text-lg md:text-2xl font-semibold text-primary">₹{course.price}</span>
                            </div>
                       
                          </>
                        )}
                     
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CONTINUE SHOPPING */}
              <Link
                to="/courses"
                className="mt-7 inline-flex items-center gap-2 font-body text-sm font-medium text-primary transition-all hover:gap-3"
              >
                <FaArrowLeft className="text-xs" />
                Continue browsing courses
              </Link>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="lg:sticky lg:top-28 lg:self-start">

              {/* SUMMARY CARD */}
              <div className="rounded-3xl border border-black/5 bg-card p-6 shadow-sm md:p-7">

                <h2 className="mb-6 font-heading text-xl font-semibold text-text md:text-2xl">
                  Order Summary
                </h2>

                {/* PRICE DETAILS */}
                <div className="flex flex-col gap-4 font-body text-sm">

                  <div className="flex items-center justify-between">
                    <span className="text-text-light">
                      Courses ({cartItems.length})
                    </span>

                    <span className="font-medium text-text">
                      ₹{subtotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-light">
                      Discount
                    </span>

                    <span className="font-medium text-success">
                      -₹{discount}
                    </span>
                  </div>

                  <div className="my-2 h-px bg-black/10" />

                  <div className="flex items-center justify-between">
                    <span className="font-heading text-base font-semibold text-text">
                      Total
                    </span>

                    <span className="font-heading text-2xl font-bold text-primary">
                      ₹{total}
                    </span>
                  </div>
                </div>

                {/* CHECKOUT */}
                <button className="mt-7 w-full cursor-pointer rounded-full bg-accent py-3.5 font-heading text-base font-medium text-white shadow-md transition-all duration-300 hover:scale-[0.98] hover:bg-primary-light">
                  Proceed to Checkout
                </button>

                {/* SECURITY */}
                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-page p-4">
                  <FaShieldAlt className="mt-0.5 shrink-0 text-success" />

                  <div>
                    <p className="text-xs font-semibold text-text">
                      Secure checkout
                    </p>

                    <p className="mt-1 text-[11px] leading-relaxed text-text-light">
                      Your payment information is securely processed.
                    </p>
                  </div>
                </div>

                {/* GUARANTEE */}
                <div className="mt-4 flex items-start gap-3">
                  <FaLock className="mt-0.5 shrink-0 text-text-light" />

                  <p className="text-[11px] leading-relaxed text-text-light">
                    Secure payment and protected checkout experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= EMPTY CART ================= */
          <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-black/5 bg-card px-6 text-center shadow-sm">

            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-page">
              <MdOutlineShoppingCart className="text-4xl text-text-light" />
            </div>

            <h2 className="font-heading text-2xl font-semibold text-text md:text-3xl">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-text-light md:text-base">
              You haven't added any courses yet. Explore our courses and find
              something worth learning.
            </p>

            <Link
              to="/courses"
              className="mt-7 rounded-full bg-accent px-7 py-3 font-heading text-sm font-medium text-white transition-all duration-300 hover:scale-95 hover:bg-primary-light"
            >
              Explore Courses
            </Link>
          </div>
        )}

        {/* ================= TRUST SECTION ================= */}
        {cartItems.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-card p-5">
              <FaShieldAlt className="mb-3 text-xl text-success" />

              <h3 className="font-heading font-semibold text-text">
                Secure payments
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-text-light">
                Your payment information is protected throughout checkout.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-5">
              <FaLock className="mb-3 text-xl text-primary" />

              <h3 className="font-heading font-semibold text-text">
                Safe learning
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-text-light">
                Your purchased courses stay available in your account.
              </p>
            </div>

            <div className="rounded-2xl bg-card p-5">
              <PiBookDuotone className="mb-3 text-xl text-accent" />

              <h3 className="font-heading font-semibold text-text">
                Learn at your pace
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-text-light">
                Access your courses whenever you want and continue learning.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;