import User from "../models/UserModel.js";
import ImageKey from "../models/image-model.js";

// POST '/api/user/login'
export async function getUsers(req, res) {


  try {
    let userStatistics = [];
    const users = await User.find({});
    for (const user of users) {
      const imageKeyCount = await ImageKey.find({user_id : user._id}).count();
      userStatistics.push({email : user.email, imageCount: imageKeyCount});
    }

    res.status(200).json({ userList: userStatistics });
  } catch (error) {
    console.log(error)
    res.status(500)
    res.send({ error: "Error getting user stats." })
  }
};