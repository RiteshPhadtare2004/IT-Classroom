const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.post('/createNotice', noticeController.createNotice);
router.delete('/deleteNotice', noticeController.deleteNotice);

module.exports = router;


