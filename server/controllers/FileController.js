const ImageKey = require("../models/image-model");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
 
const multer = require("multer");

deleteImage = async (req, res) => {
  console.log('attempting to delete from server side')
  const { id } = req.params;

  // delete the key from the mongo database
  const key = await ImageKey.findOneAndDelete({ _id: id });

  if (!key) {
    return res.status(400).json({ error: "Image was not found" });
  }

  //delete the file from the directory
  await fs.unlink(path.join("./data/images/", key.key), (err) => {
    if (err) console.log(err);
  });

  //send response

  res.status(200).json({
    ok: true,
    data: key,
  });
};
getAllImages = async (req, res) => {
  const images = await ImageKey.find();
  res.status(200).json({ok:true, data: images})
};

async function postImageKey(key, res) {
  try {
    if (!key) {
      console.log("no image");
      return res.status(400).send({ msg: "No Image" });
    }
    let newKey = new ImageKey({
      key,
    });
    newKey = await newKey.save();
    return newKey;
  } catch (err) {
    console.log("error");
    res.status(500).send({ error: err.message });
    return err;
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "data/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadLocal = multer({ storage: storage });

uploadImage = async (req, res) => {
  try {
    const response = await postImageKey(req.files[0].originalname, res);
    res
      .status(200)
      .json(
        {ok:true,
        data: response
      }
      );
  } catch (err) {
    res.status(404);
  }
};
module.exports = {
  deleteImage,
  getAllImages,
  uploadImage,
  uploadLocal,
  storage,
};
