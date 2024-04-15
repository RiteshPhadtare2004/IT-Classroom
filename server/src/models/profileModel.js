const mongoose = reguire ('mongoose')

const profileSchema= new mongoose.Schema({
    teacher: {type: String, required: true },
    student: {type: String, required: true}
  });
  

  const Profile = mongoose.model('Profile', profileSchema);
  
  module.exports = profile;