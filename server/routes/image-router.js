const express = require("express");
const router = express.Router(); 


// Controllers
const FileController = require("../controllers/FileController");
const ImageController = require("../controllers/ImageController");
const DAO = require("../controllers/DAOFactory.js");

// Middleware
const requireAuth = require("../middleware/requireAuth")
const { default: DAOController } = require("../controllers/DAOController.js");

 
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



module.exports = router;
