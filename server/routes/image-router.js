const express = require("express");
const ImageCtrl = require("../controllers/FileController");
const WallpaperMaker = require("../controllers/WallpaperMaker");
const Downloader = require("../controllers/Downloader");


const router = express.Router(); 

//CREATE image key and stores image on server
router.post("/upload", ImageCtrl.uploadLocal.array("image", 1), ImageCtrl.uploadImage);

//REMOVE image and its image key
router.delete("/images/:id", ImageCtrl.deleteImage); //remove the wallpaper from the list

//GETS all image keys to display images
router.get("/allimages", ImageCtrl.getAllImages);

//submits the form to create the wallpapers
router.post("/create", WallpaperMaker.generateWallpapers); //executes the creation of wallpapers

//creates the zip for download and sends it to the client
router.get("/download", Downloader.getDownload);



module.exports = router;
