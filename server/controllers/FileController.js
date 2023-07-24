const ImageKey = require("../models/image-model");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { GetObjectCommand, DeleteObjectCommand, HeadObjectCommand, S3Client} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const AWS_S3_BUCKET_NAME = "wallpaperengineimages";
const AWS_S3_ACCESS_KEY_ID = "***REMOVED***";
const AWS_S3_SECRET_ACCESS_KEY = "***REMOVED***";

const AWS_S3_BUCKET_NAME_RESIZED = "wallpaperengineimages-resized";


const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
  },
  endpoint: `http://${AWS_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com`,
  forcePathStyle: true
});
const s3_resized = new S3Client({
  region: "us-east-2",
  credentials: {
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
  },
  endpoint: `http://s3.us-east-2.amazonaws.com`
});

directoryCheck = async (req,res,next) => {
  const user_id = req.user._id
  const directory = `./data/${user_id}`
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
    fs.mkdirSync(directory + '/wallpapers');

  }


  next();

};


deleteImage = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id

  const key = await ImageKey.findOneAndDelete({ _id: id });
  
  console.log(key)

  //delete file from s3
  try {
    const main = await s3.send(new DeleteObjectCommand({Bucket: AWS_S3_BUCKET_NAME, Key: "images/" + key.key }));
    const thumb = await s3_resized.send(new DeleteObjectCommand({Bucket: AWS_S3_BUCKET_NAME_RESIZED, Key: "thumbnails/resized-" + key.key }));
    console.log("Success. Object deleted.", main);
    console.log("Success. Object deleted.", thumb);

  } catch (err) {
    console.log("Error", err);
  }
  

  // delete the key from the mongo database
  // const key = await ImageKey.findOneAndDelete({ _id: id });

  if (!key) {
    return res.status(400).json({ error: "Image was not found" });
  }



  //send response

  res.status(200).json({
    ok: true,
    data: key,
  });
};
getAllImages = async (req, res) => {
  console.log(req.user)
  const user_id = req.user._id;
  const images = await ImageKey.find({user_id});
  res.status(200).json({ ok: true, data: images });
};
getImage = async(req,res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  const key = await ImageKey.find({ _id: id });

  if (!key) {
    return res.status(400).json({ error: "Image was not found" });
  }
  
  res.sendFile(path.join(__dirname +'/../data/images/' + user_id + '/' + key[0].key)); 
  // res.status(200)


}

uploadImageKey = async (req, res) => {

  try {
    const user_id = req.user._id;
    if (!req.files) {
      console.log("no files");
      res.status(400).send({ msg: "No Files" });
    }

    let savedKeys = [];

    for (file of req.files){
      
      const keyName = file.originalname;
      const bucketParams = {
        Bucket: AWS_S3_BUCKET_NAME_RESIZED,
        Key: "thumbnails/resized-" + keyName,
      };
      
      //get the head data to ensure the object exists before requesting the thumbnail
      const head = new HeadObjectCommand(bucketParams);
      const exists = await s3_resized.send(head);

      
      const url = await getSignedUrl(s3_resized, new GetObjectCommand(bucketParams), { expiresIn: 90000 });


      let newKey = new ImageKey({
        key: keyName,
        user_id,
        url:url
      });

      newKey = await newKey.save();

      savedKeys.push(newKey);
    }
    
    res.status(200).json({ ok: true, data: savedKeys });
  } catch (err) {
    console.log(err)
    res.status(404);
  }
};

downloadImages = async (req, res,next ) => {
  console.log('downloading images ')
    const user_id = req.user._id

    const images = await ImageKey.find({user_id});
  var stream;
    for (image of images)
    {
      const key = "images/"+ image.key
      const data = await s3.send(new GetObjectCommand ({Bucket: AWS_S3_BUCKET_NAME, Key: key}));


    stream = await data.Body.pipe(fs.createWriteStream("data/" + user_id + "/" + image.key));

    
    }

    await stream.on("finish", function(){
      next();
    })

}
async function getFileFromS3(key) {
  // parameters for the s3 bucket, convert to dotenv variables before pushing
  const bucketParams = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: key,
  };

  //send the request to get data
  try {
    const data = await s3.send(new GetObjectCommand (bucketParams));

    return data;
  } catch (err) {
    console.log("Error", err);
    return err; //400
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `data/images/${req.user._id}/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadLocal = multer({ storage: storage });

const upload =
  multer({
  storage: multerS3({
    region:"us-east-2",
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, "images/" + file.originalname);
    },
  }),
});




module.exports = {
  deleteImage,
  getAllImages,
  uploadImageKey,
  uploadLocal,
  downloadImages,
  storage,
  directoryCheck,
  getImage,
  upload
};
