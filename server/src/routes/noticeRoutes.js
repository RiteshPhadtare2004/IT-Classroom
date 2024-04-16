const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.post('/createNotice', noticeController.createNotice);
router.delete('/deleteNotice', noticeController.deleteNotice);
router.get('/viewNotice',noticeController.viewNotice)

module.exports = router;


