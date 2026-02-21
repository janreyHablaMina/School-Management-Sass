'use client';

import React, { useState } from 'react';
import { PageHeader, listStyles } from '@/components/ui/shared';
import { STUDENT_CHATS, STUDENT_MESSAGES } from '@/lib/mock/studentProfile.mock';
import { Search, Send, Image as ImageIcon, Paperclip, MoreVertical } from 'lucide-react';
import uiStyles from '@/components/ui/ui.module.css';

export function StudentMessagesView() {
  const [activeTab, setActiveTab] = useState('All'); // All, Direct, Groups
  const [search, setSearch] = useState('');
  const [activeChatId, setActiveChatId] = useState(STUDENT_CHATS[0].id);
  const [messageInput, setMessageInput] = useState('');

  const filteredChats = STUDENT_CHATS.filter(chat => {
    const matchTab = activeTab === 'All' || 
      (activeTab === 'Direct' && chat.type === 'Direct') || 
      (activeTab === 'Groups' && chat.type === 'Group');
    const matchSearch = chat.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const activeChat = STUDENT_CHATS.find(c => c.id === activeChatId);
  const messages = (STUDENT_MESSAGES as Record<string, any[]>)[activeChatId] || [];

  return (
    <div className={listStyles.page} style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title="Messages"
        subtitle="Communicate with your teachers, school admins, and class group chats."
      />

      <div style={{ 
        display: 'flex', 
        flex: 1, 
        marginTop: '1rem',
        background: 'rgba(30, 33, 40, 0.4)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '12px',
        overflow: 'hidden',
        minHeight: 0 // important for flex child to scroll
      }}>
        {/* Left Sidebar - Chat List */}
        <div style={{ 
          width: '320px', 
          borderRight: '1px solid rgba(255,255,255,0.05)', 
          display: 'flex', 
          flexDirection: 'column',
          background: 'rgba(20, 22, 27, 0.3)'
        }}>
          {/* Sidebar Header & Search */}
          <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Search size={16} color="rgba(240,239,237,0.5)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ 
                  width: '100%', 
                  background: 'rgba(0,0,0,0.2)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '6px', 
                  padding: '0.5rem 0.5rem 0.5rem 2rem',
                  color: '#f0efed',
                  fontSize: '0.85rem'
                }} 
              />
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['All', 'Groups', 'Direct'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: '0.4rem 0',
                    background: activeTab === tab ? 'rgba(92, 199, 137, 0.15)' : 'transparent',
                    color: activeTab === tab ? '#5cc789' : 'rgba(240,239,237,0.6)',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Chat List */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredChats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                style={{ 
                  padding: '1rem', 
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  background: activeChatId === chat.id ? 'rgba(132, 169, 255, 0.08)' : 'transparent',
                  borderLeft: activeChatId === chat.id ? '3px solid #84a9ff' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', position: 'relative' }}>
                  {chat.avatar}
                  {chat.unread > 0 && (
                    <div style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#ff7e93', color: '#fff', fontSize: '0.65rem', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {chat.unread}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0efed', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.4)', flexShrink: 0, marginLeft: '0.5rem' }}>{chat.time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: chat.unread > 0 ? '#fff' : 'rgba(240,239,237,0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: chat.unread > 0 ? 500 : 400 }}>
                      {chat.lastMessage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {filteredChats.length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(240,239,237,0.4)', fontSize: '0.85rem' }}>
                No chats found.
              </div>
            )}
          </div>
        </div>

        {/* Right Area - Chat Window */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          {activeChat ? (
            <>
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(20, 22, 27, 0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    {activeChat.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', color: '#f0efed' }}>{activeChat.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)', marginTop: '0.2rem' }}>
                      {activeChat.type === 'Group' ? 'Group Chat' : activeChat.role}
                    </div>
                  </div>
                </div>
                <button style={{ background: 'transparent', border: 'none', color: 'rgba(240,239,237,0.6)', cursor: 'pointer' }}>
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Messages Area */}
              <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.length > 0 ? messages.map((msg, idx) => {
                  const showSender = !msg.isMe && (idx === 0 || messages[idx - 1].sender !== msg.sender);
                  
                  return (
                    <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.isMe ? 'flex-end' : 'flex-start' }}>
                      {showSender && <span style={{ fontSize: '0.75rem', color: 'rgba(240,239,237,0.5)', marginBottom: '0.25rem', marginLeft: '0.5rem' }}>{msg.sender}</span>}
                      
                      <div style={{ 
                        display: 'inline-block',
                        background: msg.isMe ? '#84a9ff' : 'rgba(255,255,255,0.05)', 
                        color: msg.isMe ? '#000' : '#f0efed',
                        padding: '0.75rem 1rem',
                        borderRadius: msg.isMe ? '12px 12px 0 12px' : '12px 12px 12px 0',
                        maxWidth: '70%',
                        fontSize: '0.9rem',
                        lineHeight: '1.4'
                      }}>
                        {msg.text}
                      </div>
                      
                      <span style={{ fontSize: '0.7rem', color: 'rgba(240,239,237,0.4)', marginTop: '0.25rem', marginRight: msg.isMe ? '0.5rem' : '0', marginLeft: !msg.isMe ? '0.5rem' : '0' }}>
                        {msg.time}
                      </span>
                    </div>
                  );
                }) : (
                  <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', color: 'rgba(240,239,237,0.4)', fontSize: '0.9rem' }}>
                    This is the start of your conversation history with {activeChat.name}.
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(20, 22, 27, 0.4)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button style={{ background: 'transparent', border: 'none', color: 'rgba(240,239,237,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Attach File">
                  <Paperclip size={20} />
                </button>
                <button style={{ background: 'transparent', border: 'none', color: 'rgba(240,239,237,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Send Image">
                  <ImageIcon size={20} />
                </button>
                
                <input 
                  type="text" 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    background: 'rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    padding: '0.75rem 1.25rem',
                    color: '#f0efed',
                    fontSize: '0.9rem'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && messageInput.trim()) {
                      // handle send logic mock
                      setMessageInput('');
                    }
                  }}
                />
                
                <button 
                  style={{ 
                    background: messageInput.trim() ? '#5cc789' : 'rgba(255,255,255,0.1)', 
                    border: 'none', 
                    color: messageInput.trim() ? '#000' : 'rgba(255,255,255,0.3)', 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: messageInput.trim() ? 'pointer' : 'default',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setMessageInput('')}
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(240,239,237,0.4)', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '3rem' }}>💬</div>
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
