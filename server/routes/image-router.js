const express = require("express");

const FileController = require("../controllers/FileController");
const WallpaperMaker = require("../controllers/WallpaperMaker");
const Downloader = require("../controllers/Downloader");

const requireAuth = require("../middleware/requireAuth")
const router = express.Router(); 
 
//require auth for all routes
router.use(requireAuth)


//CREATE image key and stores image on server
router.post("/upload", FileController.upload.array("images"), FileController.uploadImageKey);

//REMOVE image and its image key
router.delete("/images/:id", FileController.deleteImage); //remove the wallpaper from the list

//GETS all image keys to display images
router.get("/allimages", FileController.getAllImages);

//DELETES all images
router.delete("/allimages", FileController.deleteAllImages);

//submits the form to create the wallpapers
router.post("/submit",FileController.emptyDirectory, FileController.directoryCheck, FileController.downloadImages, WallpaperMaker.generateWallpapers, Downloader.sendDownload, FileController.emptyDirectory); //WallpaperMaker.generateWallpapers, Downloader.sendDownload); //executes the creation of wallpapers


router.get("/images/:id", FileController.getImage);

router.get("/reloadThumbnail/:id", FileController.reloadThumbnail);



module.exports = router;
