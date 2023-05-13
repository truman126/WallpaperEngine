const ImageKey = require("../models/image-model");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const fs = require("fs");
const multer = require("multer");
const multerS3 = require("multer-s3");

const AWS_S3_BUCKET_NAME = "wallpaperengineimages";
const AWS_S3_ACCESS_KEY_ID = "***REMOVED***";
const AWS_S3_SECRET_ACCESS_KEY = "***REMOVED***";
makeWallpapers = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Something went wrong trying to create your wallpapers. E1",
    });
  }
  res.status(404).send({
    success: false,
    error: `Images not found.`,
  });
  res.status(400).send({
    success: false,
    error: `Error: 404`,
  });

  const allImages = await Image.find();

  if (body.colour == "average") {
  }

  res.status(200).send({
    success: true,
  });
};

createWallpaper = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an image",
    });
  }

  const image = new Image(body);

  if (!image) {
    return res.status(400).json({ success: false, error: err });
  }

  image
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: image._id,
        message: "Image created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Image not created!",
      });
    });
};

editWallpaper = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Image.findOne({ _id: req.params.id }, (err, image) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Image not found!",
      });
    }
    image.name = body.name;
    image
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: image._id,
          message: "image updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "image not updated!",
        });
      });
  });
};

deleteWallpaper = async (req, res) => {
  try {
    let d = await ImageKey.findOneAndDelete({ _id: req.params.id });

    if (!d) {
      res.status(404).json({
        success: false,
        error: `Image not found`,
      });
    }
    else
    {res.status(200).json({
      success: true,
      data: d,
    });}
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};
getAllImages = async (req, res) => {
  try {
    const keys = await ImageKey.find();
    if (!keys) {
      res.status(404).send({
        success: false,
        error: `Images not found.`,
      });
    }
    res.status(200).send({
      success: true,
      data: keys,
    });
  } catch {
    res.status(400).send({
      success: false,
      error: `Error: 404`,
    });
  }
};

async function getFileFromS3(key) {
  // parameters for the s3 bucket, convert to dotenv variables before pushing
  const bucketParams = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: key,
  };

  //send the request to get data
  try {
    const data = await s3.send(new GetObjectCommand(bucketParams));

    return data;
  } catch (err) {
    console.log("Error", err);
    return err; //400
  }
}

async function postImageKey(key, res) {
  try {
    if (!key) {
      console.log("no image");
      return res.status(400).send({ msg: "No Image" });
    }
    let newKey = new ImageKey({
      key,
    });
    console.log("attempting to save to mongo");
    newKey = await newKey.save();
    console.log("uploaded");
    return;
  } catch (err) {
    console.log("error");
    res.status(500).send({ error: err.message });
    return err;
  }
}

const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
  },
  endpoint: `http://${AWS_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com`,
  forcePathStyle: true,
});

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: AWS_S3_BUCKET_NAME,
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, "images/" + file.originalname);
//     },
//   }),
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/images/')
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null,file.originalname);
  },
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
})
const uploadLocal = multer({ storage: storage});

uploadImage = (req, res) => {
  
  try{
    postImageKey(req.files[0].originalname, res);
    res
      .status(200)
      .send(
        "Successfully uploaded " +
          req.files.length +
          " files! The keys have been saved in mongo. "
      );
  }


  catch(err) {
    res.status(404)
  }
};
module.exports = {
  makeWallpapers,
  createWallpaper,
  editWallpaper,
  deleteWallpaper,
  getAllImages,
  uploadImage,
  uploadLocal,
  storage
};
