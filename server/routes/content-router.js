import express from "express";



// Middleware
// import requireAuth from "../middleware/requireAuth.js";
import { deliverImage } from "../controllers/ContentController.js";


 
const router = express.Router(); 

// //GETS all image keys to display images
router.get("/:userId/:imageId", deliverImage);


export default router;