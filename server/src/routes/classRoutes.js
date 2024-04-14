const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, classroomController.createClassroom);
router.post('/upload/:classroomId', authMiddleware, classroomController.uploadFile);
router.post('/join/:classroomId', authMiddleware, classroomController.joinClassroom);

module.exports = router;
