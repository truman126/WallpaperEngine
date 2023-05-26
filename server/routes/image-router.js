const express = require("express");
const FileController = require("../controllers/FileController");
const WallpaperMaker = require("../controllers/WallpaperMaker");
const Downloader = require("../controllers/Downloader");


const router = express.Router(); 

//CREATE image key and stores image on server
router.post("/upload", FileController.uploadLocal.array("image", 1), FileController.uploadImage);

//REMOVE image and its image key
router.delete("/images/:id", FileController.deleteImage); //remove the wallpaper from the list

//GETS all image keys to display images
router.get("/allimages", FileController.getAllImages);

//submits the form to create the wallpapers
router.post("/create", WallpaperMaker.generateWallpapers); //executes the creation of wallpapers

//creates the zip for download and sends it to the client
router.get("/download", Downloader.getDownload);



module.exports = router;
