import api from "../api";
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useState, useEffect } from "react";
import { MDBBtn, MDBFile } from "mdb-react-ui-kit";




function AdminDashboard(props) {
    const { user } = useAuthContext();
    const [userList, setUserList] = useState([]);

    async function handleDeleteAll() {
        const response = await api.deleteAllImages(user);
    }

    useEffect(() => {

        async function loadData() {
            const response = await api.getUsers(user);
            // await response.data.userList
            setUserList(response.data.userList);
        }

        loadData(); // Call the function

    }, []);

    return (
        <>
            <h3>User Stats:</h3>

            <table>
                <tr><td>email</td><td>image count</td></tr>
                {userList &&
                    userList.map((user) => <tr><td>{user.email}</td><td>{user.imageCount}</td><td><MDBBtn
                        className="delete me-1"
                        color="danger"
                        onClick={() => {
                            handleDeleteAll();
                        }}
                    >
                        Delete all
                    </MDBBtn></td></tr>)}
            </table>
        </>
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