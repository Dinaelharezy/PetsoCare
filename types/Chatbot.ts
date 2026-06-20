export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface ChatHistory {
  role: 'user' | 'assistant'
  content: string
}