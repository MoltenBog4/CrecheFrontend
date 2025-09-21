import React, { useState } from 'react'


  const ChatBot = () => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')

    const sendMessage = async () => {
      if (!input.trim()) return

      const userMessage = { sender: 'user', text: input }
      setMessages(prev => [...prev, userMessage])

      try {
        const res = await fetch('http://localhost:8080/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input })
        })

        const data = await res.json()
        const botMessage = { sender: 'bot', text: data.reply }
        setMessages(prev => [...prev, botMessage])
      } catch (err) {
        console.error('Error:', err)
        const errorMsg = { sender: 'bot', text: '⚠️ Failed to reach the AI server.' }
        setMessages(prev => [...prev, errorMsg])
      }

      setInput('')
    }

    return (
      <div className="chatbot-wrapper">
        <h2 className="chatbot-title">🧠 Creche AI Assistant</h2>
        <div className="chatbot-box">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-msg ${msg.sender}`}>
              <p>
                <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
              </p>
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything about the creche..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    )
  }

  export default ChatBot
