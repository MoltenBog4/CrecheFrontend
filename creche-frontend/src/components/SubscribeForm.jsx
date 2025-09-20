import React, { useState } from 'react';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const res = await fetch('http://localhost:8086/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const msg = await res.text();
      setStatus('✅ Thank you! Please check your email.');
    } catch (err) {
      setStatus('⚠️ Failed to send email. Try again.');
    }

    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h3>📬 Subscribe to Newsletter</h3>
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyles}
      />
      <button type="submit" style={buttonStyles}>Subscribe</button>
      {status && <p>{status}</p>}
    </form>
  );
};

const formStyles = {
  maxWidth: '400px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '6px',
};

const inputStyles = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
};

const buttonStyles = {
  padding: '10px 15px',
  backgroundColor: '#007c89',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default SubscribeForm;
