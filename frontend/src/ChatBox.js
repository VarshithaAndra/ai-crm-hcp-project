import React, { useState } from "react";

function ChatBox({ onLog, messages = [] }) {
    const [input, setInput] = useState("");

    const send = () => {
        if (!input.trim()) return;
        onLog(input);
        setInput("");
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3>AI Assistant</h3>
            
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {messages.length === 0 && <p style={{ color: '#888', fontStyle: 'italic' }}>No messages yet. Say hello!</p>}
                {messages.map((m, i) => (
                    <div key={i} style={{ 
                        margin: '5px 0', 
                        padding: '8px', 
                        borderRadius: '4px',
                        backgroundColor: m.sender === 'user' ? '#e3f2fd' : '#e8f5e9',
                        alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                        whiteSpace: 'pre-wrap'
                    }}>
                        <strong>{m.sender === 'user' ? 'You: ' : 'AI: '}</strong>
                        <span>{m.text}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex' }}>
                <input
                    style={{ flex: 1, padding: '8px', marginRight: '5px' }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    placeholder="Type a prompt..."
                />
                <button onClick={send} style={{ padding: '8px 16px' }}>Send</button>
            </div>
        </div>
    );
}

export default ChatBox;