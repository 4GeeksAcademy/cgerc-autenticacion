import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function Private() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
    //validar token en el frontend
    try {
        const decodedToken= jwtDecode(token);
        const currentTime= Date.now() / 1000; //tiemp exp en seg
        if (decodedToken.exp <currentTime) {
            sessionStorage.removeItem('token');
            navigate('/login');
            return;
        }
    } catch (error) {
        sessionStorage.removeItem('token');
        navigate('/login');
        return;
    }

    //validar token con backend
    axios
     .get('http://localhost:5000/private', {
        headers: {Authorization: `Bearer ${token}`},
     })
     .catch(() => {
        sessionStorage.removeItem('token');
        navigate('/login');
     });
     }, [navigate]);

     return (
        <div>
            <h2>Página privada</h2>
            <p>¡Bienvenido al área privada! Hora acual {new Date().toLocaleString}</p>
        </div>
     );
    }

    export default Private; 