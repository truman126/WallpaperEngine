const express = require("express");
const ImageCtrl = require("../controllers/image-ctrl");
const WallpaperMaker = require("../controllers/WallpaperMaker");
const Downloader = require("../controllers/Downloader");


const router = express.Router();

// router.post('/images', ImageCtrl.createWallpaper) //stores images
router.put("/images/:id", ImageCtrl.editWallpaper); //edit the wallpaper like the name or the colour
router.delete("/images/:id", ImageCtrl.deleteWallpaper); //remove the wallpaper from the list


router.post("/create", WallpaperMaker.generateWallpapers); //executes the creation of wallpapers

router.get("/allimages", ImageCtrl.getAllImages);

router.post("/upload", ImageCtrl.uploadLocal.array("image", 1), ImageCtrl.uploadImage);

router.get("/download", Downloader.getDownload);



module.exports = router;
