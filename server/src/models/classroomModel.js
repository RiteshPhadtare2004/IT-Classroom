const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: String, ref: 'User', required: true },
  teacherName: { type: String, required: true },
  students: [{ type: String, ref: 'User' }],
  files: [{ filename: String, url: String, description: String }],
  code:{type:Number}

});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;