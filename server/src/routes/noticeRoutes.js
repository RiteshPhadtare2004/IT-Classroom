const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.post('/createNotice', noticeController.createNotice);
router.delete('/deleteNotice/:noticeId', noticeController.deleteNotice);
router.get('/viewNotice',noticeController.viewNotice)

module.exports = router;


