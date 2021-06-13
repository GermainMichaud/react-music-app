import React, { useEffect, useState } from 'react';
import { usePlayerStore } from './store';
import './App.css';

function App() {
  const fetchAll = usePlayerStore(state => state.fetchAll);
  const getMusic = usePlayerStore(state => state.getMusic);
  const setCurrentMusic = usePlayerStore(state => state.setCurrentMusic);
  const playlist = usePlayerStore(state => state.playlist);

  useEffect(() => {
    fetchAll();
  }, []);

  const selectMusic = music => {
    setCurrentMusic(music);
    getMusic(music.slug);
  };

  return (
    <div className="App">
      <h1>Music app</h1>
      {playlist.map(music => (
        <li key={music.id} onClick={() => selectMusic(music)}>
          {JSON.stringify(music)}
        </li>
      ))}
    </div>
  );
}

export default App;
