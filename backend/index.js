import express from 'express';
import dotenv from 'dotenv';
import connectdatabase from './db/db_connection.js';
import authRoutes from './routes/auth_routes.js';
import skillRoutes from './routes/skill_routes.js';
const app = express()

dotenv.config()
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/skill",skillRoutes);

connectdatabase();

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log('server is running');
})

