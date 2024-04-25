import bcrypt from 'bcrypt'
import https from 'https'
import User from '../models/user_model.js'

export const signup = async(req,res)=>{
    try
    {
       const {username,email,password,confirmPassword,profilePic,location} = req.body
       const key = process.env.API_KEY
       const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location},IN&limit=1&appid=${key}`;
       https.get(url,async function(response)
       {
           let latitude,longitude;
           console.log(response.statusCode);
           response.on("data",function(data){
            const wd=JSON.parse(data);
             latitude=wd[0].lat;
             longitude=wd[0].lon;
           })
           if(password!==confirmPassword)
           {
             return res.status(400).json({ error: "Passwords don't match" })
           }
           const user = await User.findOne({email});
           if (user) {
             return res.status(400).json({ error: "Username already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            const newUser = new User({
                email,
                username,
                password:hashedPassword,
                profilePic,
                address:location,
                latitude:latitude,
                longitude:longitude
            })
                if(newUser)
                {
                  await newUser.save()
                  res.status(200).json({_id:newUser._id,email:newUser.email,profilePic:newUser.profilePic,lat:newUser.latitude,lan:newUser.longitude})
                }
                else
                {
                  return res.status(400).json({ error: "Invalid user" })
                }
       })
    }
    catch(err)
    {
     console.log(err)
     return res.status(500).json({ error: "Internal server error" })
    }
 }

 export const login = async(req,res)=>{
    try
    {
      const {email,password} = req.body;
      const user = await User.findOne({email});
      if(!user)
      {
        return res.status(400).json({ error: "Invalid user" })
      }
      const isPasswordcorrect = await bcrypt.compare(password,user.password)
      if(!isPasswordcorrect)
      {
        return res.status(400).json({ error: "Invalid password" })
      }
      res.status(200).json({_id:user._id,username:user.username,email:user.email,profilePic:user.profilePic,address:user.address,latitude:user.latitude,longitude:user.longitude})
    }
    catch(err)
    {
      console.log(err)
      return res.status(500).json({ error: "Internal server error" })
    }
  }

  export const allusers = async(req,res)=>{
    try{
      const users = await User.find({});
      if(!users)
      {
        return res.status(400).json({ error: "No users" })
      }
      res.status(200).json({users})
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })  
    }
  }