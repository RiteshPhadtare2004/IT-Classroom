const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const upload = require('../middleware/s3upload');

// ✅ Get profile by user ID
router.get('/userProfile/:studentId', profileController.profile);

// ✅ Create or update profile (e.g., name, roll, gender, etc.)
router.post('/updateProfile/:studentId', profileController.updateProfile);

// ✅ Upload profile photo using S3 and update profile with image URL
router.post('/uploadPhoto', upload.single('file'), profileController.uploadProfilePicture);

module.exports = router;
