import api from "@/utils/axios"

  export const signUp = async(data)=>{
  const res = await api.post('/auth/sign',data)
    return res.data
}

export const Login = async(data)=>{
     const res = await api.post('/auth/login',data)
     return res.data

}
export const verifyEmail = async(data)=>{
const res =await api.post("/auth/verify-email",{data})
return res.data
}
export const resetPassword = async(data)=>{
          const res = await api.post('/auth/reset-password', { data})
return res.data
}

export const createTeacherProfile=async(data)=>{
            const res = await api.post('/teacher/becomeTeacher',data)
return res.data
}