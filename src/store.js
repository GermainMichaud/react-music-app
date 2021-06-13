import axios from 'axios';
import create from 'zustand';

const SERVER_URL = 'http://localhost:4500';

export const usePlayerStore = create(set => ({
  playlist: [], // Exemple: [{id: 0, name: 'The brief', slug: 'the_brief'}, {id: 1, name: 'Rainbow', slug: 'rainbow'}, ………]
  currentMusic: {},
  currentSrc: null,
  isPlaying: false,
  duration: null,
  currentTime: null,
  fetchAll: async () => {
    const res = await axios.get(`${SERVER_URL}/musics`);
    const data = await res.data;
    set(() => ({ playlist: data }));
  },
  getMusic: async musicName => {
    // musicName = slug
    try {
      //   const blob = await axios.get(`${SERVER_URL}/music/${musicName}`, {
      //     responseType: 'blob',
      //   }); // Erreur lorsque j'essaie de lire les autres musiques. La première OK
      const res = await fetch(`${SERVER_URL}/music/${musicName}`);
      const data = await res.blob();
      const src = URL.createObjectURL(data);
      set(() => ({ currentSrc: src }));
    } catch (err) {
      console.log('ERROR => ', err.message);
    }
  },
  setCurrentMusic: music => set(() => ({ currentMusic: music })),
  setIsPlaying: value => set(() => ({ isPlaying: value })),
  setCurrentTime: value => set(() => ({ currentTime: value })),
  setDuration: value => set(() => ({ duration: value })),
}));
