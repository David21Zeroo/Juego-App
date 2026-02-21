import React from 'react';

export const ResultScreen = ({ players, onRestart }: any) => {
  return (
    <div className="result-container">
      <h2>¡Juego Terminado!</h2>
      <ul>
        {players.map((p: any) => (
          <li key={p.id}>{p.name}: {p.score} pts</li>
        ))}
      </ul>
      <button onClick={onRestart}>Volver al Inicio</button>
    </div>
  );
};
