import express from "express"
export const router = express.Router()
import { updateProfile} from "../controller/controller.auth.js"
import { middleware } from "../middleware/auth.middleware.js"


router.put('/update/profile',middleware,updateProfile)


export default router