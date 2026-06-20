import { RefObject } from 'react'
import { Spinner } from 'react-bootstrap'

interface InputBarProps {
  inputText: string
  isTyping: boolean
  inputRef: RefObject<HTMLInputElement | null>
  onChange: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
}

export default function InputBar({
  inputText,
  isTyping,
  inputRef,
  onChange,
  onSend,
  onKeyPress,
}: InputBarProps) {
  return (
    <div className="input-bar">
      <div className="input-wrap">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={e => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask me anything about your pet…"
          className="chat-input"
        />
        <button
          onClick={onSend}
          disabled={!inputText.trim() || isTyping}
          className="send-btn"
        >
          {isTyping ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>
      <p className="input-hint">Press Enter to send</p>
    </div>
  )
}