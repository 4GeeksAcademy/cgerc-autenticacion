import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Llamar al endpoint de logout (opcional)
            await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            // Eliminar el token del sessionStorage
            sessionStorage.removeItem('token');

            // Redirigir al usuario a la página principal
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Opcionalmente, manejar el error (mostrar un mensaje, etc.)
            sessionStorage.removeItem('token'); // Asegurar que el token se elimine incluso si falla la solicitud
            navigate('/');
        }
    };

    return (
        <button onClick={handleLogout}>Cerrar Sesión</button>
    );
}

export default LogoutButton;