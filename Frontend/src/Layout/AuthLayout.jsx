import React from 'react'
import { Outlet } from 'react-router-dom'
const AuthLayout = () => {
  return (
    <div className='w-full'>
<Outlet/>
    </div>
  )
}

export default AuthLayout