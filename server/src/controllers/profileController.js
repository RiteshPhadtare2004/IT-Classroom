const User = require('../models/userModel');
const Profile = require('../models/profileModel');

exports.profile = async (req, res) => {
  try {
    const { studentId } = req.params;

    const user = await User.findById(studentId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let profile = await Profile.findOne({ userId: studentId });

    // If no separate profile yet, return base user data
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

    let user = await User.findById(studentId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let profile = await Profile.findOne({ userId: studentId });

    if (!profile) {
      // Create new profile
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
      // Update existing profile
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
