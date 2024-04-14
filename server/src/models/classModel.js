const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  files: [{ filename: String, url: String }]
  // Add other classroom fields as needed
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
