import express from "express";


// Controllers
import createWallpapers from "../controllers/ImageController.js";

// Middleware
import requireAuth from "../middleware/requireAuth.js";
import {uploadImageKey, deleteImage, deleteAllImages, getAllImages, getThumbnail } from "../controllers/DAOController.js";
import upload from "../middleware/multer.js"

 
const router = express.Router(); 

//require auth for all routes
router.use(requireAuth)



//CREATE image key and stores image on server
router.post('/upload', upload.array("images"), uploadImageKey)

// //REMOVE image and its image key
router.delete("/images/:id", deleteImage); //remove the wallpaper from the list

// //GETS all image keys to display images
router.get("/allimages", getAllImages);

// //DELETES all images
router.delete("/allimages/:id", deleteAllImages);

// //submits the form to create the wallpapers
router.post("/submit", createWallpapers);
;

router.get("/reloadThumbnail/:id", getThumbnail);

export default router;
