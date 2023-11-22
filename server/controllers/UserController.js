const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id} , process.env.SECRET, {expiresIn: '7d'})
}

//log in user
const loginUser = async(req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }
    catch(error){
        console.log(error)
        res.status(400).json({error: error.message})
    }

}

//sign up user
const signupUser = async(req,res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password);

        //create a token

        const token = createToken(user._id)
        res.status(200).json({email, token})
    }
    catch(error){
        console.log(error)
        res.status(400).json({error:error.message})
    }
}

// guest log in user
const guestLoginUser = async(req, res) => {

    try {
        console.log("guesty ctrl")
        const user = await User.guestLogin();
        console.log(user)
        //create a token
        const token = createToken(user._id)
        res.status(200).json({token})
    }
    catch(error){
        console.log(error)
        res.status(400).json({error:error.message})
    }
}


module.exports = {loginUser, signupUser, guestLoginUser}