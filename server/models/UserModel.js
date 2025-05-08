import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';


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
    },
    admin: {
        type: Boolean,
        required:true
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
    
    // if (!validator.isStrongPassword(password, {minLength: 8})){
    //     throw Error('Password not strong enough. Password must be at least 8 characters long')
    // }


    const exists = await this.findOne({ email })

    if (exists){
        throw Error('Email already in use.')
    }
    console.log(process.env.ROOT_USER_EMAIL)
    console.log(email === process.env.ROOT_USER_EMAIL)
    const isAdmin = (email === process.env.ROOT_USER_EMAIL ? true : false);
    console.log({isAdmin})
    const salt = await bcrypt.genSalt(10);   
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({ email, password: hash , admin: isAdmin })

    return user;
}

userSchema.statics.guestLogin = async function(){
    console.log("creating")
    const user = await this.create({guest: true, admin:false})
    console.log({user})
    return user;
}
const User = mongoose.model('User', userSchema);

export default User;
