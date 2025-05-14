import User from '../models/UserModel.js';

export default async function requireAdmin(req, res, next){

    //authentication is verified in requireAuth.js, this just checks if the user is an admin



  try{

    const isAdmin = await User.findOne({ _id: req.user._id });
    
    if (isAdmin){
      next();
    }
    else{
      throw new Error("User is not admin.")
    }
  }
  catch (error){
    console.log(error);
    res.status(401).json({error: 'Request not authorized'});
  }

}

