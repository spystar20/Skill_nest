import {
  LuBookOpenCheck,
  LuShoppingCart,
  LuHeart,
  LuStar,
  LuUserRound,
  LuBookOpen,
  LuCircleCheck,
  LuTrash2,
  LuPencil,
  LuLayers,
  LuFilePlus,
  LuFileMinus,
  LuUpload
} from "react-icons/lu"

export const activityMessages = {
  "course-created": "Created a new course",
  "course-deleted": "Deleted a course",
  "course-published": "Published a course",
  "course-unpublished": "Unpublished a course",

  "section-created": "Created a new section",
  "section-updated": "Updated a section",
  "section-deleted": "Deleted a section",

  "lesson-created": "Created a new lesson",
  "lesson-updated": "Updated a lesson",
  "lesson-deleted": "Deleted a lesson",

  "resource-added": "Added a resource",
  "resource-deleted": "Deleted a resource",

  "enrollment": "Enrolled in a course",
  "review-added": "Added a review",
  "review-updated": "Updated a review",
  "review-deleted": "Deleted a review",

  "cart-added": "Added a course to cart",
  "cart-removed": "Removed a course from cart",

  "wishlist-added": "Added a course to wishlist",
  "wishlist-removed": "Removed a course from wishlist",

  "profile-updated": "Updated your profile",
  "teacher-profile-updated": "Updated your teacher profile"
}
export const activityIcons = {
  "enrollment": LuBookOpenCheck,
  "cart-added": LuShoppingCart,
  "cart-removed": LuShoppingCart,
  "wishlist-added": LuHeart,
  "wishlist-removed": LuHeart,
  "review-added": LuStar,
  "review-updated": LuPencil,
  "review-deleted": LuTrash2,
  "profile-updated": LuUserRound,
  "teacher-profile-updated": LuUserRound,

  "course-created": LuBookOpen,
  "course-deleted": LuTrash2,
  "course-published": LuCircleCheck,
  "course-unpublished": LuCircleCheck,

  "section-created": LuLayers,
  "section-updated": LuPencil,
  "section-deleted": LuTrash2,

  "lesson-created": LuFilePlus,
  "lesson-updated": LuPencil,
  "lesson-deleted": LuTrash2,

  "resource-added": LuUpload,
  "resource-deleted": LuTrash2
}
export const relativeTime =  (date)=>{
  const diff  = Date.now() - new Date(date).getTime()
const seconds =Math.floor(diff /1000)
const minutes = Math.floor(seconds/60)
const hours = Math.floor(minutes/60)
  const days = Math.floor(hours / 24)

 if(seconds<60) return 'just now'
 if(minutes<60) return `${minutes}m ago`
 if (hours<24) return `${hours}h ago`
 if(days ===1) return `yesterday`
 if(days<7) return `${days}d ago`
   return new Date(date).toLocaleDateString()
}