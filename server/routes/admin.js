import express from "express";
import { getUsers } from "../controllers/AdminController.js";

// Controllers

// Middleware
import requireAuth from "../middleware/requireAuth.js";

 
const router = express.Router(); 

//require auth for all routes
router.use(requireAuth)


//GETS all image keys to display images
router.get("/admin/getUsers", getUsers );


export default router;
