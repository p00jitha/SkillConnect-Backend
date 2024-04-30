import bcrypt from 'bcrypt'
import https from 'https'
import User from '../models/user_model.js'
import multer from 'multer';
import path from 'path';
import TokenAndCookie from '../utils/generateToken.js'

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/Images');
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage:storage
}).single('profilePic'); 

export const signup = async(req,res)=>{
  try{
    upload(req,res,async(err)=>{
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "Error uploading file" });
      } else if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      const {username, email, password, confirmPassword, phoneno, address} = req.body;
      let profilePic;
      if (req.file) {
        profilePic = req.file.filename;
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords don't match" });
      }
      const existingUser = await User.findOne({email});
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        profilePic,
        phoneno,
        address,
      });
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        profilePic: newUser.profilePic,
        phoneno: newUser.phoneno,
        address,
      });
    })
  }
  catch(err)
  {
    console.log(err)
    return res.status(500).json({ error: "Internal server error" });
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
      TokenAndCookie(user._id,res);
      res.status(200).json({user:user})
    }
    catch(err)
    {
      console.log(err)
      return res.status(500).json({ error: "Internal server error" })
    }
  }

export const logout = (req,res)=>{
    try{
      res.cookie("jwt"," ",{maxAge:0})
      return res.status(200).json({ message: "Logged out successfully" })
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