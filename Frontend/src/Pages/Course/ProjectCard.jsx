import React from 'react'
import { CiClock1 } from 'react-icons/ci'
import { FaHeart, FaCartArrowDown, FaStar } from 'react-icons/fa'
import { FiTrendingUp } from 'react-icons/fi'
import { PiBookDuotone } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { formatTime } from '../../utils/formatDuration'
import { useAddCartItem } from '@/hooks/CoursesHooks/cart/useCart'
import { toast } from 'sonner'
import { useBuyCourse, useFreeCourse } from '@/hooks/CoursesHooks/courseMutation'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { useAddWishlist, useRemoveWishlist } from '@/hooks/CoursesHooks/wishlist/useWishlist'
import { useWishlistContext } from '@/context/WishlistContext'

const ProjectCard = ({ className = '', course, isItemAdded }) => {
  const navigate = useNavigate()

  const status = course?.enrollment?.status ?? null
  // enrollment mutations
  const { mutate: buyCourse } = useBuyCourse()
  const { mutate: freeCourse } = useFreeCourse()
  // adding course to cart with id
  const { mutate: addItem } = useAddCartItem()
  // wishlist toggle mutations
  const { mutate: addWishlist } = useAddWishlist()
  const { mutate: removeWishlist } = useRemoveWishlist()
  const isWishlisted = useWishlistContext()
  const wishListed = isWishlisted(course?._id)

  // toggle wishlist
  const handleWishlistToggle = (courseId) => {
    if (!wishListed) {
      addWishlist({ courseId }, {
        onSuccess: () => {
          toast.success("course added to wishlist")
        }
      })
    } else if (wishListed) {
      removeWishlist({ courseId }, {
        onSuccess: () => {
          toast.success("course removed from wishlist")
        }
      })
    }
  }

  // cart function
  const handleAddItem = (courseId, course_name) => {
    addItem({ courseId }, {
      onSuccess: () => {
        toast.success(`${course_name} has been added to cart`, {
          action: {
            label: 'view cart', onClick: () => navigate('/cart')
          }
        })
      }
    })
  }

  // course purchasing function for both free and paid 
  const handleEnrollment = (courseId, priceType) => {
    const course_id = courseId
    if (priceType !== 'Free') {
      buyCourse({ course_id }, {
        onSuccess: () => {
          toast.success("Redirecting to payment...")
        }
      })
    } else {
      freeCourse({ course_id }, {
        onSuccess: () => {
          toast.success('Course Purchased')
          setTimeout(() => {
            navigate('/dashboard/student/my-courses')
          }, 1000);
        }
      })
    }
  }

  const stopNavigation = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className={`cards rounded-xl p-2.5 max-w-sm shadow-sm bg-card transition-all ${className}`}>
      <Link to={`/courses/${course?.title}/${course?._id}`}>
        <div className="relative group cursor-pointer">
          {/* Changed aspect-square to aspect-video for a smaller image height */}
          <img 
            src={course?.thumbnail} 
            className="aspect-video w-full object-cover rounded-lg shadow-sm group-hover:brightness-50 transition-all ease-in duration-200" 
            alt="" 
          />
          {/* Reduced Category Badge Size */}
          <span className="py-0.5 px-2 text-[10px] shadow bg-primary/80 backdrop-blur rounded-full absolute top-2 left-2 text-white font-body">
            {course?.category}
          </span>

          {(status === null) && (
            <div className="gap-2 items-center justify-start absolute bottom-1 right-1 z-40 text-sm text-text p-1 flex">
              <span 
                onClick={(e) => {
                  stopNavigation(e)
                  handleWishlistToggle(course._id)
                }} 
                className="bg-card p-1.5 rounded-full hover:scale-110 ease-in duration-200 transition-all shadow-sm"
              >
                <FaHeart className={`duration-200 transition-colors text-xs ${wishListed ? 'text-accent' : 'text-black'}`} />
              </span>
              {isItemAdded === false ? (
                <span 
                  onClick={(e) => {
                    stopNavigation(e)
                    handleAddItem(course?._id, course?.title)
                  }} 
                  className="bg-card p-1.5 rounded-full hover:scale-110 ease-in duration-200 transition-all shadow-sm"
                >
                  <FaCartArrowDown className="text-xs" />
                </span>
              ) : (
                <Link to='/cart' className="text-accent bg-card p-1.5 rounded-full hover:scale-110 ease-in duration-200 transition-all shadow-sm">
                  <BsFillCartCheckFill className="text-xs" />
                </Link>
              )}
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-2 py-2">
        <div className="flex flex-col text-left">
          <h2 className="text-xs md:text-sm font-semibold leading-tight font-heading text-text line-clamp-1">
            {course?.title}
          </h2>
          <p className="text-[11px] mt-0.5 text-wrap font-body text-text-light line-clamp-1">
            {course?.desc}
          </p>
        </div>

        {/* Compact Badges */}
        <div className="flex items-center justify-start flex-wrap gap-1">
          <span className="py-0.5 px-1.5 text-[10px] font-medium shadow-2xs font-body rounded-full capitalize bg-page text-text-light flex flex-row gap-1 items-center">
            <PiBookDuotone className="text-xs" />{course?.sectionCount}
          </span>
          <span className="py-0.5 px-1.5 text-[10px] font-medium shadow-2xs font-body rounded-full bg-page text-text-light flex flex-row gap-1 items-center">
            <CiClock1 className="text-xs" />{formatTime(course?.duration)}
          </span>
          <span className="py-0.5 px-1.5 text-[10px] font-medium shadow-2xs rounded-full bg-accent text-white flex gap-1 items-center">
            <FiTrendingUp className="text-xs" />{course?.difficulty}
          </span>
          <span className="py-0.5 px-1.5 text-[10px] font-medium shadow-2xs rounded-full flex gap-1 items-center text-yellow-600 bg-yellow-100">
            <FaStar className="text-xs" />
            {course?.reviewCount > 0
              ? `${course.averageRating.toFixed(1)} (${course.reviewCount})`
              : "New"}
          </span>
        </div>

        {/* Compact Instructor Details */}
        <div className="flex justify-start items-center gap-2 pt-1">
          <img src={course?.thumbnail} className="object-cover w-6 h-6 rounded-full aspect-square" alt="" />
          <div className="flex flex-col justify-start items-start capitalize font-[outfit] leading-none">
            <span className="text-xs font-semibold text-text">{course?.instructor?.firstName}</span>
            <span className="font-medium text-[10px] text-text-light">instructor</span>
          </div>
        </div>

        {/* Compact Price and Action Button - FIXED BUTTON STYLING */}
        <div className="flex items-center justify-between gap-2 mt-1">
          {status === null ? (
            <>
              <span className="text-base font-semibold text-primary">
                {course?.price === 0 ? "Free" : `₹${course?.price}`}
              </span>
              <button 
                onClick={(e) => { stopNavigation(e); handleEnrollment(course?._id, course?.priceType) }} 
                className="transition-all bg-accent font-heading cursor-pointer text-white rounded-lg py-1.5 px-3.5 text-xs font-semibold hover:opacity-90 active:scale-95 shadow-xs"
              >
                {course?.price === 0 ? "Enroll Now" : "Buy Now"}
              </button>
            </>
          ) : (
            <Link 
              to={`/courses/${course.title}/${course.enrollment?._id}/learn`} 
              className="transition-all bg-accent font-heading cursor-pointer text-white rounded-lg py-1.5 px-3 text-xs font-semibold hover:opacity-90 active:scale-95 text-center w-full shadow-xs"
            >
              {status === "not started" ? "Start Learning" : status === "in-progress" ? 'Continue' : "Review"}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard