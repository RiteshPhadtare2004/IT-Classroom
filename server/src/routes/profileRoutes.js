const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// GET profile
router.get('/userProfile/:studentId', profileController.profile);

// POST update/create profile
router.post('/updateProfile/:studentId', profileController.updateProfile);

module.exports = router;
