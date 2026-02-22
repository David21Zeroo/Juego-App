import { useState } from "react";

interface OnlineHomeScreenProps {
  onCreateRoom: (playerName: string) => void;
  onJoinRoom: (roomCode: string, playerName: string) => void;
  onPlayLocal: () => void;
  isConnecting: boolean;
  error: string | null;
}

export const OnlineHomeScreen = ({
  onCreateRoom,
  onJoinRoom,
  onPlayLocal,
  isConnecting,
  error,
}: OnlineHomeScreenProps) => {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [mode, setMode] = useState<"online" | "local">("online");
  const [onlineTab, setOnlineTab] = useState<"create" | "join">("create");

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onCreateRoom(playerName.trim());
    }
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && roomCode.trim()) {
      onJoinRoom(roomCode.trim().toUpperCase(), playerName.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-700 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-2xl text-white shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          Verdad o Reto 🎮
        </h1>

        {/* Selector modo */}
        <div className="flex mb-4">
          <button
            onClick={() => setMode("online")}
            className={`flex-1 p-2 rounded-l-xl ${
              mode === "online" ? "bg-white/30" : "bg-white/10"
            }`}
          >
            Online
          </button>
          <button
            onClick={() => setMode("local")}
            className={`flex-1 p-2 rounded-r-xl ${
              mode === "local" ? "bg-white/30" : "bg-white/10"
            }`}
          >
            Local
          </button>
        </div>

        {mode === "online" && (
          <>
            <div className="flex mb-4">
              <button
                onClick={() => setOnlineTab("create")}
                className={`flex-1 p-2 rounded-l-xl ${
                  onlineTab === "create" ? "bg-white/30" : "bg-white/10"
                }`}
              >
                Crear
              </button>
              <button
                onClick={() => setOnlineTab("join")}
                className={`flex-1 p-2 rounded-r-xl ${
                  onlineTab === "join" ? "bg-white/30" : "bg-white/10"
                }`}
              >
                Unirse
              </button>
            </div>

            {onlineTab === "create" && (
              <form onSubmit={handleCreateRoom} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/20 placeholder-white/60"
                  maxLength={20}
                  disabled={isConnecting}
                />

                {error && (
                  <div className="bg-red-500/30 p-2 rounded text-center text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!playerName.trim() || isConnecting}
                  className="w-full p-3 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-50"
                >
                  {isConnecting ? "Creando..." : "Crear Sala"}
                </button>
              </form>
            )}

            {onlineTab === "join" && (
              <form onSubmit={handleJoinRoom} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/20 placeholder-white/60"
                  maxLength={20}
                  disabled={isConnecting}
                />

                <input
                  type="text"
                  placeholder="Código de sala"
                  value={roomCode}
                  onChange={(e) =>
                    setRoomCode(e.target.value.toUpperCase())
                  }
                  className="w-full p-3 rounded-xl bg-white/20 text-center tracking-widest"
                  maxLength={6}
                  disabled={isConnecting}
                />

                {error && (
                  <div className="bg-red-500/30 p-2 rounded text-center text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    !playerName.trim() ||
                    !roomCode.trim() ||
                    isConnecting
                  }
                  className="w-full p-3 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                >
                  {isConnecting ? "Uniendo..." : "Unirse"}
                </button>
              </form>
            )}
          </>
        )}

        {mode === "local" && (
          <div className="text-center space-y-4">
            <p>Juega en el mismo dispositivo</p>
            <button
              onClick={onPlayLocal}
              className="w-full p-3 rounded-xl bg-pink-500 hover:bg-pink-600"
            >
              Jugar Local
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
