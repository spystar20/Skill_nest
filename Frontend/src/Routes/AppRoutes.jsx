import MainLayout from '@/Layout/MainLayout'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { lazy } from 'react'
const Home = lazy(() => import('@/Pages/Home'))
const About = lazy(() => import('@/Pages/About'))
const Courses = lazy(() => import('@/Pages/Courses'))
const CourseDetails = lazy(() => import('@/Pages/CourseDetails'))
const CoursePlayer = lazy(() => import('@/Pages/CoursePlayer'))
const Login = lazy(() => import('@/AuthPages/Login'))
const SignUp = lazy(() => import('@/AuthPages/SignUp'))
const Otp = lazy(() => import('@/AuthPages/Otp'))
const VerifyEmail = lazy(() => import('@/AuthPages/VerifyEmail'))
const AuthLayout = lazy(() => import('@/Layout/AuthLayout'))
const PendingEmailVerification = lazy(() => import('@/AuthPages/PendingEmailVerification'))
const ForgotPassword = lazy(() => import('@/AuthPages/ForgotPassword'))
const ResetPassword = lazy(() => import('@/AuthPages/ResetPassword'))
const Profile = lazy(() => import('@/Dashboard Pages/Profile/Profile'))
import DashboardLayout from '@/Layout/DashboardLayout'
const Security = lazy(() => import('@/Dashboard Pages/Security'))
const BecomeTeacher = lazy(() => import('@/AuthPages/BecomeTeacher'))
const Teach = lazy(() => import('@/Pages/Teach'))
const MyCourse = lazy(() => import('@/Dashboard Pages/Teaching/MyCourse'))
const AddCourse = lazy(() => import('@/Dashboard Pages/Teaching/CourseCreation/AddCourse'))
const CourseBuilder = lazy(() => import('@/Dashboard Pages/Teaching/CourseCreation/CourseBuilder'))
const LessonEditor = lazy(() => import('@/Dashboard Pages/Teaching/CourseCreation/LessonEditor'))
import Loader from '@/utils/Loader'
import EnrolledCourses from '@/Dashboard Pages/user/EnrolledCourses'

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* MAIN LAYOUT */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses/:course_name/:course_id' element={<CourseDetails />} />
          <Route path='/Teach' element={<Teach />} />
        </Route>
        <Route element={<AuthLayout />}>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login/otp' element={<Otp />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/pending-email-verification' element={<PendingEmailVerification />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/become-teacher' element={<BecomeTeacher />} />
          <Route path='/dashboard/teacher/add-course' element={<AddCourse />} />
          <Route path='/dashboard/teacher/courses/:courseId/edit' element={<CourseBuilder />} />
          <Route path='/courseBuilder/:courseId/lesson/:lessonId' element={<LessonEditor />} />

        </Route>
        <Route element={<DashboardLayout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard/teacher/my-courses' element={<MyCourse />} />
          <Route path='/dashboard/student/my-courses' element={<EnrolledCourses/>}/> 
          <Route path='/security' element={<Security />} />
                    <Route path='/courses/:course_name/:course_id/learn' element={<CoursePlayer />} />

        </Route>
      </Routes>
    </Suspense>

  )
}

export default AppRoutes