const ImageKey = require("../models/image-model");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

const multer = require("multer");

deleteImage = async (req, res) => {
  const { id } = req.params;

  //check if the key is valid
  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Image was not found" });
  }
  // delete the key from the mongo database
  const key = await ImageKey.findOneAndDelete({ _id: id });

  if (!key) {
    return res.status(400).json({ error: "Image was not found" });
  }

  //delete the file from the directory
  await fs.unlink(path.join("./data/images/", d.key), (err) => {
    if (err) return res.status(404).json({ error: "Image was not found" });
  });

  //send response

  res.status(200).json({
    success: true,
    data: d,
  });
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
    return;
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
    console.log(file);
    cb(null, file.originalname);
  },
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadLocal = multer({ storage: storage });

uploadImage = (req, res) => {
  try {
    postImageKey(req.files[0].originalname, res);
    res
      .status(200)
      .send(
        "Successfully uploaded " +
          req.files.length +
          " files! The keys have been saved in mongo. "
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
