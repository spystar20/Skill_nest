import { createTeacherProfile, Login, resetPassword, signUp, verifyEmail } from "@/api/authApi"
import { useMutation } from "@tanstack/react-query"

export const useSignUp = ()=>{
    return useMutation({
        mutationFn:signUp
    })
}
export const useLogin = ()=>{
    return useMutation({
        mutationFn:Login
    })
}
export const useVerifyEmail = ()=>{
    return useMutation({
        mutationFn:verifyEmail
    })
}
export const useResetPassword = ()=>{
    return useMutation({
        mutationFn:resetPassword
    })
}
export const usecreateTeacherProfile = ()=>{
    return useMutation({
        mutationFn:createTeacherProfile
    })
}