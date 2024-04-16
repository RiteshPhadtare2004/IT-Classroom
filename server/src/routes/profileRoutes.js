const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/userProfile', profileController.profile);

module.exports = router;

