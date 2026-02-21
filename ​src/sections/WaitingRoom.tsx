import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    const shareData = {
      title: 'Verdad o Reto',
      text: `¡Únete a mi sala de Verdad o Reto! Código: ${roomCode}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`¡Únete a mi sala de Verdad o Reto! Código: ${roomCode}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error al compartir:', err);
    }
  };

  const isFull = players.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Sala de Espera
          </h1>
          <p className="text-pink-200">
            {isHost ? 'Comparte el código para que se unan' : 'Esperando al anfitrión...'}
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl mb-6">
          <CardHeader>
            <CardTitle className="text-center text-white text-xl">
              Código de Sala
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Código grande */}
            <div className="text-center">
              <div 
                className="inline-flex items-center gap-4 bg-white/20 rounded-2xl px-8 py-6 cursor-pointer hover:bg-white/30 transition-colors"
                onClick={copyCode}
              >
                <span className="text-5xl font-mono font-bold text-white tracking-widest">
                  {roomCode}
                </span>
                <button className="text-white/60 hover:text-white transition-colors">
                  {copied ? (
                    <Check className="w-6 h-6 text-green-400" />
                  ) : (
                    <Copy className="w-6 h-6" />
                  )}
                </button>
              </div>
              <p className="text-white/50 text-sm mt-2">
                {copied ? '¡Código copiado!' : 'Toca para copiar'}
              </p>
            </div>

            {/* Botón compartir */}
            <Button
              onClick={shareRoom}
              variant="outline"
              className="w-full h-12 border-white/30 text-white hover:bg-white/20"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartir invitación
            </Button>

            {/* Lista de jugadores */}
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
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      player.id === 1 
                        ? 'bg-gradient-to-br from-pink-400 to-purple-500' 
                        : 'bg-gradient-to-br from-purple-400 to-blue-500'
                    }`}>
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
                    {player.id === 1 && (
                      <span className="text-xs bg-yellow-500/30 text-yellow-300 px-2 py-1 rounded">
                        Anfitrión
                      </span>
                    )}
                  </div>
                ))}

                {/* Slot vacío */}
                {!isFull && (
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-dashed border-white/20">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-white/40 animate-spin" />
                    </div>
                    <p className="text-white/40">Esperando jugador...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Estado */}
            <div className="text-center">
              {isFull ? (
                <div className="text-green-300 font-semibold flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  ¡Listo para comenzar!
                </div>
              ) : (
                <div className="text-white/60 flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Esperando a que se una alguien...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Botón volver */}
        <Button
          onClick={onLeave}
          variant="ghost"
          className="w-full text-white/60 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Salir de la sala
        </Button>
      </div>
    </div>
  );
};
