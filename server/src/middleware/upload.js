const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mime = require('mime-types'); // to detect content-type

// AWS S3 config
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Multer upload middleware
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,

    // ✅ Set metadata (optional)
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },

    // ✅ Set custom content headers
    contentDisposition: 'inline', // 👈 this is the key for viewing in browser

    contentType: multerS3.AUTO_CONTENT_TYPE, // or use mime.lookup(file.originalname)

    key: function (req, file, cb) {
      const filename = Date.now().toString() + '-' + file.originalname;
      cb(null, filename);
    }
  })
});

module.exports = upload;
