const User = require('../models/userModel');

exports.profile = async (req, res) => {
    try {
        // console.log("abc");
        const { studentId } = req.params;

        const itUser = await User.findOne({ _id: studentId });

        if (!itUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { _id, email, username, role } = itUser;

        res.status(200).json({ _id, email, username, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}