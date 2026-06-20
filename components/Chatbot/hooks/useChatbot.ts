import { useState, useRef, useEffect } from 'react'
import { Message, ChatHistory } from '../../../types/Chatbot'

const WELCOME_MESSAGE: Message = {
  id: '1',
  text: '🐾 Welcome to PetCare AI Assistant! I can help you with:\n\n• Rabies prevention and vaccination\n• Pet health tips and advice\n• Emergency guidance\n• Answering your pet-related questions\n\nHow can I help you today?',
  sender: 'bot',
  timestamp: new Date(),
}

export function useChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimatingIn, setIsAnimatingIn] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setIsAnimatingIn(true)
      inputRef.current?.focus()
    } else {
      setIsAnimatingIn(false)
    }
  }, [isOpen])

  const toggleOpen = () => setIsOpen(prev => !prev)
  const close = () => setIsOpen(false)

  const sendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])

    const newHistory: ChatHistory[] = [...chatHistory, { role: 'user', content: inputText }]
    setChatHistory(newHistory)

    const userInput = inputText
    setInputText('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/Ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput, history: chatHistory }),
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error('Error calling AI:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "🐾 I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return {
    isOpen,
    isAnimatingIn,
    messages,
    inputText,
    isTyping,
    messagesEndRef,
    inputRef,
    toggleOpen,
    close,
    sendMessage,
    setInputText,
    handleKeyPress,
  }
}