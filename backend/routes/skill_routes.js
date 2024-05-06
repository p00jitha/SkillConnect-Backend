import express from 'express'
import {delete_skill, get_skills,post_skills,update_skills,user_skills,getuserskill} from '../controllers/skill_controller.js'
const router = express.Router()

router.post('/skills',get_skills);
router.post('/add_skills',post_skills);
router.get('/:id',user_skills);
router.get('/userskill/:id',getuserskill)
router.put('/update/:id',update_skills);
router.delete('/:userId/:skillId',delete_skill)

export default router;