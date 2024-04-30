import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectdatabase from './db/db_connection.js';
import authRoutes from './routes/auth_routes.js';
import skillRoutes from './routes/skill_routes.js';
import profileRoutes from './routes/profile_routes.js'
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
app.use("/api/profile",profileRoutes);

connectdatabase();

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log('server is running');
})

