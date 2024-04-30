import express from 'express'
import {delete_skill, get_skills,post_skills,update_skills,user_skills} from '../controllers/skill_controller.js'
const router = express.Router()

router.get('/skills',get_skills);
router.post('/add_skills',post_skills);
router.get('/myskills/:id',user_skills);
router.put('/update/:id',update_skills);
router.delete('/delete/:id',delete_skill)

export default router;