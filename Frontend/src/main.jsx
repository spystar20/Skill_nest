import ReactDOM from "react-dom/client"
import React from 'react'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext"
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { WishlistProvider } from "./context/WishlistContext"
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WishlistProvider>
    <App />
    </WishlistProvider>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
