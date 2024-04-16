const mongoose = reguire ('mongoose')

const profileSchema= new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: {type: String, required: true, unique: true },
    role: { type: String, enum: ['teacher', 'student'], required: true }
  });
  

  const Profile = mongoose.model('Profile', profileSchema);
  
  module.exports = Profile;