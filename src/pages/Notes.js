import React, { useState, useEffect } from 'react';

const ImportantPoints = () => {
  const [point, setPoint] = useState('');
  const [pointsList, setPointsList] = useState([]);

  // Load saved points from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('importantPoints');
    if (stored) setPointsList(JSON.parse(stored));
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem('importantPoints', JSON.stringify(pointsList));
  }, [pointsList]);

  const addPoint = () => {
    if (point.trim() === '') return;
    setPointsList([...pointsList, point]);
    setPoint('');
  };

  const deletePoint = (index) => {
    const updated = pointsList.filter((_, i) => i !== index);
    setPointsList(updated);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>📌 Important Points</h2>
      <input
        type="text"
        value={point}
        onChange={(e) => setPoint(e.target.value)}
        placeholder="Add an important point..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      />
      <button
        onClick={addPoint}
        style={{
          padding: '8px 16px',
          fontSize: '1rem',
          marginBottom: '1rem',
          cursor: 'pointer',
        }}
      >
        ➕ Add Point
      </button>

      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        {pointsList.map((p, i) => (
          <li
            key={i}
            style={{
              background: '#f4f4f4',
              padding: '10px',
              marginBottom: '8px',
              borderRadius: '6px',
              position: 'relative',
            }}
          >
            {p}
            <button
              onClick={() => deletePoint(i)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                background: 'none',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImportantPoints;
