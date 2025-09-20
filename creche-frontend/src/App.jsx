import React, { useState } from 'react';
import './App.css';
import SubscribeForm from './components/SubscribeForm';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await fetch('http://localhost:8086/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: '⚠️ Oops! Something went wrong. Check backend/Ollama.'
      }]);
    }

    setInput('');
  };

  return (
    <div className="App">
      <h1>👶 Little Einsteins Crèche</h1>

      {/* Popup Triggers */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowChat(true)}>💬 Chat with us</button>
        <button onClick={() => setShowSubscribe(true)} style={{ marginLeft: '10px' }}>
          📧 Subscribe
        </button>
      </div>

      {/* Chat Popup */}
      {showChat && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={() => setShowChat(false)} className="close-btn">✖</button>
            <h2>🧸 Crèche ChatBot</h2>
            <div className="chat-box">
              {messages.map((msg, index) => (
                <div key={index} className={`msg ${msg.sender}`}>
                  <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about hours, fees, etc..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Subscribe Popup */}
      {showSubscribe && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={() => setShowSubscribe(false)} className="close-btn">✖</button>
            <SubscribeForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
