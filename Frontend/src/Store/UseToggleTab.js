import { create } from "zustand";
 
export const usetoggletab = create((set)=>({
    tab: "resource", syllabus:{module1:true }, 
 toggletab : (tabName) =>set({tab:tabName}),
 toggleModule:(module)=> set((state)=>({syllabus:{...state.syllabus , [module]:!state.syllabus[module]}}))
}))