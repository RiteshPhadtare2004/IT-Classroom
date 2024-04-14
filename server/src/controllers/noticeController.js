const Notice = require('../models/noticeModel.js');

exports.createNotice = async (req, res) => {
    try{
        const {title, description} = req.body;

        if(!title && !description){
            return res.status(400).json({ message: "Title and Description is required."});
        }

        const notice = new Notice({title, description, createdBy});
        await newNotice.save();
        res.status(201).json({ message: "Notice created Successfully", notice: newNotice});

    }catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteNotice = async (req, res) => {
    try{
        const noticeId = req.param.id;

        if(!noticeId){
            return res.status(404).json({message: "Notice not found"});
        }

        res.status(201).json({message: "Notice deleted successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
