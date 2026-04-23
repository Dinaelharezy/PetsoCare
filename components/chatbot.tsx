'use client'

import { useState, useRef, useEffect } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import Image from 'next/image'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🐾 Hello! I\'m your PetCare assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse = getBotResponse(inputText)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('vaccine') || input.includes('vaccination')) {
      return '💉 Vaccines are important for your pet\'s health! You can track upcoming vaccines in the Vaccines section. Would you like me to help you schedule one?'
    }
    if (input.includes('appointment') || input.includes('vet')) {
      return '🏥 I can help you find nearby vets or schedule appointments. What type of service does your pet need?'
    }
    if (input.includes('symptom') || input.includes('sick') || input.includes('hurt')) {
      return '🚨 If your pet is showing concerning symptoms, please contact a veterinarian immediately. Would you like me to find emergency vet contacts near you?'
    }
    if (input.includes('food') || input.includes('diet') || input.includes('eat')) {
      return '🍖 Proper nutrition is essential for pets. Each pet has different dietary needs based on age, breed, and health condition. Consult your vet for personalized advice!'
    }
    if (input.includes('reminder') || input.includes('remind')) {
      return '🔔 You can set reminders for vaccines, medications, and vet appointments. Go to the Vaccines section and enable the reminder toggle!'
    }
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return '👋 Hello! How can I assist you with your pet\'s health today?'
    }
    if (input.includes('thank')) {
      return '🐶 You\'re welcome! I\'m here to help anytime. Give your pet a treat from me! 🦴'
    }
    
    return '🐱 I\'m here to help with pet health questions! You can ask me about vaccines, vet appointments, pet care tips, or setting reminders. What would you like to know?'
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Chat Button */}
   <button
  onClick={() => setIsOpen(!isOpen)}
  style={{
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgb(199, 242, 167)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    fontSize: '28px', // ← حجم الأيقونة
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'scale(1.1)'
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)'
  }}
>
  {isOpen ? '✕' : '💬'}  {/* ← بدل الـ SVG، حطي ✕ و 💬 */}
</button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '24px',
            width: '380px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            overflow: 'hidden',
            border: `2px solid rgb(199, 242, 167)`,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'rgb(199, 242, 167)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '24px' }}>🐾</span>
            </div>
            <div>
              <h6 style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>
                PetCare Assistant
              </h6>
              <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>
                Online • Ready to help
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: '#f9f9f9',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: message.sender === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                    backgroundColor: message.sender === 'user' ? 'rgb(199, 242, 167)' : 'white',
                    color: message.sender === 'user' ? '#333' : '#555',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    border: message.sender === 'bot' ? '1px solid #e0e0e0' : 'none',
                  }}
                >
                  <div style={{ fontSize: '14px', lineHeight: '1.4' }}>
                    {message.text}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      marginTop: '4px',
                      color: message.sender === 'user' ? '#555' : '#999',
                      textAlign: 'right',
                    }}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#999',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '-0.32s',
                      }}
                    />
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#999',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '-0.16s',
                      }}
                    />
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#999',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #e0e0e0',
              backgroundColor: 'white',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '10px 14px',
                border: '1px solid #e0e0e0',
                borderRadius: '24px',
                outline: 'none',
                fontSize: '14px',
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgb(199, 242, 167)',
                border: 'none',
                cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: inputText.trim() ? 1 : 0.5,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  )
}
  