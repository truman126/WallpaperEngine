import express from "express";
import { getUsers, deleteUser, updateRole} from "../controllers/AdminController.js";

// Controllers

// Middleware
import requireAuth from "../middleware/requireAuth.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router(); 

//require auth for all routes
router.use(requireAuth);
router.use(requireAdmin);

//GETS all image keys to display images
router.get("/getUsers", getUsers );

router.delete("/deleteUser/:id", deleteUser);

router.put("/updateRole/:id/:role", updateRole);


export default router;
