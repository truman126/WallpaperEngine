import express from 'express';

//controllers
import {getUserDetails} from "../controllers/UserController.js";

import requireAuth from '../middleware/requireAuth.js';


//  route : /api/user

const router = express.Router()
router.use(requireAuth)

//log in route
router.get("/userdetails", getUserDetails);



export default router;