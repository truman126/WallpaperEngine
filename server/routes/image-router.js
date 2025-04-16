import express from "express";


// Controllers
import FileController from "../controllers/FileController.js";
import ImageController from "../controllers/ImageController.js";
import DAO from "../controllers/DAOFactory.js";

// Middleware
import requireAuth from "../middleware/requireAuth.js";
import DAOController from "../controllers/DAOController.js";

 
const router = express.Router(); 

//require auth for all routes
router.use(requireAuth)


//CREATE image key and stores image on server
router.post('/upload', multer.upload.array("images"), DAOController.uploadImageKey)

//REMOVE image and its image key
router.delete("/images/:id", DAO.deleteImage); //remove the wallpaper from the list

//GETS all image keys to display images
router.get("/allimages", DAO.getAllImages);

//DELETES all images
router.delete("/allimages", DAO.deleteAllImages);

//submits the form to create the wallpapers
router.post("/submit", ImageController.createWallpapers);


// router.get("/images/:id", FileController.getImage);

router.get("/reloadThumbnail/:id", FileController.reloadThumbnail);



export default router;
