const User = require('../models/userModel');

exports.profile = async(res, req)=>{
    try{
        const {studentId} = req.body;

        const itUser = await User.findOne({_id: studentId});

        if(!itUser){
            return res.status(404).json({message: 'user not found'});
        }

        const {email, name, role} =itUser;

        res.status(200).json({email, name, role});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Internal server error '})
    }
}