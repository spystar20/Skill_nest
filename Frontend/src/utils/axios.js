 import axios from "axios"
import { toast } from "sonner"
 const api = axios.create({
baseURL:import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
 })
 export default api

api.interceptors.response.use(
  (response)=>{
    return response
  },
  (error)=>{
 toast.error(  error.response?.data?.message || "Something went wrong"
)
return Promise.reject(error)
  }
)