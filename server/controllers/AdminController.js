import User from "../models/UserModel.js";
import ImageKey from "../models/image-model.js";
import { deleteDirectory, emptyDirectory } from "../utils/FileUtils.js";
import { getUserPath } from "../utils/UserPaths.js";


// POST '/api/user/login'
export async function getUsers(req, res) {


  try {
    let userStatistics = [];
    const users = await User.find({});
    for (const user of users) {
      const imageKeyCount = await ImageKey.find({ user_id: user._id }).count();
      userStatistics.push({ id: user._id, email: user.email, imageCount: imageKeyCount, userType: user.userType });
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
    await deleteDirectory(getUserPath(userToDelete, 'base'))
    const user = await User.findOneAndDelete({ _id: userToDelete });


    response.sendStatus(200);

  }

  catch (error) {
    response.status(500)
    response.send({ error: "Error deleting user." })

  }




}
export async function updateRole(request, response) {
  try {

    
    const _id = request.params.id;
    const role = request.params.role;
    
    const user = await User.findOneAndUpdate({ _id } , {userType: role});

    response.sendStatus(200);


  }
  catch (error) {
    console.log(error)
    response.status(500);
    response.send({ error: error.message });
  }


}