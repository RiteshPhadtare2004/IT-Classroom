const Classroom = require('../models/classroomModel');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');

const generateRandomCode = () => {
  return Math.floor(10000 + Math.random() * 90000); 
};


exports.createClassroom = async (req, res) => {
  try {
    const { name,teacherId } = req.body;

    const teacherUser = await User.findOne({_id:teacherId});

    // console.log(teacherUser);

    if (teacherUser.role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Only teachers can create classrooms' });
    }
    const code = generateRandomCode(); 
    const classroom = new Classroom({ code,name, teacher: teacherUser._id  });
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
    const { filename, path: filePath } = req.file;
    const { title, description, teacherId } = req.body;

    // Find the classroom
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      fs.unlinkSync(filePath); // Delete the uploaded file
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Move the file to the desired location
    const uploadDir = path.join(__dirname, '../uploads'); // Assuming uploads folder exists
    const newFilePath = path.join(uploadDir, filename);
    fs.renameSync(filePath, newFilePath);

    // Add file details to the classroom
    classroom.files.push({ filename, title, description, url: newFilePath });
    await classroom.save();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.joinClassroom = async (req, res) => {
  try {
    const {studentId,classCode} = req.body;
   
    const studentUser = await User.findOne({_id:studentId})
    
    if (studentUser.role !== 'student') {
      return res.status(403).json({ message: 'Forbidden: Only students can join classrooms' });
    }

    const classroom = await Classroom.findOne({code:classCode});
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    if (classroom.students.includes(studentUser._id)) {
      return res.status(400).json({ message: 'Student is already enrolled in the classroom' });
    }

    
      classroom.students.push(studentUser._id);
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

exports.displayClassroom= async (req,res)=>{
  try{
      const {studentId} = req.params;
      
      // const studentUser = await User.findOne({_id:studentId});
      const classrooms = await Classroom.find({ students: studentId });
      res.status(200).json(classrooms);
  }

  catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.deleteClassroom = async(req,res)=>{
  try{
    const {classroomId} = req.body;
    console.log(classroomId)

        if(!classroomId){
            return res.status(404).json({message: "classroom not found"});
        }
        
        await Classroom.findByIdAndDelete(classroomId);
        res.status(200).json({message: "Classroom deleted successfully"});

  }
  catch(error){
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
}