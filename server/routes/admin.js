import express from "express";


// Controllers

// Middleware
import requireAuth from "../middleware/requireAuth.js";

 
const router = express.Router(); 

//require auth for all routes
router.use(requireAuth)


//GETS all image keys to display images
router.get("/admin/getUsers", );


export default router;
