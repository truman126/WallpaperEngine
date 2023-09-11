const express = require('express')

//controllers
const UserController = require("../controllers/UserController");



const router = express.Router()


//log in rout
router.post('/login', UserController.loginUser)


// sign up route
router.post('/signup', UserController.signupUser)



module.exports = router