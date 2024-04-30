import express from 'express'
import { user_profile } from '../controllers/profile_controllers.js';
const router = express.Router();

router.get('/profile/:id',user_profile);

export default router;