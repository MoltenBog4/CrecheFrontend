import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import SubscribeForm from './components/Newsletter/SubscribeForm.jsx';

// Pages
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Services from './pages/Services/Services.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import ParentRegisterPage from './pages/Register/ParentRegisterPage.tsx';
import ChildRegisterPage from './pages/Register/ChildRegisterPage.tsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Newsletter from './pages/Newsletter/Newsletter.jsx';

import './App.css';

function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui' }}>
        <h2>⚠️ Something broke while rendering</h2>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#fff7f7', padding: 12, border: '1px solid #f1c0c0' }}>
          {String(error.stack || error.message || error)}
        </pre>
        <p>Tip: open DevTools → Console for details.</p>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return <ErrorCatcher onError={setError}>{children}</ErrorCatcher>;
}

class ErrorCatcher extends React.Component {
  componentDidCatch(err) {
    this.props.onError(err);
  }
  render() {
    return this.props.children;
  }
}

export default function App() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await fetch('http://localhost:8086/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: '⚠️ Oops! Something went wrong. Check backend/Ollama.',
      }]);
    }

    setInput('');
  };

  return (
    <ErrorBoundary>
      <Navbar onOpenSubscribe={() => setShowSubscribe(true)} />

      <Routes>
        <Route index element={<Home onOpenSubscribe={() => setShowSubscribe(true)} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register/parent" element={<ParentRegisterPage />} />
        <Route path="/register/child" element={<ChildRegisterPage />} />
        <Route path="/newsletter" element={<Newsletter />} /> {/* ✅ NEW ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>



      <Footer />

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          borderRadius: '50%',
          padding: '16px',
          backgroundColor: '#007c89',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        aria-label="Open chatbot"
      >
        💬
      </button>

      {/* Chat Popup */}
      {showChat && (
        <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Creche ChatBot">
          <div className="popup-content">
            <button
              onClick={() => setShowChat(false)}
              className="close-btn"
              aria-label="Close chatbot"
            >
              ✖
            </button>
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
                placeholder="Ask about fees, hours, age groups..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Subscribe Popup */}
      {showSubscribe && (
        <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Subscribe to newsletter">
          <div className="popup-content">
            <button
              onClick={() => setShowSubscribe(false)}
              className="close-btn"
              aria-label="Close subscribe modal"
            >
              ✖
            </button>
            <SubscribeForm />
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}
