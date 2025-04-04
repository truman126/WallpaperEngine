const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const validator = require('validator');


const Schema = mongoose.Schema


const userSchema = new Schema({

    email: {
        type:String,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required:false
    },
    guest: {
        type: Boolean,
        required:false,
    }
})

//static login method
userSchema.statics.login = async function(email, password) {

    if (!email || !password){
        throw Error('All fields must be filled.')
    }

    const user = await this.findOne({email});

    if (!user) {
        throw Error('Incorrect email')
    }

    //compare plain text and hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match){
        throw Error ('Incorrect credentials.')
    }
    
    return user;

}

//static signup method
userSchema.statics.signup = async function(email, password) {
    //validation
    if(!email || !password){
        throw Error('All fields must be filled.')

    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid.')
    }
    console.log("mongo was fine")
    // if (!validator.isStrongPassword(password, {minLength: 8})){
    //     throw Error('Password not strong enough. Password must be at least 8 characters long')
    // }


    const exists = await this.findOne({ email })

    console.log(exists, password);
    if (exists){
        console.log("just to check this isnt causing error")
        throw Error('Email already in use.')
     }
    console.log("salt and hashing")
    
    const salt = await bcrypt.genSalt(10);    
    console.log("salt is ready? ", salt);
    const hash = await bcrypt.hash(password,salt);
    console.log("seasoned")

    const user = await this.create({ email, password: hash })
    console.log("USER###", user)

    return user;
}

userSchema.statics.guestLogin = async function(){

    const user = await this.create({guest: true})
    return user;
}

module.exports = mongoose.model('User', userSchema)