export const chatBotStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700&display=swap');

  /* ── FAB ── */
  .chat-fab {
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: rgb(199, 242, 167) !important;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    color: #1a4000;
    box-shadow: 0 8px 24px rgba(108, 200, 45, 0.45), 0 2px 8px rgba(0,0,0,0.12);
    transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
  }
  .chat-fab:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 32px rgba(108, 200, 45, 0.55), 0 4px 12px rgba(0,0,0,0.15);
  }
  .chat-fab:active { transform: scale(0.95); }
  .fab-icon { display: flex; transition: transform 0.3s ease; }
  .fab-icon.rotated { transform: rotate(90deg); }
  .fab-ping {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ff4e4e;
    border: 2px solid white;
    animation: ping 2s cubic-bezier(0,0,.2,1) infinite;
  }
  @keyframes ping {
    0%   { transform: scale(1); opacity: 1; }
    75%, 100% { transform: scale(1.8); opacity: 0; }
  }

  /* ── Window ── */
  .chat-window {
    position: fixed;
    bottom: 100px;
    right: 28px;
    width: 390px;
    height: 480px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 32px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    z-index: 999;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    border: 1px solid rgba(168,240,96,0.2);
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  .chat-window.slide-in {
    animation: windowIn 0.35s cubic-bezier(.34,1.4,.64,1) forwards;
  }
  @keyframes windowIn {
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── Header ── */
  .chat-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 18px;
    background: linear-gradient(135deg, #1e3a0f 0%, #2d5a18 100%);
    position: relative;
    overflow: hidden;
  }
  .chat-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 80% 50%, rgba(168,240,96,0.15) 0%, transparent 60%);
    pointer-events: none;
  }
  .header-avatar {
    width: 42px;
    height: 42px;
    border-radius: 14px;
    background: rgba(168,240,96,0.18);
    border: 1.5px solid rgba(168,240,96,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    position: relative;
    flex-shrink: 0;
  }
  .status-dot {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #a8f060;
    border: 2px solid #1e3a0f;
    box-shadow: 0 0 6px rgba(168,240,96,0.7);
  }
  .header-info { flex: 1; }
  .header-title {
    display: block;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #e8ffd4;
    letter-spacing: 0.2px;
  }
  .header-sub {
    display: block;
    font-size: 11px;
    color: rgba(168,240,96,0.75);
    margin-top: 1px;
    font-weight: 400;
  }
  .close-btn {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: rgba(255,255,255,0.7);
    transition: background 0.2s, color 0.2s;
  }
  .close-btn:hover { background: rgba(255,255,255,0.15); color: white; }

  /* ── Messages ── */
  .messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f8faf5;
    scroll-behavior: smooth;
  }
  .messages-area::-webkit-scrollbar { width: 4px; }
  .messages-area::-webkit-scrollbar-track { background: transparent; }
  .messages-area::-webkit-scrollbar-thumb { background: #d4e8c0; border-radius: 4px; }

  .msg-row {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    animation: msgIn 0.3s cubic-bezier(.34,1.3,.64,1) both;
  }
  .msg-row.user { flex-direction: row-reverse; }
  @keyframes msgIn {
    from { opacity: 0; transform: translateY(10px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .bot-avatar {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    background: linear-gradient(145deg, #e8ffd4, #c5f28a);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(108,200,45,0.2);
  }

  .msg-bubble {
    max-width: 76%;
    padding: 10px 14px;
    border-radius: 18px;
    position: relative;
  }
  .msg-bubble.bot {
    background: white;
    border-bottom-left-radius: 4px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    border: 1px solid rgba(0,0,0,0.05);
  }
  .msg-bubble.user {
    background: linear-gradient(145deg, #a8f060, #7dd43a);
    border-bottom-right-radius: 4px;
    box-shadow: 0 4px 16px rgba(108,200,45,0.35);
  }

  .msg-text {
    font-size: 13.5px;
    line-height: 1.55;
    white-space: pre-wrap;
    color: #222;
    font-weight: 400;
  }
  .msg-bubble.user .msg-text { color: #1a4000; font-weight: 500; }

  .msg-time {
    font-size: 10px;
    margin-top: 5px;
    text-align: right;
    opacity: 0.5;
    font-weight: 400;
  }
  .msg-bubble.user .msg-time { color: #1a4000; }

  /* Typing */
  .typing-bubble { padding: 12px 16px !important; }
  .typing-dots { display: flex; gap: 5px; align-items: center; }
  .typing-dots span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: linear-gradient(145deg, #a8f060, #6fc92e);
    animation: typingBounce 1.2s ease-in-out infinite;
  }
  .typing-dots span:nth-child(2) { animation-delay: 0.15s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.3s; }
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
    30% { transform: translateY(-6px); opacity: 1; }
  }

  /* ── Input ── */
  .input-bar {
    padding: 12px 14px 10px;
    background: white;
    border-top: 1px solid #f0f0f0;
  }
  .input-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f4f6f0;
    border-radius: 16px;
    padding: 6px 6px 6px 14px;
    border: 1.5px solid transparent;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input-wrap:focus-within {
    border-color: #a8f060;
    box-shadow: 0 0 0 3px rgba(168,240,96,0.15);
    background: white;
  }
  .chat-input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    font-size: 13.5px;
    font-family: 'DM Sans', sans-serif;
    color: #222;
    font-weight: 400;
  }
  .chat-input::placeholder { color: #b0b8a8; }
  .send-btn {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    background: linear-gradient(145deg, #a8f060, #6fc92e);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1a4000;
    flex-shrink: 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s;
    box-shadow: 0 4px 12px rgba(108,200,45,0.4);
  }
  .send-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
  }
  .send-btn:not(:disabled):hover {
    transform: translateY(-1px) scale(1.05);
    box-shadow: 0 6px 16px rgba(108,200,45,0.5);
  }
  .send-btn:not(:disabled):active { transform: scale(0.93); }
  .input-hint {
    font-size: 10px;
    color: #c0c8b8;
    margin: 5px 0 0;
    text-align: center;
    font-weight: 400;
  }
`