import { 
  Copy, 
  Check, 
  Users, 
  Loader2,
  Share2,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import type { Player } from '@/hooks/useSocket';

interface WaitingRoomProps {
  roomCode: string;
  playerName: string;
  players: Player[];
  isHost: boolean;
  onLeave: () => void;
}

export const WaitingRoom = ({ 
  roomCode, 
  playerName, 
  players, 
  isHost,
  onLeave 
}: WaitingRoomProps) => {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const shareRoom = async () => {
    try {
      await navigator.clipboard.writeText(
        `¡Únete a mi sala de Verdad o Reto! Código: ${roomCode}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al compartir:', err);
    }
  };

  const isFull = players.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Sala de Espera
          </h1>
          <p className="text-pink-200">
            {isHost ? 'Comparte el código para que se unan' : 'Esperando al anfitrión...'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl mb-6 p-6">

          <h2 className="text-center text-white text-xl font-semibold mb-6">
            Código de Sala
          </h2>

          <div className="text-center mb-6">
            <div 
              className="inline-flex items-center gap-4 bg-white/20 rounded-2xl px-8 py-6 cursor-pointer hover:bg-white/30 transition-colors"
              onClick={copyCode}
            >
              <span className="text-5xl font-mono font-bold text-white tracking-widest">
                {roomCode}
              </span>
              {copied ? (
                <Check className="w-6 h-6 text-green-400" />
              ) : (
                <Copy className="w-6 h-6 text-white" />
              )}
            </div>
          </div>

          <button
            onClick={shareRoom}
            className="w-full h-12 mb-6 border border-white/30 text-white rounded-xl hover:bg-white/20 flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Compartir invitación
          </button>

          <div className="border-t border-white/20 pt-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Jugadores ({players.length}/2)
            </h3>
              
            <div className="space-y-3">
              {players.map((player) => (
                <div 
                  key={player.id}
                  className="flex items-center gap-3 bg-white/10 rounded-xl p-3"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-pink-400 to-purple-500">
                    {player.name[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {player.name}
                      {player.name === playerName && (
                        <span className="text-pink-300 text-sm ml-2">(Tú)</span>
                      )}
                    </p>
                  </div>
                </div>
              ))}

              {!isFull && (
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-dashed border-white/20">
                  <Loader2 className="w-5 h-5 text-white/40 animate-spin" />
                  <p className="text-white/40">Esperando jugador...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onLeave}
          className="w-full text-white/60 hover:text-white flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Salir de la sala
        </button>

      </div>
    </div>
  );
};
