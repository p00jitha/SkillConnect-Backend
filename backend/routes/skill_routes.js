import express from 'express'
import {get_skills,post_skills} from '../controllers/skill_controller.js'
const router = express.Router()

router.get('/skills',get_skills);
router.post('/skills',post_skills);

export default router;