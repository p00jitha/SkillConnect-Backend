import express from 'express';
import {signup,login,logout,allusers,otpverification,resendOTP,forgotpw} from '../controllers/auth_controller.js'
const router = express.Router()

router.post("/signup",signup);
router.post("/login",login);
router.post("/forgotpw",forgotpw);
router.post("/logout",logout);
router.get("/users",allusers);
router.post('/verifyotp',otpverification);
router.post('/resendotp',resendOTP);

export default router;