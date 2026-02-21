import React, { useState } from 'react';

export const OnlineGameScreen = ({ gameState, players, onComplete }: any) => {
  const [seleccion, setSeleccion] = useState<string | null>(null);

  const verdades = [
  "¿Cuál es tu fantasía sexual más profunda y oculta que aún no me has contado?",
  "¿Qué parte de mi cuerpo te excita más solo con mirarla?",
  "Describe la forma en que más te gusta que te inicien en un encuentro íntimo.",
  "¿Hay algún juego de rol que siempre hayas querido probar conmigo?",
  "¿Cuál es el recuerdo más caliente que tenemos juntos?",
  "¿Qué es lo que más te gusta que te diga durante el sexo?",
  "¿Prefieres un encuentro rápido y apasionado o uno largo y lleno de juegos previos?",
  "¿Cuál es tu lugar favorito de tu cuerpo para que te lo besen?",
  "¿Qué ropa te pongo que te vuelve loco/a?",
  "¿Hay algo que te gustaría probar en la cama que aún no hayamos hecho?",
  "Describe, con todo lujo de detalles, tu noche de sexo perfecta conmigo.",
  "¿Qué es lo que más te gusta de cómo te lo hago a ti?",
  "Si tuvieras que elegir un solo acto sexual para el resto de tu vida, ¿cuál sería?",
  "¿Qué sonido hago en la cama que más te gusta?",
  "¿Cuál es tu postura sexual favorita y por qué?",
  "¿Hay alguna zona erógena tuya que crees que no he descubierto aún?",
  "¿Qué es lo más atrevido que has pensado hacer conmigo en un lugar público?",
  "¿Cómo te sientes cuando te doy un masaje? ¿Qué parte te gusta que masajee más?",
  "¿Qué palabra o frase en tu oído te garantiza que te pondrás caliente al instante?",
  "Si pudieras grabarnos teniendo sexo en un lugar secreto, ¿dónde sería?"
];

  const retos = [
    "Reto: Envíale una foto tuya en la ropa interior que llevas ahora mismo.",
    "Reto: Grábate un video de 15 segundos tocandote lo que mas te excita.",
    "Reto: Describe con lujo de detalles tu fantasía secreta favorita.",
    "Reto: Elige una parte de tu cuerpo que te encante y envíale una foto muy cercana (close-up) de esa zona.",
    "Reto: Envíale un mensaje de audio susurrando lo que te gustaría hacerle/le hicieran esta noche.",
    "Reto: Píntale o dibújale algo en su espalda usando solo los dedos. Debe adivinar qué es.",
    "Reto: Graba un video corto bailando de forma sensual para él/ella.",
    "Reto: Envíale una foto de la prenda de ropa que te quitarás a continuación.",
    "Juego de Roles: Eres un/a masajista profesional. Dale un masaje de 3 minutos en los hombros o el cuello (si están juntos) o describe cómo lo harías (si están a distancia).",
    "Reto: Escribe un pequeño cuento erótico donde ambos son los protagonistas y léelo en voz alta o envíaselo por escrito.",
    "Reto: Envíale una foto de ti haciendo tu mejor pose 'sexy y misterioso/a'.",
    "Reto: Dile tres cosas que te gustaría probar con él/ella en la cama, sin filtros.",
    "Reto: Grábate un video quitándote una prenda de ropa lentamente.",
    "Reto: Envíale un emoji que represente lo que te apetece hacer ahora y déjale que adivine el resto.",
    "Reto: Describe la primera vez que te sentiste atraído/a hacia él/ella con todo lujo de detalles.",
    "Reto: Haz una lista de 5 lugares donde te gustaría tener sexo y compártela.",
    "Reto: Grábate un video tocando los lugares de tu cuerpo que te gustaria que tocara.",
    "Reto: Envíale una selfie desde el ángulo que tú consideras más sexy.",
    "Reto: Elige una canción y envíale el fragmento que más te pone y explícale por qué."
  ];

  // Función para obtener un texto al azar
  const obtenerAzar = (lista: string[]) => lista[Math.floor(Math.random() * lista.length)];

  const manejarEleccion = (tipo: 'verdad' | 'reto') => {
    const texto = tipo === 'verdad' ? obtenerAzar(verdades) : obtenerAzar(retos);
    setSeleccion(`${tipo.toUpperCase()}: ${texto}`);
  };

  const finalizarTurno = () => {
    onComplete({ challengeDone: true });
    setSeleccion(null); // Reiniciar para el siguiente
  };

  return (
    <div className="p-6 text-center bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Tu Turno</h2>
      
      {!seleccion ? (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4">¿Qué eliges para este turno?</p>
          <button 
            onClick={() => manejarEleccion('verdad')}
            className="w-full bg-blue-500 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-600 transition"
          >
            🤔 VERDAD
          </button>
          <button 
            onClick={() => manejarEleccion('reto')}
            className="w-full bg-red-500 text-white py-4 rounded-lg font-bold text-xl hover:bg-red-600 transition"
          >
            🔥 RETO
          </button>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200 mb-6">
            <p className="text-xl font-medium text-gray-800">{seleccion}</p>
          </div>
          <button 
            onClick={finalizarTurno}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600"
          >
            ¡Hecho! Siguiente
          </button>
        </div>
      )}

      <div className="mt-8 text-left border-t pt-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase">Puntuaciones</h3>
        {players.map((p: any) => (
          <div key={p.id} className="flex justify-between items-center py-1">
            <span className="text-gray-700">{p.name}</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">
              {p.score} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
