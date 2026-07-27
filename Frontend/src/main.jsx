import ReactDOM from "react-dom/client"
import React from 'react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext"
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <App />
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
