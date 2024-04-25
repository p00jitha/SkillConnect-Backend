import Skill from '../models/skill_model.js'
import User from '../models/user_model.js'

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
      usersWithSkills.push({ user, skills });
    }
    return res.status(200).json({usersWithSkills});
  }
  catch(err)
  {
    console.log(err)
    return res.status(500).json({ error: "Internal server error" }) 
  }
}

export const post_skills = async(req,res)=>{
  const { userId, skillName, credentials, description } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const skill = new Skill({ userId:userId, skillName:skillName, credentials:credentials,description:description });
      await skill.save();
      res.status(201).json({ skill });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
}

// exports.getSkillsByLocation = async (req, res) => {
//   const { latitude, longitude, radius } = req.query;
//   try {
//     const user = await User.findOne({
//       location: {
//         $near: {
//           $geometry: {
//             type: 'Point',
//             coordinates: [parseFloat(longitude), parseFloat(latitude)]
//           },
//           $maxDistance: parseInt(radius) * 1000 // Convert to meters
//         }
//       }
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const skills = await Skill.find({ userId: user._id });

//     res.json({ skills });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


// router.post('/skills', async (req, res) => {
//     const { userId, skillName, credentials, description } = req.body;
  
//     try {
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       const skill = new Skill({ userId, skillName, credentials,description });
//       await skill.save();
//       res.status(201).json({ skill });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   });