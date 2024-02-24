require("dotenv").config();
const {
    S3Client
  } = require("@aws-sdk/client-s3");

const AWS_S3_BUCKET_NAME_RESIZED = process.env.AWS_S3_BUCKET_NAME_RESIZED;
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID;
const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;


const s3FullClient = new S3Client({
    region: "us-east-2",
    credentials: {
      secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
      accessKeyId: AWS_S3_ACCESS_KEY_ID,
    },
    endpoint: `http://${AWS_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com`,
    forcePathStyle: true,
  });

  const s3ThumbnailClient = new S3Client({
    region: "us-east-2",
    credentials: {
      secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
      accessKeyId: AWS_S3_ACCESS_KEY_ID,
    },
    endpoint: `http://s3.us-east-2.amazonaws.com`,
    forcePathStyle: true,
  });


  

  module.exports = {s3FullClient, s3ThumbnailClient};