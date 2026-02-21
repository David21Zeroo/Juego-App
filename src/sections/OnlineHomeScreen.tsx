import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gamepad2, 
  Plus, 
  LogIn, 
  Users, 
  Sparkles,
  Loader2
} from 'lucide-react';

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
  error 
}: OnlineHomeScreenProps) => {
  const [activeTab, setActiveTab] = useState('online');
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
              <Gamepad2 className="w-20 h-20 text-white relative z-10" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Verdad o Reto
          </h1>
          <p className="text-pink-200 text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            ¡Juega online con amigos!
            <Sparkles className="w-4 h-4" />
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 mb-6">
            <TabsTrigger 
              value="online" 
              className="data-[state=active]:bg-white/20 text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Online
            </TabsTrigger>
            <TabsTrigger 
              value="local"
              className="data-[state=active]:bg-white/20 text-white"
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Local
            </TabsTrigger>
          </TabsList>

          <TabsContent value="online">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-center text-white text-xl">
                  Jugar Online
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="create" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/10 mb-4">
                    <TabsTrigger 
                      value="create"
                      className="data-[state=active]:bg-white/20 text-white text-sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Crear Sala
                    </TabsTrigger>
                    <TabsTrigger 
                      value="join"
                      className="data-[state=active]:bg-white/20 text-white text-sm"
                    >
                      <LogIn className="w-4 h-4 mr-1" />
                      Unirse
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="create">
                    <form onSubmit={handleCreateRoom} className="space-y-4">
                      <div>
                        <label className="text-pink-200 text-sm mb-2 block">
                          Tu nombre
                        </label>
                        <Input
                          type="text"
                          placeholder="Ingresa tu nombre"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:border-pink-400 h-12"
                          maxLength={20}
                          disabled={isConnecting}
                        />
                      </div>

                      {error && (
                        <div className="text-red-300 text-sm text-center bg-red-500/20 p-2 rounded">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={!playerName.trim() || isConnecting}
                        className="w-full h-12 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                      >
                        {isConnecting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Creando...
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5 mr-2" />
                            Crear Sala
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="join">
                    <form onSubmit={handleJoinRoom} className="space-y-4">
                      <div>
                        <label className="text-pink-200 text-sm mb-2 block">
                          Tu nombre
                        </label>
                        <Input
                          type="text"
                          placeholder="Ingresa tu nombre"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:border-pink-400 h-12"
                          maxLength={20}
                          disabled={isConnecting}
                        />
                      </div>

                      <div>
                        <label className="text-pink-200 text-sm mb-2 block">
                          Código de sala
                        </label>
                        <Input
                          type="text"
                          placeholder="Ej: ABC123"
                          value={roomCode}
                          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:border-pink-400 h-12 text-center text-2xl tracking-widest font-mono"
                          maxLength={6}
                          disabled={isConnecting}
                        />
                      </div>

                      {error && (
                        <div className="text-red-300 text-sm text-center bg-red-500/20 p-2 rounded">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={!playerName.trim() || !roomCode.trim() || isConnecting}
                        className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                      >
                        {isConnecting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Uniendo...
                          </>
                        ) : (
                          <>
                            <LogIn className="w-5 h-5 mr-2" />
                            Unirse a Sala
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="local">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-center text-white text-xl">
                  Modo Local
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/70 mb-6">
                  Juega en el mismo dispositivo pasando el turno entre jugadores
                </p>
                <Button
                  onClick={onPlayLocal}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl transition-all transform hover:scale-105"
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Jugar Local
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Instrucciones */}
        <div className="mt-8 text-center text-white/60 text-sm space-y-1">
          <p>• Crea una sala y comparte el código</p>
          <p>• O únete a una sala con un código</p>
          <p>• Juega en tiempo real desde cualquier lugar</p>
        </div>
      </div>
    </div>
  );
};

