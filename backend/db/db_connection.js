import mongoose from 'mongoose';

const connectdatabase = async()=>{
    try{
      const DB_URL = process.env.DB_URL
      await mongoose.connect(DB_URL);
      console.log('connected to database')
    }
    catch(err)
    {
        console.log(err)
    }
}
export default connectdatabase;