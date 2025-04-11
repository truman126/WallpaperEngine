const multer = require("multer");
const multerS3 = require("multer-s3");
const s3Clients = require("../aws/S3Clients.js");

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

if (process.env.DAO_TYPE=='AWS'){
  const upload = multer({
    storage: multerS3({
      region: "us-east-2",
      s3: s3Clients.s3FullClient,
      bucket: AWS_S3_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      },
    }),
  });
}


  module.exports = {upload};