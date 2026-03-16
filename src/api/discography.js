const { Redis } = require('@upstash/redis');

// This looks for your Environment Variables automatically
const redis = Redis.fromEnv();

module.exports = async (req, res) => {
  try {
    // Try to get the cached list
    let data = await redis.get('foo_discography');
    
    // If Redis is empty, we fill it
    if (!data) {
      data = [
        { id: '1', title: 'The Colour and the Shape', year: 1997, spotifyId: '30ly6tGAVdWv3JZKZt09nd' },
        { id: '2', title: 'Wasting Light', year: 2011, spotifyId: '1689n0SOf9NoF9p86Sbsit' },
        { id: '3', title: 'But Here We Are', year: 2023, spotifyId: '09G7S74S578S57s4S57S' },
        { id: '4', title: 'Echoes, Silence, Patience & Grace', year: 2007, spotifyId: '59m96vP3H4877D6v34uUv3' }
      ];
      await redis.set('foo_discography', data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};