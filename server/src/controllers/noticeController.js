const Notice = require('../models/noticeModel.js');
const User = require('../models/userModel.js');

exports.createNotice = async(req,res)=>{
	const {title, description, createdBy, user}= req.body;
	// const userId = req.user.id;
    const currentUser =await User.findById(user)
   
	try{
		// if(currentUser.role != "teacher"){
		// 	return res.status(403).json({message:"U r not the teacher"})
		// }
		
		const notice = new Notice({title,description,createdBy});
		await notice.save()
		res.status(201).json({mesage:'notice is posted'})
	}
	catch{
		res.status(501).json({message:'internal sever error'})
	
	}
}

exports.deleteNotice = async (req, res) => {
    try{
        const noticeId = req.body.noticeId;
        console.log(noticeId)

        if(!noticeId){
            return res.status(404).json({message: "Notice not found"});
        }
        
        await Notice.findByIdAndDelete(noticeId);
        res.status(200).json({message: "Notice deleted successfully"});

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.viewNotice= async (req,res)=>{
    try{
        const notices = Notice.find().

        res.status(201).json(notices);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}