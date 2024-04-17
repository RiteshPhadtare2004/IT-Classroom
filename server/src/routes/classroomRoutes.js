const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const classroomController = require('../controllers/classroomController');

router.post('/create', classroomController.createClassroom);

router.delete('/delete',classroomController.deleteClassroom)

router.post('/upload/:classroomId', authMiddleware, classroomController.uploadFile);

router.post('/join',  classroomController.joinClassroom);

router.get('/files/:classroomId', authMiddleware, classroomController.viewFiles);

router.get('/displayClassroom/:studentId',classroomController.displayClassroom);

router.get('/home', classroomController.displayClassroom);

module.exports = router;