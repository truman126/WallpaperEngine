import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" });
};

  // POST '/api/user/login'
  export async function loginUser(req, res){
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);

      //create a token
      const token = createToken(user._id);

      res.status(200).json({ email, token });
    } catch (error) {
      console.log(error)
      res.status(500)
      res.send({error: error.toString()})
    }
  };

  // POST '/api/user/signup'

  export async function signupUser(req,res){
    const { email, password } = req.body;

    try {
      const user = await User.signup(email, password);

      //create a token
      
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } catch (error) {
      res.status(500)
      res.send({error: "Error signing in guest user."})
    }
  };

  // POST '/api/user/guestlogin'

  export async function guestLoginUser(req,res){
    try {
      
      const user = await User.guestLogin();
      
      //create a token
      const token = createToken(user._id);
      res.status(200).json({ token });
    } catch (error) {
      res.status(500)
      
      res.send({error: "Error signing in guest user."})
    }
  };
  
  export async function getUserDetails(request, response){
    try{
      
      const user_id = request.user._id;
      
      const user = await User.findOne({_id: user_id})

      response.status(200);

      response.send({user: user});

    }
    catch(error) {
      response.status(500);
      response.send({error: "Error getting user details"});
      
    }
  }

export default {guestLoginUser, signupUser, loginUser}