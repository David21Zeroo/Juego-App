import { useState, useEffect } from 'react';
import { useSocket } from './hooks/useSocket'; // Cambiado de '@/hooks/...'
import { OnlineHomeScreen } from './sections/OnlineHomeScreen'; // Cambiado de '@/sections/...'
import { WaitingRoom } from './sections/WaitingRoom';
import { OnlineGameScreen } from './sections/OnlineGameScreen';
import { ResultScreen } from './sections/ResultScreen';

type AppScreen = 'online-home' | 'waiting' | 'online-game' | 'online-result' | 'local-home' | 'local-game' | 'local-result';

// Estado para juego local
interface LocalGameState {
  players: [Player, Player];
  currentPlayer: 1 | 2;
  currentQuestion: null;
  usedQuestions: number[];
  round: number;
}

function App() {
  const [screen, setScreen] = useState<AppScreen>('online-home');
  const [localGameState, setLocalGameState] = useState<LocalGameState>({
    players: [
      { id: 1, name: '', score: 0 },
      { id: 2, name: '', score: 0 }
    ],
    currentPlayer: 1,
    currentQuestion: null,
    usedQuestions: [],
    round: 1
  });
  
  const {
    roomCode,
    playerId,
    playerName,
    players,
    gameState,
    isConnected,
    isConnecting,
    error,
    createRoom,
    joinRoom,
    selectMode,
    completeChallenge,
    skipQuestion,
    endGame,
    resetGame,
    clearError,
  } = useSocket();

  // Manejar errores
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  // Detectar cuando el juego comienza
  useEffect(() => {
    if (gameState && screen === 'waiting') {
      setScreen('online-game');
      toast.success('¡El juego ha comenzado!');
    }
  }, [gameState, screen]);

  // Handlers para modo online
  const handleCreateRoom = (name: string) => {
    createRoom(name);
    setScreen('waiting');
  };

  const handleJoinRoom = (code: string, name: string) => {
    joinRoom(code, name);
    setScreen('waiting');
  };

  const handleLeaveRoom = () => {
    window.location.reload();
  };

  const handleOnlineEndGame = () => {
    endGame();
    setScreen('online-result');
  };

  const handleOnlineReset = () => {
    resetGame();
    setScreen('online-game');
  };

  // Handlers para modo local
  const handlePlayLocal = () => {
    setScreen('local-home');
  };

  const handleStartLocal = (player1: string, player2: string) => {
    setLocalGameState(prev => ({
      ...prev,
      players: [
        { id: 1, name: player1 || 'Jugador 1', score: 0 },
        { id: 2, name: player2 || 'Jugador 2', score: 0 }
      ]
    }));
    setScreen('local-game');
  };

  const handleLocalEndGame = () => {
    setScreen('local-result');
  };

  const handleLocalReset = () => {
    setScreen('online-home');
    setLocalGameState({
      players: [
        { id: 1, name: '', score: 0 },
        { id: 2, name: '', score: 0 }
      ],
      currentPlayer: 1,
      currentQuestion: null,
      usedQuestions: [],
      round: 1
    });
  };

  // Renderizar según la pantalla actual
  switch (screen) {
    case 'online-home':
      return (
        <>
          <OnlineHomeScreen
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
            onPlayLocal={handlePlayLocal}
            isConnecting={isConnecting}
            error={error}
          />
          <Toaster />
        </>
      );

    case 'waiting':
      if (roomCode && playerId) {
        return (
          <>
            <WaitingRoom
              roomCode={roomCode}
              playerName={playerName}
              players={players}
              isHost={playerId === 1}
              onLeave={handleLeaveRoom}
            />
            <Toaster />
          </>
        );
      }
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-700 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Cargando...</p>
          </div>
        </div>
      );

    case 'online-game':
      if (gameState && playerId) {
        return (
          <>
            <OnlineGameScreen
              players={players}
              playerId={playerId}
              playerName={playerName}
              gameState={gameState}
              isConnected={isConnected}
              onSelectMode={selectMode}
              onComplete={completeChallenge}
              onSkip={skipQuestion}
              onEndGame={handleOnlineEndGame}
            />
            <Toaster />
          </>
        );
      }
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-700 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Cargando juego...</p>
          </div>
        </div>
      );

    case 'online-result':
      // Convertir players al formato esperado por ResultScreen
      const onlinePlayers: [Player, Player] = players.length >= 2 
        ? [{ id: 1, name: players[0].name, score: players[0].score }, { id: 2, name: players[1].name, score: players[1].score }] 
        : [{ id: 1, name: 'Jugador 1', score: 0 }, { id: 2, name: 'Jugador 2', score: 0 }];
      
      return (
        <>
          <ResultScreen
            players={onlinePlayers}
            onReset={handleOnlineReset}
          />
          <Toaster />
        </>
      );

    case 'local-home':
      return (
        <>
          <HomeScreen onStart={handleStartLocal} />
          <Toaster />
        </>
      );

    case 'local-game':
      return (
        <>
          <GameScreen
            gameState={{
              screen: 'game',
              players: localGameState.players,
              currentPlayer: localGameState.currentPlayer,
              currentQuestion: localGameState.currentQuestion,
              usedQuestions: localGameState.usedQuestions,
              round: localGameState.round
            }}
            onSelectMode={() => {}}
            onComplete={() => {}}
            onSkip={() => {}}
            onEndGame={handleLocalEndGame}
          />
          <Toaster />
        </>
      );

    case 'local-result':
      return (
        <>
          <ResultScreen
            players={localGameState.players}
            onReset={handleLocalReset}
          />
          <Toaster />
        </>
      );

    default:
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-700 flex items-center justify-center">
          <p className="text-white">Error: Pantalla no encontrada</p>
        </div>
      );
  }
}

export default App;
