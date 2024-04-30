import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  skillName: { type: String, required: true },
  description:{type:String,required:true},
  credentials: { type: String}
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;