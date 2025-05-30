import express from 'express';

//controllers
import {loginUser, signupUser, guestLoginUser} from "../controllers/UserController.js";
import recaptcha from "../middleware/recaptcha.js";


//  route : /api/user

const router = express.Router()

if (process.env.USE_RECAPTCHA == true){
    router.use(recaptcha);
  }
console.log(process.env.USE_RECAPTCHA)
//log in route
router.post('/login', loginUser);

// sign up route
router.post('/signup', signupUser);

// guest log in
router.post('/guestlogin', guestLoginUser);



export default router;