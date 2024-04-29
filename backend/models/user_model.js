import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  phoneno:{type:Number, required: true},
  address:{type:String, required:true}
});

userSchema.index({ location: '2dsphere' }); 
const User = mongoose.model('User', userSchema);

export default User;




// import mongoose from 'mongoose'
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   avatar: {
//     type: String
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = User = mongoose.model('users', userSchema);

// import mongoose from 'mongoose'
// import Skill from './skill_model.js'

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     gender:{
//         type:String,
//         required:true,
//         enum:["male","female"]
//     },
//     profilePic:{
//         type:String,
//         default:"",
//     },
//     city: {
//         type: String,
//         required: true
//     },
//     district: {
//         type: String,
//         required: true
//     },
//     state: {
//         type: String,
//         required: true
//     },
//     pincode: {
//         type: String,
//         required: true
//     }, 
//     skills: [Skill]
// });


// const User = mongoose.model('User', userSchema);

// export default User;

