const User = require('../models/userModel');

exports.profile = async (req, res) => {
    try {
        console.log("abc");
        const { studentId } = req.body;

        const itUser = await User.findOne({ _id: studentId });

        if (!itUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { email, username, role } = itUser;

        res.status(200).json({ email, username, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}