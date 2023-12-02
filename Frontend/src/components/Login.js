import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styleComponents/formular.css";
export default function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/login", credentials, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            localStorage.setItem("id",response.data.id);
            navigate('/Home');
        } catch (error) {
            // Fehlerbehandlung hier
            setError("Login Fehlgeschlagen: " + error.message);
        }
    };
    

    const handleClick = () => {
        navigate("/registrierung")
    }

    return (
        <div className="form-container">
            <div className="h1-form-container">
                <h1>Login</h1>
                <button onClick={handleClick}>Registrieren</button>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={credentials.username} 
                        onChange={handleChange}
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={credentials.password} 
                        onChange={handleChange}
                        className="form-control" />
                </div>
                {error && <div className='error-message'>{error}</div>}
                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
}