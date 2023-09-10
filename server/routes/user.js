const express = require('express')

//controllers
const UserController = require("../controllers/UserController");
const corsMid = require("../middleware/corsmid")



const router = express.Router()


//log in rout
router.post('/login', corsMid.allowCrossDomain, UserController.loginUser)


// sign up route
router.post('/signup', UserController.signupUser)



module.exports = router