import api from "../api";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect, useRef } from "react";
import PopConfirm from "../components/PopConfirm";
import { Error } from "../components/Error";
import { Success } from "../components/Success";

function AdminDashboard(props) {
    const { user } = useAuthContext();
    const [userList, setUserList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function loadData() {
        const response = await api.getUsers(user);
        if (response.status >= 200 && response.status < 300) {
            setUserList(response.data.userList);

        }
        else {

            setError(response.data.error);
        }
    }

    async function handleDeleteAll(userId) {

        if (!user) {
            return;
        }
        const response = await api.deleteAllImages(userId, user);

        if (response.status >= 200 && response.status < 300) {
            setSuccess('Deleted items.')
        }
        else {
            setError(response.data.error)
        }
        loadData();
    }
    async function handleDeleteUser(userId) {

        if (!user) {
            return;
        }


        const response = await api.deleteUser(userId, user);

        if (response.status >= 200 && response.status < 300) {
            setSuccess("Deleted User")
        }
        else {
            setError(response.data.error)
        }

        loadData();

    }
    async function handleRoleUpdate(userId, role) {
        try {
            if (!user) {
                return;
            }

            const response = await api.updateRole(userId, role, user);

            if (response.status >= 200 && response.status < 300) {
                setSuccess("Role Updated")
            }
            else {
                setError(response.data.error)
            }

            loadData();

        }
        catch (error) {
            setError(error.response.data.error);
        }
    }
    useEffect(() => {

        loadData(); // Call the function

    }, []);

    return (
        <div className="justify-center space-y-16">

            <div className="flex justify-center">
                <h3>User Stats:</h3>
            </div>

            {error && (
                <Error className="mb-4 mx-5 w-150" message={error} />
            )}
            {success && (
                <Success className="mb-4 mx-5 w-150" message={success} />
            )}


            <div className=" rounded-box border border-base-content/5 bg-base-100 flex justify-center">
                <table className="table w-auto" >
                    <thead>
                        <tr><th>User ID</th><th>User Email</th><th>Image Count</th><th>User Type</th><th>Actions</th></tr>
                    </thead>

                    <tbody >
                        {userList &&
                            userList.map((profile) => <tr key={profile.id}>
                                <td>{profile.id}</td>
                                <td>{(profile.userType != 'guest' ? profile.email : 'Guest')}{profile.email == user.email && ' (self)'}</td>
                                <td>{profile.imageCount}</td>
                                <td>{profile.userType}</td>
                                <td className="space-x-4"><div className="dropdown dropdown-center">
                                    <div tabIndex={0} role="button" className="btn m-1">&hellip;</div>
                                    <ul tabIndex={0} className="z-10 dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                        {profile.imageCount > 0 ?
                                            <li>
                                                <PopConfirm id={profile.id} confirmAction={handleDeleteAll}>
                                                    <a>Delete All Images</a>
                                                </PopConfirm>
                                            </li>
                                            :
                                            <li className="menu-disabled"><a>Delete All Images</a></li>}
                                        {(profile.imageCount == 0 && profile.email != user.email) ?
                                            <li>
                                                <PopConfirm id={profile.id} confirmAction={handleDeleteUser}>
                                                    <a>Delete User</a>
                                                </PopConfirm>
                                            </li>
                                            :
                                            <li className="menu-disabled">
                                                <p className="disabled">Delete User</p>
                                            </li>}
                                        {(profile.userType == 'admin') &&
                                            <li><a onClick={() => handleRoleUpdate(profile.id, 'user')}>Demote</a></li>}
                                        {(profile.userType == 'user') &&
                                            <li><a onClick={() => handleRoleUpdate(profile.id, 'admin')}>Promote</a></li>}
                                    </ul>
                                </div></td>
                                <td className="space-x-4">





                                </td>
                            </tr>
                            )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
export default AdminDashboard;
/***
 * What to add
 * -list of all users,
 * -delete all images for each user
 * -(maybe date of last activity, will require db maintenenace)
                files.map((file) => <File image={file} key={file.key} />)}
 * 
 */