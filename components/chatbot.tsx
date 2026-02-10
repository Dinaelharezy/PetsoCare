'use client'

export default function Chatbot() {

    
  return (
 <button 
        className="chat-fab"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgb(199, 242, 167) !important',
          border: 'none',
          fontSize: '1.8rem',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(124, 179, 66, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        }}
      >
        💬
      </button>

  )}