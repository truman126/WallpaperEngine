require("dotenv").config();
const fs = require("fs");
const path = require("path");
const ImageKey = require("../models/image-model");
const S3Controller = require("../aws/S3Controller");
const s3Clients = require("../aws/S3Clients.js");

/**
 * TODO:
 * - Eventually move bucket names into the S3Controller to limit references to the aws directory
 *  
 */

// DELETE '/api/images/:id'
deleteImage = async (req, res) => {
  //Image id to delete
  const { id } = req.params;

  // Delete the image from MongoDB
  const key = await ImageKey.findOneAndDelete({ _id: id });

  // If no key exists when trying to delete in Mongo, throw error
  if (!key) {
    return res.status(400).json({ error: "Image was not found" });
  }

  // Delete the full image and the thumbnail from S3
  try {
    const fullImageParams = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key.key,
    };
    const thumbnailImageParams = {
      Bucket: AWS_S3_BUCKET_NAME_RESIZED,
      Key: "thumbnails/resized-" + key.key,
    };
    S3Controller.deleteFullImageFromS3(fullImageParams);
    S3Controller.deleteThumbnailImageFromS3(thumbnailImageParams);
  } catch (err) {
    console.log("Error", err);
  }

  // Respond with deleted key
  res.status(200).json({
    ok: true,
    data: key,
  });
};

// DELETE '/api/allimages'
deleteAllImages = async (req, res) => {
  const user_id = req.user._id;

  // Find all the image keys in mongo from the user
  const images = await ImageKey.find({ user_id });

  // No images, throw error
  if (!images) {
    return res
      .status(400)
      .json({ error: "Images were not found from this user" });
  }
  // Create parameters for s3 deletion functions
  const fullImageDeleteParams = {
    Bucket: AWS_S3_BUCKET_NAME,
    Delete: { Objects: [] },
  };
  const thumbnailImageDeleteParams = {
    Bucket: AWS_S3_BUCKET_NAME_RESIZED,
    Delete: { Objects: [] },
  };

  // Loop through the mongo keys and add them to the S3 params
  for (image in images) {
    fullImageDeleteParams.Delete.Objects.push({ Key: images[image].key });
    thumbnailImageDeleteParams.Delete.Objects.push({
      Key: `thumbnails/resized-${images[image].key}`,
    });
  }

  // Delete all the S3 Full images and thumbnails
  try {
    S3Controller.deleteAllFullImagesFromS3(fullImageDeleteParams);
    S3Controller.deleteAllThumbnailImagesFromS3(thumbnailImageDeleteParams);
  } catch (err) {
    console.log("Error", err);
  }

  // Deletes all the image keys associated with the user from MongoDB
  const keys = await ImageKey.deleteMany({ user_id });

  // Send response
  res.status(200).json({
    ok: true,
  });
};

// GET '/api/allimages'
getAllImages = async (req, res) => {
  const user_id = req.user._id;

  // Get all the images from the user in Mongo
  const images = await ImageKey.find({ user_id });

  // Send response, return image keys
  res.status(200).json({ ok: true, data: images });
};

// POST '/api/upload'
uploadImageKey = async (req, res) => {
  try {
    const user_id = req.user._id;

    if (!req.files) {
      res.status(400).send({ msg: "No Files" });
    }

    /* This is the array of uploaded images. 
    Returns the mongo record of the image so that the thumbnail and name can be accessed.
    */
    let savedKeys = [];

    for (file of req.files) {
      let thumb_url = null;
      const keyName = file.key;

      const bucketParams = {
        Key: "thumbnails/resized-" + keyName,
        Bucket: AWS_S3_BUCKET_NAME_RESIZED,
      };

      await S3Controller.checkHeadObject(bucketParams);

      thumb_url = await S3Controller.getSignedThumbnailURL(bucketParams);

      let newKey = new ImageKey({
        key: keyName,
        user_id,
        name: file.originalname,
        url: thumb_url != null ? thumb_url : "none",
      });

      newKey = await newKey.save();

      savedKeys.push(newKey);
    }

    res.status(200).json({ ok: true, data: savedKeys });
  } catch (err) {
    console.log(err);
    res.status(404);
  }
};

// GET '/api/submit'
async function downloadImages(user_id, path){

  console.log('attemping to download images')

  // Function to send request for the object to S3 then pipe the data stream to a local directory
  const make_promise = async (key) => {
    const params = {Bucket: AWS_S3_BUCKET_NAME, Key: key}
    const { Body } = await S3Controller.getObject(params)
    return new Promise((resolve, reject) => {

      const file = Body.pipe(
        fs.createWriteStream(path + key)
      );

      file.on("finish", () => {
        resolve(true);
      });
      file.on("error", reject);
    });
  };




  const images = await ImageKey.find({ user_id });

  // Having an array of promises for downloads allows for parallel downloads
  const promises = [];

  for (const image of images) {
    try {
      promises.push(make_promise(image.key));
    } catch (e) {
      console.log(e);
    }
  }
  const all = Promise.all(promises);
  
  all
    .then((values) => {
      console.log("images downloaded")
    })
    .catch((error) => {
      console.log(error); // rejectReason of any first rejected promise
    });
};

// GET '/api/reloadThumbnail/:id'
reloadThumbnail = async (req, res) => {
  // mongo id of thumbnail to refresh
  const { id } = req.params;

  const key = await ImageKey.findOne({ _id: id });
  
  const bucketParams = {
    Bucket: AWS_S3_BUCKET_NAME_RESIZED,
    Key: "thumbnails/resized-" + key.key,
  };


  try {
    
    // returns signed url of thumbnail from s3
    const new_url = await S3Controller.getSignedThumbnailURL(bucketParams);
    
    // update thumbnail url in mongo
    const updatedKey = await ImageKey.findOneAndUpdate(
      { _id: id },
      { $set: { url: new_url } }
    );
    

    res.status(200).json({ ok: true, data: updatedKey });
  } catch (e) {
    console.log(e);
    res.status(404);
  }
};

module.exports = {
  deleteImage,
  deleteAllImages,
  getAllImages,
  uploadImageKey,
  downloadImages,
  reloadThumbnail,
};
