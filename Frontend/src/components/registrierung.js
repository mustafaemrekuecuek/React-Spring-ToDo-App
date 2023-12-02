import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styleComponents/formular.css";
export default function Registrierung() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = new useState({
        username: '',
        password: '',
        fullname: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/create', formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate("/login");
        } catch (error){
            console.error('Fehler bei der Anfrage: ', error);
            setError("Registrierung leider fehlgeschlagen! " + error)
        }
    }

    const handleClick = () => {
        navigate("/login")
    }

    return (
        <div className="form-container">
            <div className="h1-form-container">
                <h1>Registrierung</h1>
                <button onClick={handleClick}>Login</button>
            </div>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange}
                        className="form-control" />
                </div>
    
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange}
                        className="form-control" />
                </div>
    
                <div className="form-group">
                    <label htmlFor="fullname">Name</label>
                    <input 
                        type="text" 
                        name="fullname" 
                        value={formData.fullname} 
                        onChange={handleChange}
                        className="form-control" />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="submit-btn">Registrieren</button>
            </form>
        </div>
    );
}