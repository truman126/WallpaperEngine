const express = require('express')

//controllers
const UserController = require("../controllers/UserController");
const recaptcha = require("../middleware/recaptcha")

//  route : /api/user

const router = express.Router()
router.use(recaptcha)


//log in route
router.post('/login', UserController.loginUser)

// sign up route
router.post('/signup', UserController.signupUser)

// guest log in
router.post('/guestlogin', UserController.guestLoginUser)



module.exports = router