const Classroom = require('../models/classroomModel');

exports.createClassroom = async (req, res) => {
  try {
    const { name } = req.body;
    const teacher = req.user;

    if (teacher.role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Only teachers can create classrooms' });
    }

    const classroom = new Classroom({ name, teacher: teacher._id });
    await classroom.save();

    res.status(201).json(classroom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;
    const { filename, path } = req.file;
    const teacher = req.user;

    // Check if the user is a teacher
    if (teacher.role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Only teachers can upload files' });
    }

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Update classroom with file metadata
    classroom.files.push({ filename, url: path });
    await classroom.save();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.joinClassroom = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;
    const student = req.user;

    // Check if the user is a student
    if (student.role !== 'student') {
      return res.status(403).json({ message: 'Forbidden: Only students can join classrooms' });
    }

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Check if student is already enrolled
    if (classroom.students.includes(student._id)) {
      return res.status(400).json({ message: 'Student is already enrolled in the classroom' });
    }

    // Enroll student in the classroom
    classroom.students.push(student._id);
    await classroom.save();

    res.status(200).json({ message: 'Joined classroom successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.viewFiles = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;
    const student = req.user;

    // Check if the user is a student
    if (student.role !== 'student') {
      return res.status(403).json({ message: 'Forbidden: Only students can view files' });
    }

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Return files uploaded in the classroom
    res.status(200).json(classroom.files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};