import express from 'express';

//controllers
import UserController from "../controllers/UserController.js";
import recaptcha from "../middleware/recaptcha.js";

//  route : /api/user

const router = express.Router()


//log in route
router.post('/login', UserController.loginUser);

// sign up route
router.post('/signup', UserController.signupUser);

// guest log in
router.post('/guestlogin', UserController.guestLoginUser);


export default router;