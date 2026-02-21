import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Zap, 
  CheckCircle, 
  XCircle, 
  SkipForward,
  Trophy,
  Flame,
  Snowflake,
  Thermometer,
  Loader2,
  Wifi,
  WifiOff
} from 'lucide-react';
import type { Player, GameState } from '@/hooks/useSocket';

interface OnlineGameScreenProps {
  players: Player[];
  playerId: number;
  playerName: string;
  gameState: GameState | null;
  isConnected: boolean;
  onSelectMode: (mode: 'truth' | 'dare') => void;
  onComplete: (completed: boolean) => void;
  onSkip: () => void;
  onEndGame: () => void;
}

const getLevelIcon = (level: string) => {
  switch (level) {
    case 'easy':
      return <Snowflake className="w-4 h-4 text-blue-400" />;
    case 'medium':
      return <Thermometer className="w-4 h-4 text-yellow-400" />;
    case 'hot':
      return <Flame className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
};

const getLevelText = (level: string) => {
  switch (level) {
    case 'easy':
      return 'Fácil';
    case 'medium':
      return 'Medio';
    case 'hot':
      return 'Picante';
    default:
      return '';
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'easy':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'hot':
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    default:
      return '';
  }
};

export const OnlineGameScreen = ({ 
  players,
  playerId,
  playerName,
  gameState,
  isConnected,
  onSelectMode, 
  onComplete, 
  onSkip,
  onEndGame 
}: OnlineGameScreenProps) => {
  const [showResult, setShowResult] = useState(false);

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-700 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white">Cargando juego...</p>
        </div>
      </div>
    );
  }

  const isMyTurn = gameState.currentPlayer === playerId;
  const currentPlayerData = players.find(p => p.id === gameState.currentPlayer);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-700 p-4">
      {/* Header con estado de conexión */}
      <div className="max-w-4xl mx-auto mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <span className="flex items-center gap-1 text-green-400 text-sm">
                <Wifi className="w-4 h-4" />
                Conectado
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-400 text-sm">
                <WifiOff className="w-4 h-4" />
                Desconectado
              </span>
            )}
          </div>
          <p className="text-white/60 text-sm">
            Jugando como: <span className="text-pink-300">{playerName}</span>
          </p>
        </div>

        {/* Puntajes */}
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          {players.map((player) => (
            <div 
              key={player.id}
              className={`flex items-center gap-3 ${gameState.currentPlayer === player.id ? 'ring-2 ring-pink-400 rounded-xl p-2' : 'p-2'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                player.id === 1 
                  ? 'bg-gradient-to-br from-pink-400 to-purple-500' 
                  : 'bg-gradient-to-br from-purple-400 to-blue-500'
              }`}>
                {player.name[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold">
                  {player.name}
                  {player.id === playerId && <span className="text-pink-300 text-xs ml-1">(Tú)</span>}
                </p>
                <p className="text-pink-300 text-sm flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> {player.score} pts
                </p>
              </div>
            </div>
          ))}

          <div className="text-center px-4">
            <p className="text-white/60 text-sm">Ronda</p>
            <p className="text-white text-2xl font-bold">{gameState.round}</p>
          </div>
        </div>
      </div>

      {/* Área principal del juego */}
      <div className="max-w-2xl mx-auto">
        {!gameState.currentQuestion ? (
          /* Pantalla de selección Verdad o Reto */
          <div className="text-center">
            <div className="mb-8">
              <p className="text-pink-200 text-lg mb-2">Turno de</p>
              <h2 className="text-4xl font-bold text-white mb-2">
                {currentPlayerData?.name}
              </h2>
              {isMyTurn ? (
                <p className="text-green-300 font-semibold">¡Es tu turno! Elige...</p>
              ) : (
                <p className="text-white/60">Esperando que {currentPlayerData?.name} elija...</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => isMyTurn && onSelectMode('truth')}
                disabled={!isMyTurn}
                className={`group relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 transition-all ${
                  isMyTurn 
                    ? 'transform hover:scale-105 hover:shadow-2xl cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <HelpCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">VERDAD</h3>
                <p className="text-blue-100 text-sm">Responde honestamente</p>
              </button>

              <button
                onClick={() => isMyTurn && onSelectMode('dare')}
                disabled={!isMyTurn}
                className={`group relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 transition-all ${
                  isMyTurn 
                    ? 'transform hover:scale-105 hover:shadow-2xl cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Zap className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">RETO</h3>
                <p className="text-orange-100 text-sm">Acepta el desafío</p>
              </button>
            </div>

            {!isMyTurn && (
              <div className="mt-8 flex justify-center">
                <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
              </div>
            )}

            <Button
              onClick={onEndGame}
              variant="ghost"
              className="mt-8 text-white/60 hover:text-white"
            >
              Terminar juego
            </Button>
          </div>
        ) : (
          /* Pantalla de pregunta/reto */
          <div className="text-center">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl mb-6">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <Badge className={`${getLevelColor(gameState.currentQuestion.level)} px-4 py-2 text-sm font-semibold flex items-center gap-2`}>
                    {getLevelIcon(gameState.currentQuestion.level)}
                    {getLevelText(gameState.currentQuestion.level)}
                  </Badge>
                </div>

                <div className="mb-6">
                  {gameState.currentQuestion.type === 'truth' ? (
                    <HelpCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  ) : (
                    <Zap className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  )}
                  <h3 className="text-xl text-pink-200 mb-4">
                    {gameState.currentQuestion.type === 'truth' ? 'VERDAD' : 'RETO'}
                  </h3>
                </div>

                <p className="text-2xl md:text-3xl text-white font-semibold leading-relaxed">
                  {gameState.currentQuestion.text}
                </p>

                {isMyTurn && (
                  <p className="text-green-300 mt-4 font-semibold">
                    ¡Te toca a ti!
                  </p>
                )}
              </CardContent>
            </Card>

            {isMyTurn && !showResult && (
              <div className="space-y-4">
                <p className="text-white/80 mb-4">¿Completaste el desafío?</p>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => setShowResult(true)}
                    className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    ¡Sí, lo hice!
                  </Button>
                  <Button
                    onClick={() => onComplete(false)}
                    variant="destructive"
                    className="h-14 px-8 text-lg font-bold rounded-xl"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    No pude
                  </Button>
                </div>
                <Button
                  onClick={onSkip}
                  variant="ghost"
                  className="text-white/60 hover:text-white"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Saltar pregunta
                </Button>
              </div>
            )}

            {isMyTurn && showResult && (
              <div className="space-y-4">
                <p className="text-green-300 text-xl font-semibold mb-4">
                  ¡+10 puntos!
                </p>
                <Button
                  onClick={() => {
                    onComplete(true);
                    setShowResult(false);
                  }}
                  className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl"
                >
                  Siguiente turno →
                </Button>
              </div>
            )}

            {!isMyTurn && (
              <div className="flex justify-center items-center gap-2 text-white/60">
                <Loader2 className="w-5 h-5 animate-spin" />
                Esperando respuesta de {currentPlayerData?.name}...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
