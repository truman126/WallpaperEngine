import api from "../api";


function AdminDashBoard(props) {
    const { user } = useAuthContext();


    async function loadData() {
        const response = await api.getUsers(user);
        userList = response.data.userList;
    }
    async function handleDeleteAll() {
        const response = await api.deleteAllImages(user);
    }

    return (
        <>
            <ul>
                {userList.map((user) => <li>user: {user.email} <button
                    className="delete"
                    onClick={() => {
                        handleDeleteAll(user);
                    }}
                >
                    Delete all
                </button></li>)}
            </ul>
        </>
    );
}

/***
 * What to add
 * -list of all users,
 * -delete all images for each user
 * -(maybe date of last activity, will require db maintenenace)
                files.map((file) => <File image={file} key={file.key} />)}
 * 
 */