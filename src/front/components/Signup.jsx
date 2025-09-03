import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('https://localhost:5000/signup', { email, password });
        alert('¡Usuario registrado exitosamente!');
        navigate('/login');
    } catch (error) {
        alert('Error al registrarse: ' + (error.response?.data?.message || 'Error desconocido'));
    }
};


return (
    <div>
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Correo:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Registrarse</button>
        </form>
    </div>
);


export default Signup;