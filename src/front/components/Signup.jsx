import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Signup(){
    const [email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const navigate= useNavigate();
}

const handleSubmit= async (e) => {
    e.preventDefault();
    try {
        await axios.post('https://localhost:5000/signup' ,{email, password});
        alert('¡Usuario registrado exitosamente!');
        navigate('/login');
    } catch (error) {
        alert('Error al registrarse: '+ (error.response?.data?.message || 'Error desconocido'));
    
    }
    };
return (
    <div>
        <
    </div>
)