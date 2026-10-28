import React, { useState } from 'react';
import { Send, X, FileText } from 'lucide-react';
import './ChatPanel.css';

const INITIAL_MESSAGES = [
  { sender: 'Dr. Priya Sharma', time: '14:30', text: 'Good afternoon, Vikramaditya! I have your latest ECG Holter report open. How have you been feeling since our last visit?' },
  { sender: 'You', time: '14:31', text: 'Hello Doctor! The palpitations have decreased, but I felt a brief flutter on Tuesday morning while walking uphill.' },
];

const ChatPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      sender: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputVal,
    };
    setMessages([...messages, newMsg]);
    setInputVal('');
  };

  return (
    <aside className="chat-panel" aria-label="Consultation live chat">
      <div className="chat-panel__header">
        <div>
          <h3 className="chat-panel__title">Encrypted Chat</h3>
          <span className="chat-panel__sub">256-bit HIPAA Secure</span>
        </div>
        <button type="button" className="chat-panel__close-btn" onClick={onClose} aria-label="Close chat">
          <X size={18} />
        </button>
      </div>

      <div className="chat-panel__messages">
        {messages.map((m, i) => {
          const isMe = m.sender === 'You';
          return (
            <div key={i} className={`chat-bubble-wrap${isMe ? ' is-me' : ''}`}>
              <div className="chat-bubble-meta">
                <span className="chat-sender">{m.sender}</span>
                <span className="chat-time">{m.time}</span>
              </div>
              <div className="chat-bubble">{m.text}</div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="chat-panel__input-bar">
        <input
          type="text"
          placeholder="Send clinical note or query..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="chat-send-btn" aria-label="Send message">
          <Send size={15} />
        </button>
      </form>
    </aside>
  );
};

export default ChatPanel;
