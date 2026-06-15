import MainLayout from '@/Layout/MainLayout'
import React from 'react'
import {   Route , Routes } from 'react-router-dom'
import Home from '@/Pages/Home'
import About from '@/Pages/About'
import Courses from '@/Pages/Courses'
import CourseDetails from '@/Pages/CourseDetails'
import CoursePlayer from '@/Pages/CoursePlayer'
import Login from '@/AuthPages/Login'
import SignUp from '@/AuthPages/SignUp'
import Otp from '@/AuthPages/Otp'
import VerifyEmail from '@/AuthPages/VerifyEmail'
import AuthLayout from '@/Layout/AuthLayout'
import PendingEmailVerification from '@/AuthPages/PendingEmailVerification'
import ForgotPassword from '@/AuthPages/ForgotPassword'
import ResetPassword from '@/AuthPages/ResetPassword'
import Profile from '@/Dashboard Pages/Profile/Profile'
import DashboardLayout from '@/Layout/DashboardLayout'
import Security from '@/Dashboard Pages/Security'
import BecomeTeacher from '@/AuthPages/BecomeTeacher'
import Teach from '@/Pages/Teach'
import MyCourse from '@/Dashboard Pages/Teaching/MyCourse'
import AddCourse from '@/Dashboard Pages/Teaching/CourseCreation/AddCourse'
import CourseBuilder from '@/Dashboard Pages/Teaching/CourseCreation/CourseBuilder'
import LessonEditor from '@/Dashboard Pages/Teaching/CourseCreation/LessonEditor'

const AppRoutes = () => {
  return (
    
         <Routes>
            {/* MAIN LAYOUT */}
            <Route element={<MainLayout/>}>
  <Route path='/' element={<Home/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/courses' element={<Courses/>}/>
   <Route path='/courses/:course_name' element={<CourseDetails/>}/>
     <Route path='/courses/lecture/:course_name' element={<CoursePlayer/>}/>
     <Route path='/Teach' element={<Teach/>}/>
            </Route>
     <Route element={<AuthLayout/>}>

     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/login/otp' element={<Otp/>}/>
     <Route path='/verify-email' element={<VerifyEmail/>}/> 
     <Route path='/pending-email-verification' element={<PendingEmailVerification/>}/>
     <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
         <Route path='/become-teacher' element={<BecomeTeacher/>}/>
         <Route path='/dashboard/teacher/add-course' element={<AddCourse/>} />
         <Route path='/dashboard/teacher/courses/:courseId/edit' element={<CourseBuilder/>}/>
                  <Route path='/courseBuilder/:courseId/lesson/:lessonId' element={<LessonEditor/>}/>

     </Route>
   <Route element={<DashboardLayout/>}>
       <Route path='/profile' element={<Profile/>}/>
       <Route path='/dashboard/teacher/my-courses' element={<MyCourse/>}/>
       <Route path='/security' element={<Security/>}/>
   </Route>
     </Routes>
    
  )
}

export default AppRoutes