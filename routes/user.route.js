import express from 'express'
import { AllUsers, signup } from '../controller/user.controller.js'
import { login } from '../controller/user.controller.js'
import { logout } from '../controller/user.controller.js'
import SecureRoute from '../middlewares/SecureRoute.js'
const router = express.Router()
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/AllUsers',SecureRoute,AllUsers)
export default router;