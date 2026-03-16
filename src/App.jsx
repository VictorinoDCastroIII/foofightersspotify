import { useEffect, useState } from 'react';

export default function App() {
  const [albums, setAlbums] = useState([]);
  const [activeId, setActiveId] = useState('30ly6tGAVdWv3JZKZt09nd');

  useEffect(() => {
    // This calls your Redis-powered API
    fetch('/api/discography')
      .then(res => res.json())
      .then(data => setAlbums(data))
      .catch(err => console.error("API not ready yet:", err));
  }, []);

  return (
    <div style={{ background: '#111', color: '#fff', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '300px', padding: '20px', borderRight: '1px solid #333' }}>
        <h1 style={{ color: '#ff0033' }}>FOO FIGHTERS</h1>
        <hr border="1px solid #444" />
        {albums.map(a => (
          <div 
            key={a.id} 
            onClick={() => setActiveId(a.spotifyId)} 
            style={{ 
              cursor: 'pointer', 
              padding: '10px 0',
              color: activeId === a.spotifyId ? '#ff0033' : '#ccc',
              fontWeight: activeId === a.spotifyId ? 'bold' : 'normal'
            }}
          >
            {a.title} ({a.year})
          </div>
        ))}
      </aside>
      <main style={{ flex: 1, padding: '40px' }}>
        <iframe 
          src={`https://open.spotify.com/embed/album/${activeId}`} 
          width="100%" 
          height="500" 
          frameBorder="0" 
          allow="encrypted-media"
          style={{ borderRadius: '12px' }}
        ></iframe>
      </main>
    </div>
  );
}