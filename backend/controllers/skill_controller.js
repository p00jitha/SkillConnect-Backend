import multer from 'multer';
import path from 'path';
import Skill from '../models/skill_model.js'
import User from '../models/user_model.js'

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/Skills');
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage:storage
}).single('credentials');

//add skills
export const post_skills = async(req,res)=>{
try{
   upload(req,res,async(err)=>{
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Error uploading file" });
    } else if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    const { userId, skillName, description } = req.body;
    let credentials; 
    if(req.file)
    {
      credentials = req.file.filename; 
    }
    let userExist;
    try{
          userExist = await User.findById(userId)
    }
    catch(err)
    {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if(!userExist)
    {
        return res.status(400).json({message:"unable to find user by this id"})
    }
    const skill = new Skill({ userId: userId, skillName: skillName, credentials: credentials, description: description });
    try{
      await skill.save();
    }
    catch(err)
    {
      console.log(err)
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(201).json({ skill });
   })
}
catch(err)
{
  console.log(err)
  return res.status(500).json({ error: "Internal server error" });
}
}


//get skills by users location
export const get_skills = async(req,res)=>{
  const {address} = req.body;
  try{
     const users = await User.find({address});
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found in the specified location' });
    }
    const usersWithSkills = [];
    for (const user of users) {
      const skills = await Skill.find({ userId: user._id });
      if (skills.length > 0) {
        usersWithSkills.push({ user, skills });
      }
    }
    if (usersWithSkills.length > 0) {
      return res.status(200).json({ usersWithSkills });
    } else {
      return res.status(404).json({ message: "No users found with skills in the specified location" });
    }
  }
  catch(err)
  {
    console.log(err)
    return res.status(500).json({ error: "Internal server error" }) 
  }
}

//get skills of specified user
export const user_skills = async(req,res)=>{
  const userId = req.params.id;
  try{
     const users = await User.findById(userId);
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found ' });
    }
    const usersWithSkills = [];
      const skills = await Skill.find({ userId: users._id });
      if (skills.length > 0) {
        usersWithSkills.push({skills });
      }
      return res.status(200).json({ usersWithSkills });
  }
  catch(err)
  {
    console.log(err)
    return res.status(500).json({ error: "Internal server error" }) 
  }
}

//update skills of a user
export const update_skills = async(req,res)=>{
  try{
    upload(req,res,async(err)=>{
     if (err instanceof multer.MulterError) {
       return res.status(400).json({ error: "Error uploading file" });
     } else if (err) {
       return res.status(500).json({ error: "Internal server error" });
     }
     const skillId = req.params.id;
     const {skillName, description } = req.body;
     let credentials; 
     try {
      const skill = await Skill.findById(skillId);
      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }
      if (req.file) {
        credentials = req.file.filename;
        skill.credentials = credentials;
      }
      if (skillName) {
        skill.skillName = skillName;
      }
      if (description) {
        skill.description = description;
      }
      await skill.save();
      return res.status(200).json({ message: 'Skill updated successfully', skill });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  })
 }
 catch(err)
 {
   console.log(err)
   return res.status(500).json({ error: "Internal server error" });
 }
}


//deleting skills
export const delete_skill = async(req,res)=>{
  const { userId, skillId } = req.params;
  console.log(skillId)
   try{
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    if (String(skill.userId) !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this skill' });
    }
    await Skill.findByIdAndDelete(skillId);
    return res.status(200).json({ message: 'Skill deleted successfully' });
   }
   catch(err)
   {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" }) 
   }
}

// export const user_skills = async(req,res)=>{
//   const userId = req.params.id;
//   let userSkills;
//   try{
//       userSkills = await User.findById(userId).populate("skills");
//   }
//   catch(err)
//   {
//       return console.log(err)
//   }
//   if(!userSkills)
//   {
//       return res.status(404).json({massage:"no skills found"});
//   }
//   return res.status(200).json({skills:userSkills.skills})
// }

// export const update_skills = async (req, res) => {
//   try {
//     const { userId, skillId, skillName, description } = req.body;

//     let userExist;
//     try {
//       userExist = await User.findById(userId);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     if (!userExist) {
//       return res.status(400).json({ message: "Unable to find user by this id" });
//     }

//     let skillToUpdate;
//     try {
//       skillToUpdate = await Skill.findById(skillId);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     if (!skillToUpdate) {
//       return res.status(400).json({ message: "Unable to find skill by this id" });
//     }

//     if (String(skillToUpdate.userId) !== userId) {
//       return res.status(403).json({ message: "You are not authorized to update this skill" });
//     }
//     skillToUpdate.skillName = skillName;
//     skillToUpdate.description = description;
//     if (req.file) {
//       skillToUpdate.credentials = req.file.filename;
//     }

//     try {
//       await skillToUpdate.save();
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     res.status(200).json({ message: "Skill updated successfully", skill: skillToUpdate });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const delete_skill = async (req, res) => {
//   try {
//     const { userId, skillId } = req.params;

//     let userExist;
//     try {
//       userExist = await User.findById(userId);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     if (!userExist) {
//       return res.status(400).json({ message: "Unable to find user by this id" });
//     }

//     let skillToDelete;
//     try {
//       skillToDelete = await Skill.findById(skillId);
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     if (!skillToDelete) {
//       return res.status(400).json({ message: "Unable to find skill by this id" });
//     }

//     if (String(skillToDelete.userId) !== userId) {
//       return res.status(403).json({ message: "You are not authorized to delete this skill" });
//     }

//     try {
//       await skillToDelete.remove();
//       userExist.skills = userExist.skills.filter(skill => skill.toString() !== skillId);
//       await userExist.save();
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Internal server error" });
//     }

//     res.status(200).json({ message: "Skill deleted successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
