require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { nanoid } = require('nanoid');
const { imagesFolder } = require('../config');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
  Bucket: process.env.AWS_BUCKET_NAME,
});

const fileFilter = (_, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerS3storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  contentDisposition: 'inline',
  acl: 'public-read',
  metadata: function (_, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const imgName = `${Date.now()}-${nanoid()}.${file.mimetype.split('/')[1]}`;

    req.body.img = {
      name: imgName,
      url: `https://donatello-skyticket.s3.eu-north-1.amazonaws.com/${imgName}`,
      originalName: file.originalname,
      mimetype: file.mimetype,
    };

    cb(null, imgName);
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesFolder);
  },
  filename: function (req, file, cb) {
    const imgName = `${Date.now()}-${nanoid()}.${file.mimetype.split('/')[1]}`;

    req.body.img = {
      name: imgName,
      url: `${req.protocol}://${req.headers.host}/images/${imgName}`,
      originalName: file.originalname,
      mimetype: file.mimetype,
    };
    cb(null, req.body.img.name);
  },
});

const upload = multer({
  storage: process.env.NODE_ENV === 'production' ? multerS3storage : storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // we are allowing only 5 MB files
  },
});

module.exports = {
  upload,
  s3,
};
