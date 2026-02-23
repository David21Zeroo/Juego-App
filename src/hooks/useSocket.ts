import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = "https://verdad-reto-backend.onrender.com";
export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameState, setGameState] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const socket = io(SERVER_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      timeout: 20000
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Conectado al servidor");
      setIsConnected(true);
      setError(null);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("room_created", (data) => {
      setRoomCode(data.roomCode);
      setPlayers(data.players);
    });

    socket.on("room_joined", (data) => {
      setRoomCode(data.roomCode);
      setPlayers(data.players);
    });

    socket.on("game_update", (state) => {
      setGameState(state);
    });

    socket.on("error", (msg) => {
      setError(msg);
    });

    return () => {
      socket.close();
    };
  }, []);

  // 📌 Crear sala
  const createRoom = (playerName: string) => {
  console.log("🔥 Intentando crear sala", playerName);

  socketRef.current?.emit("create_room", {
    playerName
  });
};
  };

  // 📌 Unirse a sala (orden corregido)
  const joinRoom = (roomCode: string, playerName: string) => {
    socketRef.current?.emit("join_room", {
      roomCode,
      playerName
    });
  };

  const completeChallenge = (data: any) => {
    socketRef.current?.emit("complete_challenge", data);
  };

  const resetGame = () => {
    socketRef.current?.emit("reset_game", { roomCode });
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
