import User from "../models/UserModel.js";
import ImageKey from "../models/image-model.js";


// POST '/api/user/login'
export async function getUsers(req, res) {


  try {
    let userStatistics = [];
    const users = await User.find({});
    for (const user of users) {
      const imageKeyCount = await ImageKey.find({ user_id: user._id }).count();
      userStatistics.push({ id: user._id, email: user.email, imageCount: imageKeyCount, guest: user.guest, admin: user.admin });
    }

    res.status(200).json({ userList: userStatistics });
  } catch (error) {
    res.status(500)
    res.send({ error: "Error getting user stats." })
  }
};

export async function deleteUser(request, response) {

  try {
    const userToDelete = request.params.id;

    const user = await User.findOneAndDelete({ _id: userToDelete });

    console.log({user})

    response.sendStatus(200);

  }

  catch (error) {

    response.status(500)
    response.send({ error: "Error deleting user." })

  }




}