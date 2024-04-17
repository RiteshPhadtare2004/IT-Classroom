const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const classroomController = require('../controllers/classroomController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads')); // Destination folder for file uploads
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // File naming strategy
    }
  });
  
  const upload = multer({ storage });
  

router.post('/create', classroomController.createClassroom);

router.delete('/delete',classroomController.deleteClassroom)

router.post('/upload/:classroomId',upload.single('file'), classroomController.uploadFile);

router.post('/join',  classroomController.joinClassroom);

router.get('/files/:classroomId', classroomController.viewFiles);

router.get('/displayClassroom/:studentId',classroomController.displayClassroom);

router.get('/home', classroomController.displayClassroom);

module.exports = router;