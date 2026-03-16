import { useEffect, useState } from 'react';

export default function App() {
  const [albums, setAlbums] = useState([]);
  const [activeId, setActiveId] = useState('30ly6tGAVdWv3JZKZt09nd');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This calls your Redis-powered API
    fetch('/api/discography')
      .then(res => res.json())
      .then(data => {
        setAlbums(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API not ready yet:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ background: '#111', color: '#fff', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '300px', padding: '20px', borderRight: '1px solid #333', overflowY: 'auto' }}>
        <h1 style={{ color: '#ff0033', letterSpacing: '2px', marginBottom: '10px' }}>FOO FIGHTERS</h1>
        <p style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>DISCOGRAPHY</p>
        <hr style={{ border: '0', borderTop: '1px solid #333', marginBottom: '20px' }} />
        
        {loading ? (
          <p style={{ color: '#666' }}>Loading albums...</p>
        ) : (
          albums.map(a => (
            <div 
              key={a.id} 
              onClick={() => setActiveId(a.spotifyId)} 
              style={{ 
                cursor: 'pointer', 
                padding: '12px 0',
                transition: '0.2s',
                color: activeId === a.spotifyId ? '#ff0033' : '#aaa',
                fontWeight: activeId === a.spotifyId ? 'bold' : 'normal',
                borderBottom: '1px solid #222'
              }}
            >
              {a.title.toUpperCase()}
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>{a.year}</div>
            </div>
          ))
        )}
      </aside>

      {/* Main Player Area */}
      <main style={{ flex: 1, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <iframe 
            // THE CORRECTED URL FORMAT:
            src={`https://open.spotify.com/embed/album/${activeId}?utm_source=generator&theme=0`} 
            width="100%" 
            height="500" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            style={{ borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
          ></iframe>
        </div>
      </main>
    </div>
  );
}