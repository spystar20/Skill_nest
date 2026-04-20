import { create } from "zustand";
import Course from '../data/course'
export const useCourseStore = create((set)=>({

    selectCourse:'',selectSubCategories:'',price:'',rating:'',search:'',sortBy:{},
 
   setFilter: (key, value) =>
    set((state) => ({
      ...state,
   [key]: state[key] === value ? "" : value,

    })),

  handleSort: (type) =>
    set({
      sortBy: type,
    }),


  
}))