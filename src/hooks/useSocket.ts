import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

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
      transports: ["websocket"],
      reconnection: true
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket conectado");
      setIsConnected(true);
    });

    socket.on("room_created", (data) => {
      console.log("✅ Sala creada", data);

      setRoomCode(data.roomCode);
      setPlayers(data.players);
    });

    socket.on("room_joined", (data) => {
      console.log("✅ Sala unida", data);

      setRoomCode(data.roomCode);
      setPlayers(data.players);
    });

    socket.on("error", (msg) => {
      console.log("❌ Error socket", msg);
      setError(msg);
    });

    return () => {
      socket.close();
    };
  }, []);

  const createRoom = (playerName: string) => {
    socketRef.current?.emit("create_room", { playerName });
  };

  const joinRoom = (roomCode: string, playerName: string) => {
    socketRef.current?.emit("join_room", {
      roomCode,
      playerName
    });
  };

  const completeChallenge = (data: any) => {
    socketRef.current?.emit("complete_turn", data);
  };

  const resetGame = () => {
    socketRef.current?.emit("reset_game");
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
