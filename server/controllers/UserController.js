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
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

  // POST '/api/user/signup'

  export async function signupUser(req,res){
    const { email, password } = req.body;

    try {
      const user = await User.signup(email, password);

      //create a token
      console.log("user created in controller")
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    } catch (error) {
      console.log("error:@@@@@", error);
      res.status(400).json({ error: error.message });
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
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };
  

export default {guestLoginUser, signupUser, loginUser}