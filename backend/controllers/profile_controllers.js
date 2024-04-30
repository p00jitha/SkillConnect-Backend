import Skill from '../models/skill_model.js'
import User from '../models/user_model.js'

export const user_profile = async(req,res)=>{
    try{
          const userId = req.params.id;
          const user = await User.findById({userId})
          return res.status(200).json({user});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}