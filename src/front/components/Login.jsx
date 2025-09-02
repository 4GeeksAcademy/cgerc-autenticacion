import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const navigate= useNavigate();

    const handleSubmit= async (e) => {
        e.preventDefault();
        try {
            const response= await axios.post('http://localhost:5000/login', {email, password});
            sessionStorage.setItem('token', response.data-accesss_token);
            navigate('/private');
        }catch (error) {
            alert('Inicio de sesión fallido: ' + (error.response?.data?.message || 'Error desconocido'));

        }
        };
    
    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo:</label>
                    <input type= "email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password"
                    value={password}
                    onChange= {(e)=> setPassword(e.target.value)}
                    required
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            </div>
    );
}