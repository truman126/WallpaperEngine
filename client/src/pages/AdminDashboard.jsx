import api from "../api";
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useState, useEffect, useRef } from "react";
import { MDBBtn, MDBFile, MDBPopover } from "mdb-react-ui-kit";
import { Toast } from 'primereact/toast';
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { Button } from 'primereact/button'; // To use <ConfirmPopup> tag


function AdminDashboard(props) {
    const { user } = useAuthContext();
    const [userList, setUserList] = useState([]);
    const [visible, setVisible] = useState(false);


    async function handleDeleteAll() {
        const response = await api.deleteAllImages(user);
    }
    async function handleDeleteUser() {
        console.log("user is gone")
    }

    useEffect(() => {

        async function loadData() {
            const response = await api.getUsers(user);
            setUserList(response.data.userList);
        }

        loadData(); // Call the function

    }, []);

    return (
        <div className="block space-y-16">
            
                <div className="flex justify-center">
                    <h3>User Stats:</h3>
                </div>
            
            

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className=" table " >
                    <thead>
                        <tr><th>User Email</th><th>Image Count</th></tr>
                    </thead>
                    {userList &&
                        userList.map((user) => <tr><td>{user.email}</td><td>{user.imageCount}</td><td><button
                            className="btn btn-secondary"
                            
                            onClick={() => {
                                handleDeleteAll();
                            }}
                        >
                            Delete all images
                        </button></td><td><button
                            className="btn btn-secondary"
                            
                            onClick={() => {
                                handleDeleteUser();
                            }}
                        >
                            Delete User
                        </button></td></tr>)}
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