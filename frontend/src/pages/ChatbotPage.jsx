import { ArrowLeft, Send, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Brand from '../components/Brand.jsx';
import { chatMessages, chatSlots } from '../data/mockData.js';

function ChatbotPage() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');

  function sendMessage(event) {
    event.preventDefault();
    if (!input.trim()) return;
    setMessages((current) => [...current, { from: 'user', text: input.trim() }]);
    setInput('');
  }

  return (
    <div className="chatbot-page">
      <header className="chat-topbar">
        <Link className="back-link" to="/"><ArrowLeft size={16} /> Voltar</Link>
        <Brand />
      </header>

      <main className="chat-shell">
        <section className="chat-card">
          <header className="bot-header">
            <span className="bot-avatar"><Stethoscope size={21} /></span>
            <div>
              <strong>Assistente MedAgenda</strong>
              <small><span className="online-dot" /> Atendendo agora</small>
            </div>
          </header>

          <div className="messages-area">
            {messages.map((message, index) => (
              <div className={`message-row ${message.from}`} key={`${message.from}-${index}`}>
                <p className="message-bubble">{message.text}</p>
              </div>
            ))}
            <div className="chip-group" aria-label="Opções de conversa">
              <button type="button">Cardiologia</button>
              <button type="button">Retorno</button>
              <button type="button">Primeira consulta</button>
            </div>
            <div className="slot-chip-grid" aria-label="Horários sugeridos">
              {chatSlots.map((slot) => <button type="button" key={slot}>{slot}</button>)}
            </div>
          </div>

          <form className="chat-input" onSubmit={sendMessage}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Digite sua mensagem..." />
            <button type="submit" aria-label="Enviar mensagem"><Send size={17} /></button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ChatbotPage;
