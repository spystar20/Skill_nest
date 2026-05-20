import ReactDOM from "react-dom/client"
import React from 'react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>,
)
