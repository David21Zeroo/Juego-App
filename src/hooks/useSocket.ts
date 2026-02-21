import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'https://juego-kaei.onrender.com';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = io(SERVER_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('¡Conectado a Render!');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // Escuchar eventos del juego
    socket.on('room_created', (data) => {
      setRoomCode(data.roomCode);
      setPlayers(data.players);
    });

    socket.on('room_joined', (data) => {
      setRoomCode(data.roomCode);
      setPlayers(data.players);
    });

    socket.on('game_update', (state) => {
      setGameState(state);
    });

    socket.on('error', (msg) => {
      setError(msg);
    });

    return () => {
      socket.close();
    };
  }, []);

  // Funciones que App.tsx necesita:
  const createRoom = (playerName: string) => {
    socketRef.current?.emit('create_room', { playerName });
  };

  const joinRoom = (playerName: string, roomCode: string) => {
    socketRef.current?.emit('join_room', { playerName, roomCode });
  };

  const completeChallenge = (data: any) => {
    socketRef.current?.emit('complete_challenge', data);
  };

  const resetGame = () => {
    socketRef.current?.emit('reset_game', { roomCode });
  };

  const clearError = () => setError(null);

  return { 
    isConnected, 
    roomCode, 
    players, 
    gameState, 
    error, 
    createRoom, 
    joinRoom, 
    completeChallenge, 
    resetGame, 
    clearError 
  };
};
