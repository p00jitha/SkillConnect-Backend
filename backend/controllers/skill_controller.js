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


export const post_skills = async(req,res)=>{
try{
   upload(req,res,async(err)=>{
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Error uploading file" });
    } else if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    const { userId, skillName, description } = req.body;
    const credentials = req.file.filename; 
    const skill = new Skill({ userId: userId, skillName: skillName, credentials: credentials, description: description });
    await skill.save();
    res.status(201).json({ skill });
   })
}
catch(err)
{
  console.log(err)
  return res.status(500).json({ error: "Internal server error" });
}
}



export const get_skills = async(req,res)=>{
  const {address} = req.query;
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

// export const post_skills = async(req,res)=>{
//   const { userId, skillName, credentialsphoto, description } = req.body;
  
//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       const skill = new Skill({ userId:userId, skillName:skillName, credentials:credentials,description:description });
//       await skill.save();
//       res.status(201).json({ skill });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// }

