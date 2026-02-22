import { useState, useEffect } from 'react';
import { useSocket } from './hooks/useSocket'; 
import { OnlineHomeScreen } from './sections/OnlineHomeScreen'; 
import { WaitingRoom } from './sections/WaitingRoom';
import { OnlineGameScreen } from './sections/OnlineGameScreen';
import { ResultScreen } from './sections/ResultScreen';
type AppScreen = 'online-home' | 'waiting' | 'online-game' | 'online-results';

function App() {
  const [screen, setScreen] = useState<AppScreen>('online-home');
  
  const {
    roomCode,
    players,
    gameState,
    isConnected,
    error,
    createRoom,
    joinRoom,
    completeChallenge,
    resetGame,
    clearError
  } = useSocket();

  // Manejo de errores simple por consola
  useEffect(() => {
    if (error) {
      console.error("Error de conexión:", error);
      clearError();
    }
  }, [error, clearError]);

  // Cambiar de pantalla según el estado del juego
  useEffect(() => {
    if (gameState && screen === 'waiting') {
      setScreen('online-game');
    }
  }, [gameState, screen]);

  return (
    <div className="min-h-screen bg-gray-100">
      {!isConnected && (
        <div className="bg-red-500 text-white p-2 text-center">
          Sin conexión con el servidor
        </div>
      )}

      {screen === 'online-home' && (
        <OnlineHomeScreen 
          onCreateRoom={(name) => {
            createRoom(name);
            setScreen('waiting');
          }}
          onJoinRoom={(name, code) => {
            joinRoom(name, code);
            setScreen('waiting');
          }}
        />
      )}

      {screen === 'waiting' && (
        <WaitingRoom 
          roomCode={roomCode || ''} 
          players={players} 
        />
      )}

      {screen === 'online-game' && gameState && (
        <OnlineGameScreen
          gameState={gameState}
          players={players}
          onComplete={completeChallenge}
        />
      )}

      {screen === 'online-results' && (
        <ResultScreen 
          players={players} 
          onRestart={() => {
            resetGame();
            setScreen('online-home');
          }}
        />
      )}
    </div>
  );
}

export default App;
