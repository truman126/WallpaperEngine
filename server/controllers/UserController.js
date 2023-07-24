const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id} , process.env.SECRET, {expiresIn: '7d'})
}

//login user
const loginUser = async(req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }
    catch(error){
        res.status(400).json({error: error})
    }

}

//signup user
const signupUser = async(req,res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password);

        //create a token

        const token = createToken(user._id)


        console.log('all good')
        console.log(token, email, user)
        res.status(200).json({email, token})
    }
    catch(error){
        console.log("ERROR????: ", error)
        res.status(400).json({Error:error.message})
    }
}

module.exports = {loginUser, signupUser}