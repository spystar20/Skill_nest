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
  //  course purchasing function for both free and paid 
  const handleEnrollment = (courseId, priceType) => {
    const course_id = courseId
    if (priceType !== 'Free') {
      buyCourse({ courseId: course_id }, {
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
    <div className={`cards rounded-lg md:rounded-4xl p-2 md:p-5 ${className}`}>
      <Link to={`/courses/${course?.title}/${course?._id}`}>
        <div className="relative group cursor-pointer">
          <img src={course?.thumbnail} className="aspect-square object-cover rounded-2xl shadow group-hover:brightness-50 transition-all ease-in duration-200" alt="" />
          <span className="py-2 px-4 text-sm shadow-lg bg-primary/80 backdrop-blur rounded-full absolute top-3 left-3 text-white font-body">
            {course?.category}
          </span>
          {(status ===null) &&(
          <div className="gap-5 items-center justify-start absolute bottom-1 right-0 z-40 text-xl text-text p-5 flex">
            <span onClick={(e) => {
              stopNavigation(e)
              handleWishlistToggle(course._id)
            }} className="bg-card p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all">
              <FaHeart className={` duration-200 transition-colors ${wishListed ? 'text-accent' : 'text-black'}`} />
            </span>
            {isItemAdded === false ? (<span onClick={(e) => {
              stopNavigation(e)
              handleAddItem(course?._id, course?.title)
            }} className="bg-card p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all">
              <FaCartArrowDown />
            </span>) : (<Link to='/cart' className="text-accent bg-card p-2 rounded-full hover:scale-110 ease-in duration-200 transition-all">
              <BsFillCartCheckFill />
            </Link>)}

          </div>
)}
        </div>
      </Link>
      <div className="flex flex-col gap-2 md:gap-4 py-4">
        <div className="flex flex-col text-left flex-wrap">
          <h2 className="text-sm md:text-base font-semibold leading-snug font-heading text-text">{course?.title}</h2>
          <p className="text-xs/4 md:text-xs mt-1 text-wrap font-body text-text-light line-clamp-1">{course?.desc}</p>
        </div>
        <div className="flex items-center justify-start flex-wrap gap-2">
          <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm font-body rounded-sm md:rounded-full capitalize bg-page text-text-light flex flex-row gap-1 md:gap-2 items-center">
            <span><PiBookDuotone className="text-sm" /></span>{course?.sectionCount}
          </span>
          <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm font-body rounded-sm md:rounded-full bg-page text-text-light flex flex-row gap-1 items-center">
            <span><CiClock1 className="text-sm" /></span>{formatTime(course?.duration)}
          </span>
          <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm rounded-sm md:rounded-full bg-accent text-white flex gap-1 md:gap-2 items-center">
            <FiTrendingUp className="text-sm" />{course?.difficulty}
          </span>
          <span className="p-1 md:py-1 md:px-2.5 text-xs lg:text-sm font-medium shadow-sm rounded-sm md:rounded-full flex gap-1 md:gap-2 items-center text-yellow-600 bg-yellow-100">
  <FaStar className="text-sm" />
  {course?.reviewCount > 0
    ? `${course.averageRating.toFixed(1)} (${course.reviewCount})`
    : "New"}
</span>
        </div>
        <div className="hidden md:flex justify-start items-center gap-3">
          <div><img src={course?.thumbnail} className="object-cover w-8 md:w-12 rounded-full aspect-[1]" alt="" /></div>
          <div className="flex flex-col justify-start items-start capitalize font-[outfit]">
            <span className="text-sm md:text-lg font-semibold md:font-medium text-text">{course?.instructor?.firstName}</span>
            <span className="font-medium text-xs md:text-sm text-text-light">instructor</span>
          </div>
        </div>
        <div className="flex flex-col mt-2 md:flex-row md:items-center gap-2 items-start justify-between">
          {(course?.price === 0 && status === null) && (
            <>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold text-primary">{course?.price === 0 ? 'Free' : `${course?.price}`}</span>

              </div>
              <div className="w-full md:w-1/2">
                <button onClick={(e) => { stopNavigation(e); handleEnrollment(course?._id, course?.priceType) }} className="transition-all bg-accent font-heading cursor-pointer text-white rounded-full md:py-1.5 py-1 px-5 w-full text-lg box capitalize font-medium hover:bg-primary-light hover:scale-95">{course?.price === 0 ? 'Enoll Now' : 'Buy now'}</button>
              </div>
            </>
          )}
          {(status === null && course?.price !== 0) && (
            <>
              <div className="flex items-center gap-3">
                <span className="text-lg md:text-2xl font-semibold text-primary">₹{course?.price}</span>
              </div>
              <div className="w-full md:w-1/2">
                <button onClick={(e) => { stopNavigation(e); handleEnrollment(course?._id, course?.priceType) }} className="transition-all bg-accent font-heading cursor-pointer text-white rounded-full md:py-1.5 py-1 px-5 w-full text-lg box capitalize font-medium hover:bg-primary-light hover:scale-95">Buy now</button>
              </div>
            </>
          )}
          <>
            {status !== null && (
              <Link to={`/courses/${course.title}/${course.enrollment?._id}/learn`} className="transition-all bg-accent font-heading cursor-pointer text-white rounded-full md:py-1.5 py-1 px-5 w-full text-lg box capitalize font-medium hover:bg-primary-light hover:scale-95 text-center">
                {status === "not started" ? "Start Learning" : status === "in-progress" ? 'continue learning' : "Review Course"}
              </Link>
            )}

          </>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
