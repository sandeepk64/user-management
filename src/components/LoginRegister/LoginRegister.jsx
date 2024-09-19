import { useState } from 'react';
import './LoginRegister.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const [action, setAction] = useState(''); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    
    const navigate = useNavigate(); 

    const registerLink = () => {
        setAction(' active');
        setErrorMessage(''); 
    };

    const loginLink = () => {
        setAction('');
        setErrorMessage(''); 
    };

    // Handle Registration
    const handleRegister = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.username === username)) {
            setErrorMessage('Username already exists');
            return;
        }

        const newUser = { username, email, password, blocked: false, loginHistory: [] };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        setErrorMessage('Registration successful, please log in.');
        setAction(''); 
    };

    // Handle Login
    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            if (user.blocked) {
                setErrorMessage('Your account is blocked. Please contact support.');
                return;
            }
            user.loginHistory.push(new Date().toLocaleString());
            localStorage.setItem('users', JSON.stringify(users));
    
            navigate('/users'); 
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div className={`wrapper${action}`}>
            <div className="form-box login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input 
                            type="text" 
                            placeholder='Username' 
                            required 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input 
                            type="password" 
                            placeholder='Password' 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <FaLock className='icon' />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type='submit'>Login</button>
                    <div className="register-link">
                        <p>Do not have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    <div className='input-box'>
                        <input 
                            type="text" 
                            placeholder='Username' 
                            required 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input 
                            type="email" 
                            placeholder='Email' 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <MdEmail className='icon' />
                    </div>
                    <div className='input-box'>
                        <input 
                            type="password" 
                            placeholder='Password' 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <FaLock className='icon' />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type='submit'>Register</button>
                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
