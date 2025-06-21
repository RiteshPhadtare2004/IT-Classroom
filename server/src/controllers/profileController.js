const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const AWS = require('aws-sdk');

// S3 instance for deleting old images
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.profile = async (req, res) => {
  try {
    const { studentId } = req.params;

    const user = await User.findById(studentId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const profile = await Profile.findOne({ userId: studentId });

    if (!profile) {
      return res.status(200).json({
        name: user.username,
        email: user.email,
        role: user.role,
        userId: user._id
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { name, email, role, roll, academicYear, gender, bio } = req.body;

    const user = await User.findById(studentId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let profile = await Profile.findOne({ userId: studentId });

    if (!profile) {
      profile = new Profile({
        userId: studentId,
        name,
        email,
        role,
        roll,
        academicYear,
        gender,
        bio
      });
    } else {
      profile.name = name;
      profile.email = email;
      profile.role = role;
      profile.roll = roll;
      profile.academicYear = academicYear;
      profile.gender = gender;
      profile.bio = bio;
    }

    await profile.save();
    return res.status(200).json({ message: 'Profile saved successfully!' });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    const email = req.query.email;

    if (!req.file || !req.file.location) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = req.file.location;

    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (profile.profilePicture) {
      try {
        const oldKey = new URL(profile.profilePicture).pathname.substring(1);
        await s3.deleteObject({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: oldKey
        }).promise();
      } catch (err) {
        console.warn('Failed to delete old profile picture from S3:', err.message);
      }
    }

    // Save new profile picture URL
    profile.profilePicture = fileUrl;
    await profile.save();

    return res.status(200).json({ message: 'Profile picture uploaded successfully!', imageUrl: fileUrl });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};
