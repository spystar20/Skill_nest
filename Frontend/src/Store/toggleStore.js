import { create } from "zustand";
const PriceArr = [{ rate: 'free' }, { rate: 'paid' }]
export const toggleStore = create(((set)=> ({

openCourseCategories: false,
openSubCategories:{},
showSort :false,
Liked:[] ,
toggle :(key) => set((state) =>({[key] : !state[key]})),

toggleSubCategories :(name) => set((state) =>({openSubCategories:{...state.openSubCategories , [name]:!state.openSubCategories[name]}})),
toggleLike :(id) => set((state)=>({ 
    Liked:state.Liked.includes(id)? state.Liked.filter((courseid) => courseid !== id ):[...state.Liked,id]
}))
 })))

