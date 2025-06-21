const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,

    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const email = req.query.email;
      if (!email) return cb(new Error('Email is required in query'));

      const safeEmail = email.replace(/[@.]/g, '_');
      const fileName = `user_photo_${Date.now()}_${file.originalname}`;
      const finalKey = `users/${safeEmail}/${fileName}`;

      cb(null, finalKey);
    }
  })
});

module.exports = upload;
