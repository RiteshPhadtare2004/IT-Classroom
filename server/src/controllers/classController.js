const Classroom = require('../models/classroomModel');

exports.createClassroom = async (req, res) => {
    try {
        const { name } = req.body;
        const teacher = req.userId; // Assuming userId is attached by auth middleware
    
        const classroom = new Classroom({ name, teacher });
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
    
        // Save file metadata to the database
        const updatedClassroom = await Classroom.findByIdAndUpdate(
          classroomId,
          { $push: { files: { filename, url: path } } },
          { new: true }
        );
    
        res.status(200).json(updatedClassroom);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

exports.joinClassroom = async (req, res) => {
    try {
        const classroomId = req.params.classroomId;
        const studentId = req.userId; // Assuming userId is attached by auth middleware
    
        // Check if the student is already enrolled in the classroom
        const classroom = await Classroom.findById(classroomId);
        if (classroom.students.includes(studentId)) {
          return res.status(400).json({ message: 'Student is already enrolled in the classroom' });
        }
    
        // Enroll the student in the classroom
        classroom.students.push(studentId);
        await classroom.save();
    
        res.status(200).json(classroom);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};
