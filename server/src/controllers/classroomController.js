const Classroom = require('../models/classroomModel');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/upload');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const generateRandomCode = () => {
  return Math.floor(10000 + Math.random() * 90000); 
};

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// console.log("Bucket Name:", process.env.AWS_S3_BUCKET_NAME);
// console.log("Access Key:", process.env.AWS_ACCESS_KEY_ID);


exports.createClassroom = async (req, res) => {
  try {
    const { name,teacherId } = req.body;

    const teacherUser = await User.findOne({_id:teacherId});

    // console.log(teacherUser);

    if (teacherUser.role !== 'teacher') {
      return res.status(403).json({ message: 'Forbidden: Only teachers can create classrooms' });
    }
    const code = generateRandomCode(); 
    const classroom = new Classroom({ code,name, teacher: teacherUser._id, teacherName: teacherUser.username });
    await classroom.save();

    
    res.status(201).json(classroom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { title, description } = req.body;

    // S3 info from multerS3
    const fileUrl = req.file.location; // S3 file URL
    const fileName = req.file.originalname;

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    // Save file info to DB
    classroom.files.push({
      filename: fileName,
      title,
      description,
      url: fileUrl
    });

    await classroom.save();

    res.status(200).json({ message: 'File uploaded to S3 successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
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

const baseUrl = 'http://localhost:3000'; // Your server's base URL

exports.viewFiles = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;
    const classroom = await Classroom.findById(classroomId);
    
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }
    
    // Construct file URLs
    const filesWithUrls = classroom.files.map(file => ({
      ...file.toObject(),
      url: file.url // Construct URL for accessing the file
    }));

    res.status(200).json(filesWithUrls);
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

exports.getTeacherClassrooms = async (req, res) => {
  try {
    const {teacherId} = req.params;

        const classrooms = await Classroom.find({ teacher: teacherId });
        // console.log(classrooms);

    res.status(200).json(classrooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteClassroom = async(req,res)=>{
  try{
    const {classroomId} = req.params;
    console.log('classroom id: '+classroomId)

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
};


exports.deleteFile = async (req, res) => {
  try {
    const { classroomId, fileId } = req.params;

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    const fileIndex = classroom.files.findIndex(f => f._id.toString() === fileId);
    if (fileIndex === -1) {
      return res.status(404).json({ message: 'File not found' });
    }

    const file = classroom.files[fileIndex];
    const s3Key = decodeURIComponent(new URL(file.url).pathname.substring(1));

    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
    }).promise();

    classroom.files.splice(fileIndex, 1);
    await classroom.save();

    res.status(200).json({ message: 'File deleted from MongoDB and S3' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

