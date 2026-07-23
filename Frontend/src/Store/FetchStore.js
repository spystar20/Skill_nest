import api from "@/utils/axios";
import { create } from "zustand";
export const useFetchStore = create((set)=>({
loading:false,
uploadedResource:[],
courses:[],
PriceRange:{
  min:0,max:0
},
course:null,
teacher:null,
enrolledCourses:[],
   fetchFilteredCourses : async(params)=>{
try{
        const res = await api.get('/course/', { params }, { withCredentials: true })
        const min = res?.data?.PriceRange[0]?.minPrice
        const max = res?.data?.PriceRange[0]?.maxPrice
 set({courses:res?.data?.courses||[],PriceRange:{min,max}})

}catch(err){
            console.log(err)

}
  },
  fetchCourseById:async(course_id)=>{
   const res = await api.get(`/course/${course_id}`)
   set({course:res?.data?.course,teacher:res?.data?.teacher})
  },
  fetchUploadedResource:async(lessonId)=>{
    try{
set({loading:true})
const res = await api.get(`/course/lesson/${lessonId}`)
set({uploadedResource:res?.data?.lesson?.resources||[]})
    }catch(err){
      console.log(err)
    }finally{
      set({loading:false})
    }
  },
 fetchEnrolledCourses:async()=>{
try{
const res = await api.get('/course/enrolled')
set({enrolledCourses:res?.data?.courses || []})

}catch(err){
  console.log(err)
}
 }
   
}))