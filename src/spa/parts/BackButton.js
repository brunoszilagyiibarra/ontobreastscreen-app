import React from 'react';
import { IconButton } from '@mui/material';  // Asegúrate de usar la versión más reciente de MUI
import { ArrowBack } from '@mui/icons-material';

const BackButton = ({ onClick }) => {
    return (
        <IconButton onClick={onClick}
                    sx={{
                        backgroundColor: '#FF4081', // Color de fondo rosa
                        color: 'white', // Color del ícono (blanco)
                        padding: '10px', // Tamaño del botón
                        marginRight: '20px',
                        borderRadius: '50%', // Hace el botón redondo
                        fontSize: '4rem', // Tamaño del ícono
                        transition: 'background-color 0.3s ease, transform 0.3s ease', // Transición suave
                        '&:hover': {
                            backgroundColor: '#D81B60', // Color más oscuro en hover
                            transform: 'scale(1.1)', // Efecto de presionado
                        },
                        '&:focus': {
                            outline: 'none', // Eliminar contorno predeterminado
                            boxShadow: '0 0 0 4px rgba(255, 64, 129, 0.5)', // Sombra alrededor del botón
                        }
                    }}
        >
            <ArrowBack />
        </IconButton>
    );
};

export default BackButton;
