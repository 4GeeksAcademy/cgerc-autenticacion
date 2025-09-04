import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate} from 'react-router-dom';
import {useHistory} from 'react-router';
import axios from 'axios';

function Login() {
    const {store, actions}= useContext(Context);
    const [email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const navigate= useNavigate();
    const history= useHistory();

    const token= sessionStorage.getItem("token");
    console.log("This is your token", token);
    const handleClick= () => {
        actions.login(email, password).then(() => {
            history.push("/")
        })
    };

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