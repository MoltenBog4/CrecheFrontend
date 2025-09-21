import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ChatBot from './components/ChatBot/ChatBot.jsx';
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

import './App.css';

/* ---------- ErrorBoundary (shows runtime errors instead of blank) ---------- */
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
/* ------------------------------------------------------------------------- */

export default function App() {
  const [showSubscribe, setShowSubscribe] = useState(false);

  const openSubscribe = () => setShowSubscribe(true);
  const closeSubscribe = () => setShowSubscribe(false);

  return (
    <ErrorBoundary>
      <Navbar onOpenSubscribe={openSubscribe} />

      <Routes>
        <Route index element={<Home onOpenSubscribe={openSubscribe} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register/parent" element={<ParentRegisterPage />} />
        <Route path="/register/child" element={<ChildRegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ChatBot />

      {showSubscribe && (
        <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Subscribe to newsletter">
          <div className="popup-content">
            <button
              onClick={closeSubscribe}
              className="close-btn"
              aria-label="Close subscribe modal"
              type="button"
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
