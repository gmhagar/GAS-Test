
import React, { useState, useRef, useEffect } from 'react';
import { COVERAGE_DATA } from './constants';
import { CoverageCategory, ChatMessage } from './types';
import Timeline from './components/Timeline';
import CoverageCard from './components/CoverageCard';
import { gemini } from './services/geminiService';
import { 
  ShieldCheck, 
  HelpCircle, 
  Settings, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  FileText,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'explorer' | 'advisor'>('overview');
  const [filter, setFilter] = useState<CoverageCategory | 'all'>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your Ontario Auto Insurance Advisor. Ask me anything about the upcoming Accident Benefit changes or what different coverages mean.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: new Date() }]);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await gemini.askQuestion(userMsg, history);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
  };

  const filteredCoverages = COVERAGE_DATA.filter(c => filter === 'all' || c.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-none">Ontario Auto Insurance</h1>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-1">AB Coverage Guide</p>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`text-sm font-semibold transition-colors ${activeTab === 'overview' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                The Why & When
              </button>
              <button 
                onClick={() => setActiveTab('explorer')}
                className={`text-sm font-semibold transition-colors ${activeTab === 'explorer' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Coverage Explorer
              </button>
              <button 
                onClick={() => setActiveTab('advisor')}
                className={`text-sm font-semibold transition-colors ${activeTab === 'advisor' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                AI Advisor
              </button>
            </nav>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button 
              onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
            >
              The Why & When
            </button>
            <button 
              onClick={() => { setActiveTab('explorer'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold ${activeTab === 'explorer' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
            >
              Coverage Explorer
            </button>
            <button 
              onClick={() => { setActiveTab('advisor'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold ${activeTab === 'advisor' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
            >
              AI Advisor
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Context Hero */}
            <section className="bg-indigo-700 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Choice is coming to Ontario Auto Insurance.</h2>
                <p className="text-indigo-100 text-lg leading-relaxed mb-8">
                  The Ontario government is modernizing auto insurance to help lower premiums. The biggest change? More coverages that were previously "Mandatory" will become "Optional," giving you more control over what you pay for.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveTab('explorer')}
                    className="bg-white text-indigo-700 px-6 py-3 rounded-full font-bold flex items-center shadow-lg hover:bg-indigo-50 transition-colors"
                  >
                    See Coverage Changes <ArrowRight size={18} className="ml-2" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('advisor')}
                    className="bg-indigo-600 border border-indigo-400 text-white px-6 py-3 rounded-full font-bold flex items-center hover:bg-indigo-500 transition-colors"
                  >
                    Ask a Question <HelpCircle size={18} className="ml-2" />
                  </button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
                <ShieldCheck size={400} />
              </div>
            </section>

            {/* Why the changes? */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                  <Settings size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Modernization</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Ontario's insurance system hasn't seen major structural reform in years. These changes aim to simplify the "Standard" policy.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Affordability</h3>
                <p className="text-slate-500 text-sm leading-relaxed">By allowing drivers to opt-out of certain benefits they may already have elsewhere, premiums can be reduced.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Better Choice</h3>
                <p className="text-slate-500 text-sm leading-relaxed">It shifts the default from "One Size Fits All" to a modular approach where you only pay for the protection you need.</p>
              </div>
            </section>

            {/* Timeline */}
            <section>
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-slate-900">Implementation Timeline</h3>
                <p className="text-slate-500">When will these changes actually hit your policy?</p>
              </div>
              <Timeline />
            </section>
          </div>
        )}

        {activeTab === 'explorer' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Coverage Explorer</h2>
                <p className="text-slate-500">Learn about what's mandatory and what you can customize.</p>
              </div>
              
              {/* Category Filter */}
              <div className="inline-flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter('mandatory')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${filter === 'mandatory' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Mandatory
                </button>
                <button 
                  onClick={() => setFilter('optional')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${filter === 'optional' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  Optional
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredCoverages.map(coverage => (
                <CoverageCard key={coverage.id} coverage={coverage} />
              ))}
            </div>

            <div className="mt-8 p-6 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 text-center">
              <h4 className="font-bold text-slate-700 mb-2">Confused about limits?</h4>
              <p className="text-slate-500 text-sm mb-4">Our AI advisor can explain specific scenarios for you.</p>
              <button 
                onClick={() => setActiveTab('advisor')}
                className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
              >
                Launch Advisor <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'advisor' && (
          <div className="flex flex-col h-[calc(100vh-250px)] animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white rounded-t-3xl border border-slate-200 p-4 border-b-0 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Ontario Insurance Advisor</h3>
                  <p className="text-xs text-green-600 font-medium flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                    Online & Ready
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setMessages([{ role: 'model', text: "Chat history cleared. How can I help you today?", timestamp: new Date() }])}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold"
              >
                Clear History
              </button>
            </div>

            <div className="flex-grow bg-white border-x border-slate-200 overflow-y-auto p-4 custom-scrollbar space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}>
                    {msg.text}
                    <div className={`text-[10px] mt-1 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="bg-slate-50 p-4 rounded-b-3xl border border-slate-200 border-t-0 flex items-center space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about caregiver benefits, income replacement, etc..."
                className="flex-grow bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs max-w-xl mx-auto leading-relaxed">
            DISCLAIMER: This application provides general information about Ontario insurance changes and should not be taken as legal or financial advice. Coverage details and limits are subject to official FSRA regulations. Always consult with a licensed insurance professional for specific policy details.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="https://www.fsrao.ca/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-600 text-xs font-semibold transition-colors">FSRA Website</a>
            <a href="https://www.ontario.ca/page/car-insurance" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-600 text-xs font-semibold transition-colors">Ontario.ca Insurance Guide</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
