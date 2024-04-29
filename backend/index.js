import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer'
import bodyParser from 'body-parser';
import connectdatabase from './db/db_connection.js';
import authRoutes from './routes/auth_routes.js';
import skillRoutes from './routes/skill_routes.js';
const app = express()

dotenv.config()
app.use(cors({origin:'http://localhost:5173', credentials: true}));
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('public'));

app.use("/api/auth", authRoutes);
app.use("/api/skill",skillRoutes);

connectdatabase();

const multSchema = new mongoose.Schema({
    image: { type: String },
  }); 
  const Mult = mongoose.model('mult', multSchema);
  
  export default Mult;
  
  

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
  })

  app.post('/upload',(upload.single('file')),(req,res)=>{
    Mult.create({image:req.file.filename})
    .then(result=>res.json(result))
    .catch(err=>console.log(err))
 })
  
app.get('/getImage',async(req,res)=>{
    await Mult.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log('server is running');
})

