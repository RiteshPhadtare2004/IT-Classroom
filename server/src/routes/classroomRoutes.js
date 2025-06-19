const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');
const authMiddleware = require('../middleware/authMiddleware');

// 👇 Use the new upload middleware for S3
const upload = require('../middleware/upload');

// Create classroom
router.post('/create', classroomController.createClassroom);

// Delete classroom
router.delete('/delete/:classroomId', classroomController.deleteClassroom);

// ✅ Upload file to S3 (IMPORTANT: This is now using multer-s3)
router.post('/upload/:classroomId', upload.single('file'), classroomController.uploadFile);

// Join classroom
router.post('/join', classroomController.joinClassroom);

// View files in classroom
router.get('/files/:classroomId', classroomController.viewFiles);

// Get classrooms for a student
router.get('/displayClassroom/:studentId', classroomController.displayClassroom);

// Get classrooms for a teacher
router.get('/displayTeacherClassroom/:teacherId', classroomController.getTeacherClassrooms);

// (Optional) Default route for classroom
router.get('/home', classroomController.displayClassroom);

module.exports = router;
