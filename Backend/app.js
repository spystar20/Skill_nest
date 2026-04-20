import express from "express"
import { ConnectDB } from "./Config/db.js";
import { loadOnce } from "./Config/env.js";
import { errHandler } from "./src/middleware/err.middleware.js"
import cookieParser from "cookie-parser"
import authRoutes from './src/routes/auth.routes.js'
import session from "express-session"
import cors from "cors"
import passport from "passport";
import './src/controller/google.passport.js'
ConnectDB()
loadOnce()
const app = express()
app.use(cors({
    origin:process.env.URL,credentials:true
}))
app.use(express.json())
app.use(session({
    secret:"jffdjhf",resave:false,saveUninitialized:true
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use("/auth",authRoutes)
app.use(errHandler)
const PORT =  process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT} `)
})