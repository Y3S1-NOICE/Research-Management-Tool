import { useEffect, useState } from "react"
import { deleteUser, findUsers } from "../../api/usersApi";
import { handleError } from "../../helper/helper";
import { roles } from "../../Util/utils";
import EditUser from "./EditUser";

const Users = () => {
    const {SUPERVISOR, STUDENT, PANEL_MEMBER, ADMIN} = roles;
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState(STUDENT);
    const [user, setUser] = useState({});
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        handleFindUsers();
    },[role]);

    const handleFindUsers = () => {
        findUsers(`role=${role}`)
            .then(res => {
                res.data.isSuccessful ? 
                    setUsers(res.data.responseData) : 
                    handleError();
            })
            .catch(() => handleError());
    }

    const handleDeleteUser = (id) => {
        deleteUser(id)
            .then((res) => {
                res.data.isSuccessful ? 
                    handleFindUsers() :
                    handleError()
            })
            .catch(() => handleError())
    }

    const handleRoleSelect = (event) => {
        setRole(event.target.value)
    }

    const setEditingUser = (user) => {
        setUser(user);
        setEditOpen(true);
    }

    return(
        <>
            <select onChange={handleRoleSelect}>
                <option selected value={STUDENT}>{STUDENT}</option>
                <option value={PANEL_MEMBER}>{PANEL_MEMBER}</option>
                <option value={SUPERVISOR}>{SUPERVISOR}</option>
                <option value={ADMIN}>{ADMIN}</option>
            </select>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => 
                     <tr key={index}>
                        <th scope="row">{user.id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            <button className="btn btn-primary" onClick={() => setEditingUser(user)}>Edit</button>
                        </td>
                        </tr>
                    )}
                  
                </tbody>
                </table>
                {editOpen && user && 
                    <EditUser 
                        user={user}
                        setEditOpen={setEditOpen}
                        handleFindUsers={handleFindUsers}
                    />
                    }

        </>
    )

}

export default Users;