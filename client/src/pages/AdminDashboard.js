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
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const confirm1 = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };

    const confirm2 = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

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

        // loadData(); // Call the function

    }, []);

    return (
        <>
            <h3>User Stats:</h3>
            <Toast ref={toast} />
            <ConfirmPopup target={document.getElementById('button')} visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
                icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            <MDBBtn id="button" onClick={() => setVisible(true)} icon="pi pi-check" > Confirm </MDBBtn>

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
                    </MDBBtn></td><td><MDBBtn
                        className="delete me-1"
                        color="danger"
                        onClick={() => {
                            handleDeleteUser();
                        }}
                    >
                        Delete User
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