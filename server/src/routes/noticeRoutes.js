const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.post('/createNotice', noticeController.createNotice);
router.post('/deleteotice', noticeController.deleteNotice);

module.exports = router;


