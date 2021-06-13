import React, { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from './store';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const currentSrc = usePlayerStore(state => state.currentSrc);
  const currentMusic = usePlayerStore(state => state.currentMusic);
  const currentTime = usePlayerStore(state => state.currentTime);
  const duration = usePlayerStore(state => state.duration);
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const setIsPlaying = usePlayerStore(state => state.setIsPlaying);
  const setCurrentTime = usePlayerStore(state => state.setCurrentTime);
  const setDuration = usePlayerStore(state => state.setDuration);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.addEventListener('play', () => setIsPlaying(true));
    audioRef.current.addEventListener('pause', () => setIsPlaying(false));
    audioRef.current.addEventListener('timeupdate', () => {
      if (!duration) {
        setDuration(audioRef.current.duration);
      }
      setCurrentTime(audioRef.current.currentTime);
    });
  }, []);

  useEffect(() => {
    if (currentSrc && audioRef.current) {
      console.log(currentSrc);
      audioRef.current.currentTime = 0;
      audioRef.current.src = currentSrc;
      audioRef.current.play();
      setCurrentTime(0);
      setDuration(null);
    }
  }, [currentSrc]);

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const timeFormat = d => {
    if (isNaN(d)) {
      return '--:--';
    }
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h >= 10 ? h : h > 0 ? '0' + h : null;
    var mDisplay = m >= 10 ? m : '0' + m;
    var sDisplay = s >= 10 ? s : '0' + s;
    return `${hDisplay ? hDisplay + ' : ' : ''}${mDisplay}:${sDisplay}`;
  };

  return (
    <div className="player">
      {currentSrc && <p>Current: {currentMusic.name}</p>}
      <p>
        {timeFormat(currentTime)}/{timeFormat(duration)}
      </p>
      <button disabled={!currentSrc} onClick={handlePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button disabled={!currentSrc} onClick={handleStop}>
        Stop
      </button>
    </div>
  );
};

export default AudioPlayer;
