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
    userType: {
        type: String,
        enum: ['user', 'guest', 'admin', 'root'],
        required: true
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
    const userType = (email === process.env.ROOT_USER_EMAIL) ? 'root' : 'user';

    const salt = await bcrypt.genSalt(10);   
    const hash = await bcrypt.hash(password,salt);

    

    const user = await this.create({ email, password: hash , userType })

    return user;
}

userSchema.statics.guestLogin = async function(){
    
    const user = await this.create({userType:'guest'})
    return user;
}
const User = mongoose.model('User', userSchema);

export default User;
