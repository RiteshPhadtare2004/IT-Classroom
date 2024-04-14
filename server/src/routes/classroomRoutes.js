const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const classroomController = require('../controllers/classroomController');


// Teacher routes
router.post('/create', authMiddleware, classroomController.createClassroom);
router.post('/upload/:classroomId', authMiddleware, classroomController.uploadFile);

// Student routes
router.post('/join/:classroomId', authMiddleware, classroomController.joinClassroom);
router.get('/files/:classroomId', authMiddleware, classroomController.viewFiles);

module.exports = router;
