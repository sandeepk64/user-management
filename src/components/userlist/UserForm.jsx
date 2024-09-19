import { useState, useEffect } from 'react';
import './UserForm.css'; 
import { useNavigate } from 'react-router-dom'; 

const UserForm = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
        document.body.classList.add('user-form-page');
        return () => {
            document.body.classList.remove('user-form-page');
        };
    }, []);

    const toggleBlock = (username) => {
        const updatedUsers = users.map(user => {
            if (user.username === username) {
                return { ...user, blocked: !user.blocked };
            }
            return user;
        });
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const removeUser = (username) => {
        const updatedUsers = users.filter(user => user.username !== username);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const viewPreviousLogins = (logins) => {
        alert(`Previous logins: \n${logins.join('\n')}`);
    };

    const handleLogout = () => {
        navigate('/'); 
    };

    return (
        <div className="user-form">
            <div className="header">
                <h1>User List</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => toggleBlock(user.username)}>
                                    {user.blocked ? 'Unblock' : 'Block'}
                                </button>
                                <button onClick={() => viewPreviousLogins(user.loginHistory)}>
                                    Previous Logins
                                </button>
                                <button onClick={() => removeUser(user.username)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserForm;
