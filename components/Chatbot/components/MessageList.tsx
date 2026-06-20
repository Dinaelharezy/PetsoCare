import { RefObject } from 'react'
import { Message } from '../../../types/Chatbot'

interface MessageListProps {
  messages: Message[]
  isTyping: boolean
  messagesEndRef: RefObject<HTMLDivElement | null>
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MessageList({ messages, isTyping, messagesEndRef }: MessageListProps) {
  return (
    <div className="messages-area">
      {messages.map((msg, i) => (
        <div
          key={msg.id}
          className={`msg-row ${msg.sender}`}
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {msg.sender === 'bot' && <div className="bot-avatar">🐾</div>}
          <div className={`msg-bubble ${msg.sender}`}>
            <div className="msg-text">{msg.text}</div>
            <div className="msg-time">{formatTime(msg.timestamp)}</div>
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="msg-row bot">
          <div className="bot-avatar">🐾</div>
          <div className="msg-bubble bot typing-bubble">
            <div className="typing-dots">
              <span /><span /><span />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}