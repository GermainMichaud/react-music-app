import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AudioPlayer from './AudioPlayer';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <AudioPlayer />
  </React.StrictMode>,
  document.getElementById('root')
);
