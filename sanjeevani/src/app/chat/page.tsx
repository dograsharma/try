'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Send, Bot, User, Loader2, Heart, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  flagged?: boolean;
  category?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Sanjeevani, your compassionate AI companion. I'm here to listen and support you through whatever you're experiencing. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversationHistory
        }),
      });

      const data = await response.json();

      // Add typing delay for more natural feel
      setTimeout(() => {
        setIsTyping(false);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response || "I'm here to listen. Please tell me more about how you're feeling.",
          sender: 'bot',
          timestamp: new Date(),
          flagged: data.flagged,
          category: data.category
        };

        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds

    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      setIsLoading(false);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now, but I want you to know that your feelings are valid and you're not alone. If you need immediate support, please reach out to: 9152987821 (iCall India) or visit snehi.org.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Header */}
      <div className="pt-16 bg-gradient-to-r from-sage-50 to-mint-50 border-b border-sage-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-sage-500 to-mint-500 rounded-xl text-white shadow-soft">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-semibold text-sage-900">
                Chat with Sanjeevani
              </h1>
              <p className="text-sage-600 text-sm">
                Your compassionate AI companion for mental wellness
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-sage-100 text-sage-600' 
                        : 'bg-gradient-to-r from-sage-500 to-mint-500 text-white'
                    }`}>
                      {message.sender === 'user' ? 
                        <User className="w-4 h-4" /> : 
                        <Bot className="w-4 h-4" />
                      }
                    </div>

                    {/* Message Content */}
                    <div className={`rounded-2xl px-4 py-3 shadow-soft ${
                      message.sender === 'user'
                        ? 'bg-sage-600 text-white'
                        : message.flagged && message.category === 'crisis'
                          ? 'bg-red-50 border-2 border-red-200 text-red-800'
                          : 'bg-white border border-sage-200 text-sage-800'
                    }`}>
                      {message.flagged && message.category === 'crisis' && (
                        <div className="flex items-center space-x-2 mb-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Crisis Support</span>
                        </div>
                      )}
                      
                      <div className="whitespace-pre-wrap leading-relaxed text-sm">
                        {message.content}
                      </div>
                      
                      <div className={`text-xs mt-2 ${
                        message.sender === 'user' 
                          ? 'text-sage-200' 
                          : 'text-sage-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-start space-x-3"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-sage-500 to-mint-500 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-sage-200 rounded-2xl px-4 py-3 shadow-soft">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sage-500 text-sm ml-2">Sanjeevani is typing...</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-sage-200 pt-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  disabled={isLoading}
                  className="w-full p-4 pr-12 border border-sage-200 rounded-2xl focus:ring-2 focus:ring-sage-300 focus:border-transparent resize-none bg-white/70 backdrop-blur-sm disabled:opacity-50 transition-all duration-200"
                  rows={1}
                  style={{ minHeight: '52px', maxHeight: '120px' }}
                />
                
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="absolute right-2 bottom-2 p-2 bg-sage-600 text-white rounded-xl hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-soft"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-3 text-xs text-sage-500">
              <Heart className="w-3 h-3" />
              <span>Your conversations are private and anonymous</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}