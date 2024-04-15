const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

router.post('/Create', noticeController.createNotice);
router.post('/delete', noticeController.deleteNotice);

module.exports = router;


