const express = require("express");
const router = express.Router(); 


// Controllers
const FileController = require("../controllers/FileController");
const FileUtils = require("../controllers/FileUtils");
const WallpaperMaker = require("../controllers/WallpaperMaker");
const Downloader = require("../controllers/Downloader");


// Middleware
const requireAuth = require("../middleware/requireAuth")
const multer = require("../middleware/multer.js")

 
//require auth for all routes
router.use(requireAuth)


//CREATE image key and stores image on server
router.post("/upload", multer.upload.array("images"), FileController.uploadImageKey);

//REMOVE image and its image key
router.delete("/images/:id", FileController.deleteImage); //remove the wallpaper from the list

//GETS all image keys to display images
router.get("/allimages", FileController.getAllImages);

//DELETES all images
router.delete("/allimages", FileController.deleteAllImages);

//submits the form to create the wallpapers
router.post("/submit",FileUtils.emptyDirectory, FileUtils.directoryCheck, FileController.downloadImages, WallpaperMaker.generateWallpapers, Downloader.sendZipDownloadToClient, FileUtils.emptyDirectory);


// router.get("/images/:id", FileController.getImage);

router.get("/reloadThumbnail/:id", FileController.reloadThumbnail);



module.exports = router;
