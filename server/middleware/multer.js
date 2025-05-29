import multer from "multer";
import multerS3 from "multer-s3";
import s3Clients from "../aws/S3Clients.js";
import { getUserPath } from "../utils/UserPaths.js";


let upload;
if (process.env.DAO_TYPE == 'AWS') {

  const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;


  upload = multer({
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
else {
  //default to using local
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, getUserPath(req.user.id, 'images'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() +  file.originalname);
    },

  })

  upload = multer({ storage: storage })

}
export default upload
