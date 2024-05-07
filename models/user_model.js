import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  phoneno:{type:Number, required: true},
  address:{type:String, required:true},
  verified:Boolean 
});
const User = mongoose.model('User', userSchema);

export default User;




