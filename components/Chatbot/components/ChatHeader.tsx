interface ChatHeaderProps {
  onClose: () => void
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="chat-header">
      <div className="header-avatar">
        <span>🐾</span>
        <span className="status-dot" />
      </div>
      <div className="header-info">
        <span className="header-title">Preliminary Diagnosis Assistant</span>
        <span className="header-sub">Online • AI Powered</span>
      </div>
      <button className="close-btn" onClick={onClose} aria-label="Close chat">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}