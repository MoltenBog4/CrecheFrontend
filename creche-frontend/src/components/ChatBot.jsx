import React, { useState } from 'react';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
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

            const data = await res.json();
            const botMessage = { sender: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            console.error('Error:', err);
            const errorMsg = { sender: 'bot', text: '⚠️ Failed to reach the AI server.' };
            setMessages(prev => [...prev, errorMsg]);
        }

        setInput('');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
            <h2>🧠 Creche AI Assistant</h2>
            <div style={{
                border: '1px solid #ccc',
                padding: '10px',
                height: '300px',
                overflowY: 'auto',
                marginBottom: '10px',
                backgroundColor: '#f9f9f9'
            }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <p style={{
                            background: msg.sender === 'user' ? '#d1e7dd' : '#e2e3e5',
                            display: 'inline-block',
                            padding: '8px 12px',
                            borderRadius: '10px',
                            margin: '4px 0',
                            maxWidth: '80%'
                        }}>
                            <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
                        </p>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    style={{ flex: 1, padding: '10px', fontSize: '16px' }}
                    placeholder="Ask me anything about the creche..."
                />
                <button onClick={sendMessage} style={{ padding: '10px 20px' }}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;
