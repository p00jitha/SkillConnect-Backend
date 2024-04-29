import express from 'express';
import {signup,login,logout,allusers} from '../controllers/auth_controller.js'
const router = express.Router()

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/users",allusers)

export default router;