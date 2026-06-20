// 'use client'

// import { useChatBot } from './hooks/useChatbot'
// import ChatHeader from './components/ChatHeader'
// import MessageList from './components/MessageList'
// import InputBar from './components/InputBar'
// import { chatBotStyles } from './style'

// export default function ChatBot() {
//   const {
//     isOpen,
//     isAnimatingIn,
//     messages,
//     inputText,
//     isTyping,
//     messagesEndRef,
//     inputRef,
//     toggleOpen,
//     close,
//     sendMessage,
//     setInputText,
//     handleKeyPress,
//   } = useChatBot()

//   return (
//     <>
//       {/* Floating Button */}
//       <button onClick={toggleOpen} className="chat-fab" aria-label="Open chat">
//         <span className={`fab-icon ${isOpen ? 'rotated' : ''}`}>
//           {isOpen ? (
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//               <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
//             </svg>
//           ) : (
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//             </svg>
//           )}
//         </span>
//         {!isOpen && <span className="fab-ping" />}
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className={`chat-window ${isAnimatingIn ? 'slide-in' : ''}`}>
//           <ChatHeader onClose={close} />
//           <MessageList messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef} />
//           <InputBar
//             inputText={inputText}
//             isTyping={isTyping}
//             inputRef={inputRef}
//             onChange={setInputText}
//             onSend={sendMessage}
//             onKeyPress={handleKeyPress}
//           />
//         </div>
//       )}

//       <style jsx global>{chatBotStyles}</style>
//     </>
//   )
// }
'use client'

import { useChatBot } from './hooks/useChatbot'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import InputBar from './components/InputBar'
import { chatBotStyles } from './style'

export default function ChatBot() {
  const {
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
  } = useChatBot()

  return (
    <>
      {/* Floating Button */}
      <button onClick={toggleOpen} className="chat-fab" aria-label="Open chat">
        <span className={`fab-icon ${isOpen ? 'rotated' : ''}`}>
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </span>
        {!isOpen && <span className="fab-ping" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`chat-window ${isAnimatingIn ? 'slide-in' : ''}`}>
          <ChatHeader onClose={close} />
          <MessageList messages={messages} isTyping={isTyping} messagesEndRef={messagesEndRef} />
          <InputBar
            inputText={inputText}
            isTyping={isTyping}
            inputRef={inputRef}
            onChange={setInputText}
            onSend={sendMessage}
            onKeyPress={handleKeyPress}
          />
        </div>
      )}

      <style jsx global>{chatBotStyles}</style>
    </>
  )
}