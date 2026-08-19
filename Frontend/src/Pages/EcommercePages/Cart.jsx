import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaLock,FaShieldAlt,} from "react-icons/fa";
import { PiBookDuotone } from "react-icons/pi";
import CartCourseCard from "./Cart/CartCourseCard";
import { useCartCheckout, usefetchCartItems, useRemoveCartItem } from "@/hooks/CoursesHooks/cart/useCart";
import { MdOutlineShoppingCart } from "react-icons/md";
import { toast } from "sonner";
const Cart = () => {
  const {data:cartData}=usefetchCartItems()
const {mutate:checkout}=useCartCheckout()
  const cartItems = cartData?.addedCourses
  const subtotal = cartItems?.reduce((acc,curr)=>acc+curr.price,0) || 0
  const discount = 0
const total = subtotal-discount

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
        {cartItems?.length > 0 ? (
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
                {cartItems?.map((course) => (
            <CartCourseCard course={course} />
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
                      Courses ({cartItems?.length})
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
                <button onClick={()=>checkout()} className="mt-7 w-full cursor-pointer rounded-full bg-accent py-3.5 font-heading text-base font-medium text-white shadow-md transition-all duration-300 hover:scale-[0.98] hover:bg-primary-light">
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
        {cartItems?.length > 0 && (
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
