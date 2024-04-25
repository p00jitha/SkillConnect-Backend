import express from 'express';
import {signup,login,allusers} from '../controllers/auth_controller.js'
const router = express.Router()

router.post("/signup",signup);
router.post("/login",login);
router.get("/users",allusers)

export default router;