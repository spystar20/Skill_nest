import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import AppRoutes from './Routes/AppRoutes'

const App = () => {
  return (
    <div className='home-bg w-full h-screen'>
    <Toaster  containerStyle={{
    zIndex: 999999999999
  }}/>
    <BrowserRouter>
<AppRoutes/>
    </BrowserRouter>
    </div>
  )
}

export default App