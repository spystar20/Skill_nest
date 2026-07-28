import api from "@/utils/axios";
import { create } from "zustand";
export const useFetchStore = create((set)=>({
loading:false,
uploadedResource:[],
courses:[],
section:[],
lesson:{},
PriceRange:{
  min:0,max:0
},
course:null,
teacher:null,
enrolledCourses:[],
enrolledCourse:[],
progress:0,

 
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

 
}))