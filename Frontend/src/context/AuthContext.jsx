import api from "@/utils/axios";
import {  createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext()
export const AuthProvider = ({children})=>{
    
    const [user,setUser] = useState(null);

    const checkauth = async()=>{
        try{
       const res =  await api.get('/auth/me',{withCredentials:true})
       setUser({
        ...res.data.existingUser,...res.data.Teacher
       })
       console.log(user)
        }catch(err){
            console.log(err)
        }}
useEffect(()=>{
    checkauth()
},[])
    return(
<AuthContext.Provider value={{user,setUser}}>
    {children}
</AuthContext.Provider>
    )

}
export const useAuth = ()=>{
  return  useContext(AuthContext)
}