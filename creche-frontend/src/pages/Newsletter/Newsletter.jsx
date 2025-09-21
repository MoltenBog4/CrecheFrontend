import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Newsletter = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8086/api/newsletters')
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch newsletters:', err);
      });
  }, []);

  const downloadFile = (filename) => {
    axios({
      url: `http://localhost:8086/api/newsletters/${filename}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📬 Newsletters</h2>
      {files.length === 0 ? (
        <p>No newsletters available right now.</p>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index} style={{ marginBottom: '1rem' }}>
              {file}
              <button
                onClick={() => downloadFile(file)}
                style={{
                  marginLeft: '1rem',
                  padding: '0.4rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Newsletter;
