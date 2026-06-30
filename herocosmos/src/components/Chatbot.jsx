'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your HeroCosmos assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Where is my order?",
    "Return Policy",
    "Shipping Rates",
    "Talk to an agent"
  ];

  const botResponses = {
    "Where is my order?": "To track your order, please visit the 'My Orders' section in your profile or check the tracking link sent to your email.",
    "Return Policy": "We offer a 7-day hassle-free return policy. You can initiate a return from the Returns Portal.",
    "Shipping Rates": "We offer free shipping on all orders above ₹1999! Standard shipping is ₹99.",
    "Talk to an agent": "Please email us at support@herocosmos.in and our human heroes will get back to you within 24 hours.",
    "default": "I'm still learning! Could you try asking one of the quick questions below, or contact support@herocosmos.in?"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now(), text, isBot: false };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText("");

    // Simulate bot thinking and replying
    setTimeout(() => {
      const responseText = botResponses[text] || botResponses["default"];
      const newBotMsg = { id: Date.now() + 1, text: responseText, isBot: true };
      setMessages(prev => [...prev, newBotMsg]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(inputText);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg shadow-purple-500/30 z-50 transition-transform hover:scale-105 ${isOpen ? 'hidden' : 'flex'} items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white`}
      >
        <FiMessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex justify-between items-center text-white">
              <div>
                <h3 className="font-bold">Hero Support</h3>
                <p className="text-xs text-purple-200">Online</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1 rounded-md transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-gray-800 text-gray-200 rounded-tl-sm' : 'bg-purple-600 text-white rounded-tr-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="bg-gray-800 hover:bg-gray-700 text-purple-300 text-xs px-3 py-1.5 rounded-full border border-purple-500/30 transition-colors shrink-0"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-800 bg-gray-900 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-700"
              />
              <button
                onClick={() => handleSend(inputText)}
                disabled={!inputText.trim()}
                className="bg-purple-600 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-500 transition-colors"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
