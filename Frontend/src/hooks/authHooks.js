import { createTeacherProfile, Login, signUp, updateProfile, updateTeacherPorfile } from "@/api/authApi"
import api from "@/utils/axios"
import { useMutation } from "@tanstack/react-query"

export const useSignUp = () => {
    return useMutation({
        mutationFn: signUp
    })
}
export const useLogin = () => {
    return useMutation({
        mutationFn: Login
    })
}
export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: async({token})=>{
            const res =await api.post("/auth/verify-email",{token})
return res.data
        }
    })
}
export const useResetPassword = () => {
    return useMutation({
        mutationFn: async({otp,newpassword,email})=>{
                      const res = await api.post('/auth/reset-password', {otp,newpassword,email})
            return res.data
            
        }
    })
}
export const usecreateTeacherProfile = () => {
    return useMutation({
        mutationFn: createTeacherProfile
    })
}
export const useUpdateTeacherProfile = (formdata) => {
    return useMutation({
        mutationFn: updateTeacherPorfile
    })
}

export const useUpadteProfile = (formdata) => {
    return useMutation({
        mutationFn: updateProfile
    })
}