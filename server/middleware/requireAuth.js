import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export default async function requireAuth(req, res, next) {
  //verify authentication
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required." });
    }

    const token = authorization.split(' ')[1];

    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select('_id');

    if (!req.user){
      throw new Error("User not found.")
    }

    next();
  }
  catch (error) {
    res.status(401);
    res.send({error: error.message});
  }

}

