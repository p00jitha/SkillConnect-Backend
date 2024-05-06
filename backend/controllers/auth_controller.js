import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../models/user_model.js'
import multer from 'multer';
import path from 'path';
import TokenAndCookie from '../utils/generateToken.js'
import userOTPverification from '../models/userOTPverification.js';

dotenv.config();

 const transporter = nodemailer.createTransport({
   service: 'gmail',
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
   auth: {
     user: process.env.AUTH_EMAIL,
     pass: process.env.AUTH_PASS,
   }, 
 });

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
        verified:false,
      });

      if(newUser)
        {
        await newUser.save()
        .then((result)=>{
         sendOTPverification(result,res);
        })
       
        }
        else
        {
         res.status(400).json({error:"Invalid user data"})
        }
    })
  }
  catch(err)
  {
    console.log(err)
    return res.status(500).json({ error: "Internal server error" });
  }
}

const sendOTPverification = async({_id,email},res)=>{
  try{
     const otp = `${Math.floor(10000+Math.random()*9000)}`;
     const mailOptions = {
        from:process.env.AUTH_EMAIL,
        to:email,
        subject:"verify your email",
        html:`<p>Enter <b>${otp} in the app to verify your email address</b></p>
        <p>This code expires in 1hr</p>`
     }
     const hashedOTP = await bcrypt.hash(otp,10)
     const newOTPverification = await new userOTPverification({
        userId:_id,
        otp:hashedOTP,
        createdAt:Date.now(),
        expiresAt:Date.now()+3600000,
     })
     await newOTPverification.save();
     await transporter.sendMail(mailOptions);
     res.json({
        status:"pending",
        message:"verification otp email sent",
        data:{
           userId:_id,
           email
        }
     })
  }
  catch(err)
  {
     console.log(err)
  }
}

export const otpverification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({ error: "Enter OTP and Email" });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ error: "User with this email does not exist" });
      } else {
        const UserVerificationRecords = await userOTPverification.find({ userId: user._id });
        if (UserVerificationRecords.length <= 0) {
          res.status(400).json({ error: "No verification record found for this email" });
        } else {
          const { expiresAt, otp: hashedOTP } = UserVerificationRecords[0];
          if (expiresAt < Date.now()) {
            await userOTPverification.deleteMany({ userId: user._id });
            res.status(400).json({ error: "Code has expired. Please Signup again." });
          } else {
            const validOTP = await bcrypt.compare(otp, hashedOTP);
            if (!validOTP) {
              res.status(400).json({ error: "Invalid code passed. Check your inbox." });
            } else {
              await User.updateOne({ _id: user._id }, { verified: true });
              await userOTPverification.deleteMany({ userId: user._id });
              res.json({
                status: "verified",
                message: "User email verified successfully",
              });
            }
          }
        }
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ error: "User with this email does not exist" });
      } else {
        await userOTPverification.deleteMany({ userId: user._id });
        sendOTPverification({ _id: user._id, email }, res);
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// export const otpverification = async(req,res)=>{
//   try{
//      let {userId,otp} = req.body;
//      if(!userId || !otp)
//      {
//         res.status(400).json({error:"Enter OTP"})
//      }
//      else
//      {
//         const UserVerificationRecords = await userOTPverification.find({userId});
//         if(UserVerificationRecords.length<=0)
//         {
//            res.status(400).json({error:"Acc record doesn't exist or has been verified already.Please Login"})
//         }
//         else
//         {
//            const {expiresAt} = UserVerificationRecords[0];
//            const hashedOTP = UserVerificationRecords[0].otp;
//            if(expiresAt<Date.now())
//            {
//               await userOTPverification.deleteMany({userId});
//               res.status(400).json({error:"Code has expired. Please Signup again."})
//            }
//            else
//            {
//               const validOTP = await bcrypt.compare(otp,hashedOTP)
//               if(!validOTP)
//               {
//                  res.status(400).json({error:"Invalid code passed. Check your inbox."})
//               }
//               else
//               {
//                  await User.updateOne({_id:userId},{verified:true});
//                  await userOTPverification.deleteMany({userId});
//                  res.json({
//                     status:"verified",
//                     message:"user email verified successfully",
//                  })
//               }
//            }
//         }
//      }
//   }catch(err)
//   {
//      res.status(400).json({error:"error"})
//      console.log(err)
//   }
// }

// export const resendOTP = async(req,res)=>{
//   try{
//      let {userId,email} = req.body;
//      if(!userId || !email)
//      {
//         res.status(500).json({error:"Empty user details are not allowed"})
//      }
//      else
//      {
//         await userOTPverification.deleteMany({userId});
//         sendOTPverification({_id:userId,email},res);
//      }
//   }
//   catch(error)
//   {
//      res.json({
//         status:"FAILED",
//         message:error.message
//      });
//   }
// }

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