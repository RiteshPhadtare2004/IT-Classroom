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

    
    if (teacher.role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Only teachers can upload files' });
    }

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    
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

  
    if (student.role !== 'student') {
      return res.status(403).json({ message: 'Forbidden: Only students can join classrooms' });
    }

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    if (classroom.students.includes(student._id)) {
      return res.status(400).json({ message: 'Student is already enrolled in the classroom' });
    }

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

    if (student.role !== 'student') {
      return res.status(403).json({ message: 'Forbidden: Only students can view files' });
    }

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }


    res.status(200).json(classroom.files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};