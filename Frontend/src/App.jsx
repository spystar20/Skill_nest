import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import AppRoutes from './Routes/AppRoutes'

const App = () => {
  return (
    <div className='bg-black w-full '>
  <Toaster
  position="top-center"
  containerStyle={{
    left:16,right:16,
top:0,
    bottom: "auto",
    inset: "auto",
    zIndex: 999999999999
  }}
/>
    <BrowserRouter>
<AppRoutes/>
    </BrowserRouter>
    </div>
  )
}

export default App