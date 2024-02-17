const ImageKey = require("../models/image-model");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const {
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  HeadObjectCommand,
  S3Client,
  waitUntilObjectExists,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID;
const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;
const AWS_S3_BUCKET_NAME_RESIZED = process.env.AWS_S3_BUCKET_NAME_RESIZED;

const s3 = new S3Client({
  region: "us-east-2",
  credentials: {
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
  },
  endpoint: `http://${AWS_S3_BUCKET_NAME}.s3.us-east-2.amazonaws.com`,
  forcePathStyle: true,
});
const s3_resized = new S3Client({
  region: "us-east-2",
  credentials: {
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
  },
  endpoint: `http://s3.us-east-2.amazonaws.com`,
});

emptyDirectory = async (req, res, next) => {
  console.log("empty starting");
  const user_id = req.user._id;
  const directory = `./data/${user_id}/`;
  const wallpaper_dir = directory + "wallpapers";

  if (!fs.existsSync(directory)) {
    console.log("Making main user dir")
    fs.mkdirSync(directory);
    next();
  }
  
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log(err);
      console.log(1);

      return;
    }
    console.log("Deleting old files")

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) console.log(err);
      });
    }
  });
  if (!fs.existsSync(wallpaper_dir)) {
    console.log("Making wallpaper dir")
    fs.mkdirSync(wallpaper_dir);
    next();
  }
  fs.readdir(wallpaper_dir, (err, files) => {
    if (err) {
      console.log(err);

      return;
    }

    if (!files) {
      console.log("no files")
      next()
    }
    console.log("deleting old wallpapers")
    for (const file of files) {
      fs.unlink(path.join(wallpaper_dir, file), (err) => {
        if (err) console.log(err);
      });
    }
  });
  console.log("empty ending");
  next();
};
directoryCheck = async (req, res, next) => {
  console.log("dircheck starting");
  const user_id = req.user._id;
  const directory = `./data/${user_id}`;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
    fs.mkdirSync(directory + "/wallpapers");
  }
  console.log("dircheck ending");

  next();
};

deleteImage = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  const key = await ImageKey.findOneAndDelete({ _id: id });

  console.log(key);

  //delete file from s3
  try {
    const main = await s3.send(
      new DeleteObjectCommand({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: key.key,
      })
    );
    const thumb = await s3_resized.send(
      new DeleteObjectCommand({
        Bucket: AWS_S3_BUCKET_NAME_RESIZED,
        Key: "thumbnails/resized-" + key.key,
      })
    );
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
deleteAllImages = async (req, res) => {
  const user_id = req.user._id;

  //find all the keys in mongo
  const images = await ImageKey.find({ user_id });

  //create parameters for s3
  const mainDeleteParams = {
    Bucket: AWS_S3_BUCKET_NAME,
    Delete: { Objects: [] },
  };
  const thumbDeleteParams = {
    Bucket: AWS_S3_BUCKET_NAME_RESIZED,
    Delete: { Objects: [] },
  };

  //loop through the keys from mongo and add the keys to the params for s3
  for (image in images) {
    mainDeleteParams.Delete.Objects.push({ Key: images[image].key });
    thumbDeleteParams.Delete.Objects.push({
      Key: `thumbnails/resized-${images[image].key}`,
    });
  }

  // delete file from s3
  try {
    const main = await s3.send(new DeleteObjectsCommand(mainDeleteParams));
    const thumb = await s3_resized.send(
      new DeleteObjectsCommand(thumbDeleteParams)
    );

    console.log("Success. Object deleted.", main);
    console.log("Success. Object deleted.", thumb);
  } catch (err) {
    console.log("Error", err);
  }

  //delete the key from the mongo database
  const keys = await ImageKey.deleteMany({ user_id });

  if (!keys) {
    return res.status(400).json({ error: "Image was not found" });
  }

  //send response

  res.status(200).json({
    ok: true,
  });
};
getAllImages = async (req, res) => {
  console.log(req.user);
  const user_id = req.user._id;
  const images = await ImageKey.find({ user_id });
  res.status(200).json({ ok: true, data: images });
};
getImage = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  const key = await ImageKey.find({ _id: id });

  if (!key) {
    return res.status(400).json({ error: "Image was not found" });
  }

  res.sendFile(
    path.join(__dirname + "/../data/images/" + user_id + "/" + key[0].key)
  );
  // res.status(200)
};

uploadImageKey = async (req, res) => {
  try {
    const user_id = req.user._id;
    if (!req.files) {
      console.log("no files");
      res.status(400).send({ msg: "No Files" });
    }

    let savedKeys = [];

    for (file of req.files) {
      let thumb_url = null;
      const keyName = file.key;
      console.log("FILE PRECHECK");
      console.log(file);
      console.log(file.mimetype);
      if (file.mimetype != "image/heic") {
        const bucketParams = {
          Bucket: AWS_S3_BUCKET_NAME_RESIZED,
          Key: "thumbnails/resized-" + keyName,
        };

        //get the head data to ensure the object exists before requesting the thumbnail
        const head = new HeadObjectCommand(bucketParams);

        //temp solution to check if the thumbnail exists
        for (let i = 0; i < 5; i++) {
          const exists = await s3_resized
            .send(head)
            .catch((err) => console.log(err));

          if (exists) {
            break;
            console.log("refreshing");
          }
          await new Promise((r) => setTimeout(r, 1500));
        }

        thumb_url = await getSignedUrl(
          s3_resized,
          new GetObjectCommand(bucketParams),
          { expiresIn: 90000 }
        ); //90k
      }
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

downloadImages = async (req, res, next) => {
  console.log("download starting");

  const make_promise = async (key) => {
    const { Body } = await s3.send(
      new GetObjectCommand({ Bucket: AWS_S3_BUCKET_NAME, Key: key })
    );

    return new Promise((resolve, reject) => {
      const file = Body.pipe(
        fs.createWriteStream("data/" + user_id + "/" + key)
      );

      file.on("finish", () => {
        resolve(true);
      }); // not sure why you want to pass a boolean
      file.on("error", reject); // don't forget this!
    });
  };

  const user_id = req.user._id;
  const images = await ImageKey.find({ user_id });
  const promises = [];

  for (const image of images) {
    try {
      promises.push(make_promise(image.key));
    } catch (e) {
      console.log(e);
    }
  }
  const all = Promise.all(promises);
  console.log(all);
  all
    .then((values) => {
      console.log(values); // [resolvedValue1, resolvedValue2]
      next();
    })
    .catch((error) => {
      console.log(error); // rejectReason of any first rejected promise
    });
  console.log("download ended");
};
reloadThumbnail = async (req, res) => {
  await new Promise((r) => setTimeout(r, 500));
  console.log("reloading thumb");
  const { id } = req.params;
  const key = await ImageKey.findOne({ _id: id });
  console.log(key);

  const bucketParams = {
    Bucket: AWS_S3_BUCKET_NAME_RESIZED,
    Key: "thumbnails/resized-" + key.key,
  };
  try {
    const new_url = await getSignedUrl(
      s3_resized,
      new GetObjectCommand(bucketParams),
      { expiresIn: 90000 }
    ); //90k
    const item = await ImageKey.findOneAndUpdate(
      { _id: id },
      { $set: { url: new_url } }
    );
    res.status(200).json({ ok: true, data: item });
  } catch (e) {
    console.log(e);
    res.status(404);
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

const upload = multer({
  storage: multerS3({
    region: "us-east-2",
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

module.exports = {
  deleteImage,
  deleteAllImages,
  getAllImages,
  uploadImageKey,
  uploadLocal,
  downloadImages,
  storage,
  directoryCheck,
  getImage,
  upload,
  emptyDirectory,
  reloadThumbnail,
};
