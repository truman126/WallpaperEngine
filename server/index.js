const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const imageRouter = require("./routes/image-router");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const AWS_S3_BUCKET_NAME = "wallpaperengineimages";
const AWS_S3_ACCESS_KEY_ID = "***REMOVED***";
const AWS_S3_SECRET_ACCESS_KEY = "***REMOVED***";


const app = express();
const apiPort = 8000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('data'));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("hello");
});


app.use("/api", imageRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
