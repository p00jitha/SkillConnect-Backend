import Skill from '../models/skill_model.js'
import User from '../models/user_model.js'

export const user_profile = async(req,res)=>{
    const userId = req.params.id;
    try{
       const users = await User.findById(userId);
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found ' });
      }
      const usersWithSkills = [];
        const skills = await Skill.find({ userId: users._id });
        if (skills.length > 0) {
          usersWithSkills.push({ users, skills });
        }
        return res.status(200).json({ usersWithSkills });
    }
    catch(err)
    {
      console.log(err)
      return res.status(500).json({ error: "Internal server error" }) 
    }
}