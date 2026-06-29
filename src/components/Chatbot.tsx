import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from 'lucide-react';
import { ChatMessage } from '../types';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      content: "Hello! Bonjour! I'm Auby, your Construction Aubywan INC digital assistant. 🏗️\n\nI can help you explore our services, estimate project timelines, or schedule a free estimate for your project in Saint-Eustache or the North Shore. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat window
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessageText = input.trim();
    setInput('');

    // Add user message to state
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build request body matching server expectation
      const requestMessages = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: requestMessages })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from chat API');
      }

      const data = await response.json();

      const modelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "I apologize, but I am having trouble reaching our server. Please call us directly at 438-763-4122 or try again shortly!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Icon Launcher */}
      {!isOpen && (
        <button
          id="chatbot-launcher-btn"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-brand-orange text-white rounded-none shadow-[4px_4px_0px_0px_#020617] hover:bg-slate-950 border-2 border-slate-950 active:translate-y-1 transition-all duration-200 relative group cursor-pointer"
          title="Chat with Auby AI"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-16 bg-slate-950 border-2 border-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md uppercase tracking-wider">
            Chat with Auby AI 🏗️
          </span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-slate-950 border border-brand-orange rounded-none animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-950 border-2 border-brand-orange rounded-none flex items-center justify-center text-[10px] font-black text-white font-mono">1</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          id="chatbot-window"
          className="w-80 sm:w-96 h-[500px] bg-white rounded-none shadow-[6px_6px_0px_0px_#ea580c] border-2 border-slate-950 flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-10"
        >
          {/* Header */}
          <div className="bg-slate-950 p-4 flex items-center justify-between border-b-2 border-slate-900 relative">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-orange/10 rounded-none border-2 border-brand-orange flex items-center justify-center">
                <Bot className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm leading-none flex items-center gap-1.5 uppercase tracking-wide">
                  Auby AI
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-none animate-pulse" title="Online"></span>
                </h4>
                <span className="text-slate-400 text-xs font-mono">Construction Aubywan Advisor</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-brand-orange hover:bg-slate-900 p-1 rounded-none transition-colors cursor-pointer border border-transparent hover:border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              const isBot = msg.role === 'model';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start space-x-2`}
                >
                  {isBot && (
                    <div className="w-7 h-7 bg-slate-950 border-2 border-brand-orange rounded-none flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-brand-orange" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-none p-3 text-xs shadow-sm ${
                      isBot
                        ? 'bg-white text-slate-950 border-2 border-slate-200'
                        : 'bg-slate-950 text-white border-2 border-slate-950'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed font-normal">{msg.content}</p>
                    <span className="block text-[9px] text-slate-400 mt-1 text-right font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 bg-brand-orange rounded-none border border-slate-950 flex items-center justify-center shrink-0 mt-0.5 text-white">
                      <User className="w-3.5 h-3.5 text-slate-950" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start items-center space-x-2">
                <div className="w-7 h-7 bg-slate-950 border-2 border-brand-orange rounded-none flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-brand-orange" />
                </div>
                <div className="bg-white rounded-none p-3 border-2 border-slate-200 flex space-x-1.5 items-center shadow-sm">
                  <span className="w-2.5 h-2.5 bg-slate-950 rounded-none animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2.5 h-2.5 bg-slate-950 rounded-none animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2.5 h-2.5 bg-slate-950 rounded-none animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply tags */}
          <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button
              onClick={() => { setInput('I want a free estimate'); }}
              className="text-xs bg-white text-slate-950 hover:text-white hover:bg-brand-orange px-2.5 py-1.5 rounded-none border-2 border-slate-200 hover:border-brand-orange transition-colors font-bold uppercase tracking-wide cursor-pointer"
            >
              Free Estimate 📝
            </button>
            <button
              onClick={() => { setInput('What services do you offer?'); }}
              className="text-xs bg-white text-slate-950 hover:text-white hover:bg-brand-orange px-2.5 py-1.5 rounded-none border-2 border-slate-200 hover:border-brand-orange transition-colors font-bold uppercase tracking-wide cursor-pointer"
            >
              Our Services 🔨
            </button>
            <button
              onClick={() => { setInput('Are you licensed in Quebec?'); }}
              className="text-xs bg-white text-slate-950 hover:text-white hover:bg-brand-orange px-2.5 py-1.5 rounded-none border-2 border-slate-200 hover:border-brand-orange transition-colors font-bold uppercase tracking-wide cursor-pointer"
            >
              RBQ License 🛡️
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message... (English or French)"
              className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-slate-950 focus:bg-white transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`w-10 h-10 rounded-none border-2 flex items-center justify-center transition-all ${
                input.trim() && !isLoading
                  ? 'bg-slate-950 text-white border-slate-950 hover:bg-brand-orange hover:text-white hover:border-brand-orange cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
