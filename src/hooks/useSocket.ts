import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Esta es la URL de tu servidor en Render que vimos en tus capturas
const SERVER_URL = 'https://juego-kaei.onrender.com';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Configuramos la conexión hacia Render
    const socket = io(SERVER_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('¡Conectado exitosamente al servidor en Render!');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Se perdió la conexión con el servidor');
      setIsConnected(false);
    });

    // Limpieza al cerrar la app
    return () => {
      if (socket) socket.close();
    };
  }, []);

  return { 
    socket: socketRef.current, 
    isConnected 
  };
};

