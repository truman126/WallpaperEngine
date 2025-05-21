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
        window.location.reload();
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

        window.location.reload();

    }

    useEffect(() => {

        async function loadData() {
            const response = await api.getUsers(user);
            setUserList(response.data.userList);
        }

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


            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 flex justify-center">
                <table className="table w-auto" >
                    <thead>
                        <tr><th>user id</th><th>User Email</th><th>Image Count</th><th>User Type</th><th>Actions</th></tr>
                    </thead>

                    <tbody>
                        {userList &&
                            userList.map((profile) => <tr key={profile.id}>
                                <td>{profile.id}</td>
                                <td>{(!profile.guest ? profile.email : 'Guest')}{profile.email == user.email && ' (self)'}</td>
                                <td>{profile.imageCount}</td>
                                <td>{profile.admin ? 'admin' : 'user'}</td>
                                <td className="space-x-4">
                                    {profile.imageCount > 0 && <PopConfirm text="Delete All Images" id={profile.id} confirmAction={handleDeleteAll} />}
                                    {(profile.imageCount == 0 && profile.email != user.email) && <PopConfirm text="Delete User" id={profile.id} confirmAction={handleDeleteUser} />}
                                </td>
                            </tr>
                            )}</tbody>

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