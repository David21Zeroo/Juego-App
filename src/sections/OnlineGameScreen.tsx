import React, { useState } from 'react';

export const OnlineGameScreen = ({ gameState, players, onComplete }: any) => {
  // AQUÍ ES DONDE CAMBIAS LOS RETOS:
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

  const handleAction = () => {
    onComplete({ challengeDone: true });
  };

  return (
    <div className="p-6 text-center bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">¡En Juego!</h2>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6 min-h-[100px] flex items-center justify-center">
        <p className="text-xl italic">"{retos[Math.floor(Math.random() * retos.length)]}"</p>
      </div>

      <button 
        onClick={handleAction}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
      >
        Siguiente Reto
      </button>

      <div className="mt-6 text-left">
        <h3 className="font-semibold text-gray-700 border-b pb-2">Jugadores:</h3>
        {players.map((p: any) => (
          <div key={p.id} className="flex justify-between py-1">
            <span>{p.name}</span>
            <span className="font-mono text-blue-600">{p.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};
