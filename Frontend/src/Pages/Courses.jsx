import React, { useEffect, useState } from 'react'
import { FaSearch, FaSortAlphaDownAlt } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import courseCategories from '../data/CourseCategories';
import { IoFilterSharp, IoTime } from "react-icons/io5";
import Pagination from '@mui/material/Pagination';
import ProjectCard from '@/utils/ProjectCard';
import api from '@/utils/axios';
import { Import } from 'lucide-react';
import FilterComponent from '@/utils/FilterComponent';
import { Slider } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import FilterChip from '@/utils/FilterChip';
import { paymentStore } from '@/Store/usePaymentStore';
import { useCategories, useFilteredCourse } from '@/hooks/CoursesHooks/useCourse';
import { useBuyCourse, useFreeCourse } from '@/hooks/CoursesHooks/courseMutation';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAddCartItem } from '@/hooks/CoursesHooks/cart/useCart';
const Courses = () => {
  const [openFilter, SetOpenFilter] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [sliderValue, setSliderValue] = useState([0, 0]);
  const [sortOption, setSortOptions] = useState('newest')
  const navigate = useNavigate()
 const {mutate:buyCourse}=useBuyCourse()
 const{mutate:freeCourse}=useFreeCourse()
 const {mutate:addToCart}=useAddCartItem()
  const handleToggleFilter = () => {
    SetOpenFilter(!openFilter)
  }
  const handleSort = () => {
    setShowSort(!showSort)
  }

  const [filter, setFilter] = useState({
    search: '', category: '', sort: sortOption, priceType: '', minPrice: '', maxPrice: '', difficulty: ''
  })
  const params = {}
  if (filter.search) {
    params.search = filter.search
  }
  if (filter.category) {
    params.category = filter.category
  }
  if (filter.sort) {
    params.sort = filter.sort
  }
  if (filter.priceType) {
    params.priceType = filter.priceType
  }
  if (filter.minPrice) {
    params.minPrice = filter.minPrice
  }
  if (filter.maxPrice) {
    params.maxPrice = filter.maxPrice
  }
  if (filter.difficulty) {
    params.difficulty = filter.difficulty
  }
 const {
  isLoading: coursesLoading,
  isError: coursesError,
data:courseData
} = useFilteredCourse(params)

const {
  isLoading: categoriesLoading,
  isError: categoriesError,
  data: categories
} = useCategories()
 const priceRange = courseData?.PriceRange
 const courses=courseData?.courses


  useEffect(() => {
    if (priceRange?.min === 0 && courses) {
      setSliderValue([priceRange?.min, priceRange?.max])
    }
  }, [priceRange])

  const handleSlider = (event, newValue) => {
    setSliderValue(newValue),
      setFilter((prev) => ({ ...prev, minPrice: newValue[0], maxPrice: newValue[1] }))
  }

  const handleSortOptions = (option) => {
    setFilter((prev) => ({ ...prev, sort: option }))
  }
  // const star = [5, 4, 3, 2, 1]

  const comingSoon = courses?.length === 0;
  // const [page, setPage] = useState(1)
  // const itemsPerPage = 6

  // const startIndex = (page - 1) * itemsPerPage
  // const endIndex = startIndex + itemsPerPage
  // const CurrentCourse = FinalArr.slice(startIndex, endIndex)
   const handleEnrollment=(course)=>{
    const course_id = course?._id
    if(course?.priceType !=='Free'){
      buyCourse({ courseId:course_id },{onSuccess:()=>{
        toast.success("Redirecting to payment...")
          
      }})
    }else{
      
      freeCourse({course_id},{onSuccess:()=>{
        toast.success('Course Purchased')
              setTimeout(() => {
                navigate('/dashboard/student/my-courses')
              }, 1000);
      }})
    }
   }
   const handleCart=(courseId)=>{
    console.log(courseId)
addToCart({courseId},{
  onSuccess:()=>{
    toast.success('item added to cart')
  }
})
   }
  return (
    <div className='min-h-screen bg-white w-full font-[Outfit]'>
      <div className='w-full flex flex-col min-h-[320px] gap-3 pt-23 justify-center items-center text-white  home-bg'>
        <h2 className='text-5xl font-semibold font-[Outfit]  capitalize '>courses</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, labore.</p>
      </div>
      {/* search and sort */}
      <div className='md:p-6 p-3  flex justify-center gap-2 md:gap-4 items-center shadow-xs font-body'>
        <button onClick={handleToggleFilter} className='hidden md:block text-base h-12 px-3 font-normal text-gray-700  capitalize border  cursor-pointer rounded-lg  hover:bg-gray-100'>
          filter
        </button>
        <button onClick={handleToggleFilter} className='md:hidden text-lg h-12 px-4 font-normal text-gray-700  capitalize border  cursor-pointer rounded-lg  hover:bg-gray-100'>
          <IoFilterSharp />
        </button>
        <div className='relative'>
          <button onClick={handleSort} className=' hidden md:block text-base h-12 px-8 text-gray-700 font-normal capitalize border cursor-pointer rounded-lg  hover:bg-gray-100 '>
            sort
          </button>
          <button onClick={handleSort} className='md:hidden text-lg h-12 px-3 text-gray-700 font-normal capitalize border cursor-pointer rounded-lg  hover:bg-gray-100' >
            <FaSortAlphaDownAlt />
          </button>

          <ul className={`absolute flex flex-col bg-gradient-to-tr from-[#95b1ee] to-[#728ccd] shadow-2xl mt-2 capitalize font-medium text-white rounded-lg z-[10000] text-sm  cursor-pointer transition-all ease-out duration-300 w-[150px]  ${showSort ? 'visible translate-y-0' : 'invisible -translate-y-6'}`}>
            <li onClick={() => { handleSortOptions('newest'), setShowSort(false) }} className=' hover:bg-black  hover:text-white  text-white p-2 rounded-t-lg  '>
              newest
            </li>
            <li onClick={() => { handleSortOptions('oldest'), setShowSort(false) }} className=' hover:bg-black  hover:text-white  text-white p-2 '>
              oldest
            </li>
            <li onClick={() => { handleSortOptions('price-high'), setShowSort(false) }} className='hover:bg-black  hover:text-white text-white p-2 '>
              Price: High to low
            </li>
            <li onClick={() => { handleSortOptions('price-low'), setShowSort(false) }} className=' hover:bg-black  hover:text-white text-white p-2 rounded-b-lg '>
              Price: low to high
            </li>
          </ul>
        </div>
        <div className='flex-1 overflow-hidden rounded-lg border flex justify-between items-center'>
          <input value={filter.search} onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))} type="text" className='w-[200px] md:w-full h-full text-base  border-none outline-none placeholder:capitalize placeholder:font-[Roboto] placeholder:text-gray-900 placeholder:font-light px-1 md:px-4 ' placeholder='search desired courses' />
          <span className='h-11 text-white 
bg-gradient-to-tr from-[#95b1ee] to-[#728ccd]
transition-all duration-300 px-1  md:px-4  flex items-center justify-center rounded-lg flex-1'><FaSearch className=' md:text-xl self-center scale-100 hover:scale-125 cursor-pointer text-white' /></span>
        </div>
      </div>

      {/* filter */}
      <div className={`flex relative items-start transition-all duration-300 ease-out ${openFilter ? 'gap-8' : 'gap-0'}`}>

        <aside className={`transition-all absolute top-2 bg-white z-[99] h-full md:sticky md:top-24 duration-300 overflow-hidden shrink-0
  ${openFilter ? 'w-[300px] p-6 border rounded-2xl' : 'w-0 p-0 border-0'}
  `}
        >

          <FilterComponent title="Categories" filters={filter} setFilter={setFilter} filterKey="category" optionArray={categories} />
          <FilterComponent title="Difficulty" filters={filter} setFilter={setFilter} filterKey="difficulty" optionArray={['Beginner', 'Intermediate', 'Advanced']} />
          <FilterComponent title="Price Type" filters={filter} setFilter={setFilter} filterKey="priceType" optionArray={['Free', "Paid"]} />
          <Slider
            getAriaLabel={() => 'Price range'}
            value={sliderValue}
            min={priceRange?.min}
            max={priceRange?.max}
            onChange={handleSlider}
            valueLabelDisplay="auto"
          />
          {/* Rating */}
          {/* <div className='font-[Outfit] w-full'>
            <h2 className='text-lg font-medium mb-3 flex justify-between items-center capitalize '>rating<span><MdOutlineKeyboardArrowDown className='text-2xl font-black' /></span></h2>
            <div>
              <div> {star.map((star, index) => {
                return (<div className='flex items-center  ' key={index}>
                  <label className='flex gap-3 py-2 rounded-lg transition hover:bg-gray-50 cursor-pointer w-full justify-start items-center' > <input type="radio" className=' border-none accent-pink-400' onChange={(e) => setFilter("rating", Number(e.target.value))} checked={Number(rating) === star} value={star} name={star} id="" /> <span className='text-base text-gray-700 font-medium capitalize'>{star} & above</span> </label> </div>)
              })} </div> </div> </div> */}
          {/* price */}

        </aside>

        {/* courses */}
        {comingSoon ? (
          <div className="text-center flex justify-center items-center h-[20vh] w-full text-xl font-[Merienda] font-semibold text-gray-500 py-4">
            🚀 Courses will be available soon
          </div>
        ) : (

          <div className='flex-1 min-w-0 px-5 '>

<div className='flex flex-wrap overflow-x-auto md:gap-2'>
            <FilterChip filter={filter.category} onRemove={() => setFilter(prev => ({ ...prev, category: '' }))} />
            <FilterChip filter={filter.difficulty} onRemove={() => setFilter(prev => ({ ...prev, difficulty: '' }))} />
            <FilterChip filter={filter.priceType} onRemove={() =>setFilter(prev => ({ ...prev, priceType: '' }))} />
            <FilterChip filter={
  filter.minPrice && filter.maxPrice
    ? `₹${filter.minPrice} - ₹${filter.maxPrice}`
    : ''
} onRemove={ () =>{setFilter(prev => ({ ...prev, minPrice: '' ,maxPrice:''})),setSliderValue([priceRange.min,priceRange.max])}} />
</div>
          
            <div className={`grid  gap-4  py-2 md:py-6 grid-cols-1 ${filter ? 'md:grid-cols-3 ' : 'md:grid-cols-4'}`}>
              {courses?.map((course, index) => {
                return (

                  <ProjectCard onBuy={()=>handleEnrollment(course)} status={course.enrollment?.status ?? null}    img={course.thumbnail} enrollmentId={course.enrollment?._id} price={course.price} key={index} category={course.category} course_desc={course.desc} course_id={course._id} course_name={course.title} chapters={12} duration={course.duration} level={course.difficulty} handleCart={()=>handleCart(course._id)} rating={5} instructor_img={course.thumbnail} instructor_name={course.instructor.firstName} />
                )
              })}

            </div>
          </div>)}
      </div>
    </div>
  )
}

export default Courses