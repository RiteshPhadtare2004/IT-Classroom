const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  email:         { type: String, required: true },
  name:          { type: String, required: true },
  role:          { type: String, enum: ['teacher', 'student'], required: true },
  roll:          { type: String },
  academicYear:  { type: String },
  gender:        { type: String },
  bio:           { type: String }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
