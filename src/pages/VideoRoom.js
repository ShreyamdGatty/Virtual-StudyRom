import React from 'react';

const videoData = [
  {
    title: 'Trignometric Basic',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv-TwE9t8jcAaPrLzskHsf4cBpooVV_iEMCg&s',
    link: 'https://www.youtube.com/watch?v=abcd1234',
  },
  {
    title: 'English Grammer',
    thumbnail: 'https://m.media-amazon.com/images/I/81VSy5m2WjL._SY425_.jpg',
    link: 'https://www.youtube.com/watch?v=efgh5678',
  },
  {
    title: 'Introduction of Poverty',
    thumbnail: 'https://m.media-amazon.com/images/I/A18dzVDU1NL._SL1500_.jpg',
    link: 'https://www.youtube.com/watch?v=efgh5678',
  },
  {
    title: 'Black Day-India',
    thumbnail: 'https://th.bing.com/th/id/OIP.yrSCR4XHKp60wGTWXyaKcgHaHa?cb=iwp1&rs=1&pid=ImgDetMain',
    link: 'https://www.youtube.com/watch?v=efgh5678',
  },
  {
    title: 'Soliders are the real heros',
    thumbnail: 'https://sushrathk.wordpress.com/wp-content/uploads/2017/12/indian-army1.jpg',
    link: 'https://www.youtube.com/watch?v=efgh5678',
  },
  {
    title: 'Artificial Intelligence',
    thumbnail: 'https://rms.koenig-solutions.com/Sync_data/CCE_Logo//2914-HowtoMigrateOnPremisesVirtualMachinestoAWS(2)(1).pngL.jpg',
    link: 'https://www.youtube.com/watch?v=efgh5678',
  },
  {
    title: 'Machine Learning',
    thumbnail: 'https://www.blumeglobal.com/media/wp-content/uploads/2018/11/shutterstock_344688470-scaled.jpg?width=800&rnd=133498791085430000',
    link: 'https://www.youtube.com/watch?v=efgh5678',
  },
  {
    title: 'Python',
    thumbnail: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*3IcLSFuT8PQg4cUBaRXH1A.png',
    link: 'https://www.youtube.com/watch?v=efgh5678',
  },
];

const VideoRoom = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Welcome to the Video Room</h2>
      <p>Join live study sessions with peers.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {videoData.map((video, index) => (
          <a 
            key={index} 
            href={video.link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              width: '300px',
              textDecoration: 'none', 
              color: 'black',
              border: '1px solid #ccc',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '0.5rem 1rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>{video.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default VideoRoom;

  