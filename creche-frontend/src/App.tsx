import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChildRegisterPage from './pages/ChildRegisterPage'; // Adjust the path as needed
import './App.css';

function ChatPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const botText = await res.text();
      const botMessage = { sender: 'bot', text: botText };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Oops! Something went wrong.' }]);
    }

    setInput('');
  };

  return (
    <div className="App">
      <h2>🧸 Welcome to Crèche ChatBot</h2>
      <nav>
        <Link to="/">Chat</Link> | <Link to="/register">Register Child</Link>
      </nav>
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
          placeholder="Ask me about fees, hours, age groups..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/register" element={<ChildRegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
