import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatAssistantProps {
  darkMode: boolean;
}

export default function ChatAssistant({ darkMode }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AquaOpt AI assistant. I can help you understand the system, interpret data, optimize operations, or answer questions about wastewater management. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    'What are the current energy savings?',
    'Explain the multi-agent system',
    'How do I optimize for storm events?',
    'Show me pump efficiency tips',
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes('energy') || q.includes('savings')) {
      return 'Based on current operations, AquaOpt AI is achieving **34.5% energy savings** compared to baseline operations. This translates to approximately **€1,270 per day** in cost reduction. The system optimizes by shifting pumping to low-price periods (22:00-06:00) while maintaining all operational constraints.';
    }
    
    if (q.includes('agent') || q.includes('multi-agent')) {
      return 'AquaOpt AI uses 4 specialized agents:\n\n**Forecast Agent**: Predicts inflows (F1), rain events, and energy prices using LSTM neural networks.\n\n**Planner Agent**: Optimizes pump schedules using MILP to minimize costs while satisfying constraints.\n\n**Executor Agent**: Controls pumps in real-time using physics-based Digital Twin simulation.\n\n**Supervisor Agent**: Coordinates all agents and monitors system compliance.\n\nThey work together seamlessly via the MCP2 protocol!';
    }
    
    if (q.includes('storm') || q.includes('rain')) {
      return 'During storm events, the system:\n\n1. **Forecast Agent** detects incoming rain (85% accuracy 14-16h ahead)\n2. **Planner** prepares surge capacity by lowering tunnel levels\n3. **Executor** adjusts outflow to handle peak inflows (up to 16,000 m³/h)\n4. **Supervisor** monitors constraints and can trigger emergency protocols\n\nThe tunnel can store up to 225,850 m³, providing significant buffer capacity.';
    }
    
    if (q.includes('pump') || q.includes('efficiency')) {
      return 'Pump efficiency tips:\n\n• **Operate at optimal frequency**: 48.5-50 Hz for peak efficiency (84-86%)\n• **Avoid frequent starts**: Minimum 2-hour cycles reduce wear\n• **Use variable frequency drives**: Adjust to actual demand\n• **Monitor performance curves**: Check H vs Q, η vs H regularly\n• **Leverage off-peak pricing**: Run during 22:00-06:00 when possible\n\nCurrent system efficiency: 99.2% constraint compliance!';
    }
    
    if (q.includes('opc ua') || q.includes('integration')) {
      return 'OPC UA integration provides:\n\n✅ **Real-time data access**: L1, V, F1, F2, pump status\n✅ **Aggregates**: Min/Max/Avg for analysis\n✅ **85% applicability** across HSY infrastructure\n✅ **Standard protocol**: Compatible with existing SCADA\n✅ **Secure communication**: Industry-standard encryption\n\nConnect via: `opc.tcp://localhost:4840`';
    }
    
    if (q.includes('how') || q.includes('help') || q.includes('tutorial')) {
      return 'I can help you with:\n\n📊 **Dashboard**: View real-time metrics, pump status, alerts\n🔮 **Forecast**: See predicted inflows and prices\n📅 **Planner**: Review optimized schedules\n▶️ **Executor**: Monitor Digital Twin simulation\n🎯 **Supervisor**: Check agent coordination\n📈 **Reports**: Analyze energy savings\n⚙️ **Settings**: Configure OPC UA connections\n\nWhat would you like to explore?';
    }

    if (q.includes('cost') || q.includes('price')) {
      return 'Current energy pricing strategy:\n\n🟢 **Low prices** (22:00-06:00): €45-65/MWh - Maximize pumping\n🟡 **Normal prices** (06:00-08:00, 17:00-22:00): €65-85/MWh - Moderate operation\n🔴 **Peak prices** (08:00-17:00): €85-110/MWh - Minimize pumping\n\nThe system forecasts prices with 15-minute granularity and adjusts schedules automatically to capture savings.';
    }
    
    return `Great question! I can provide detailed insights about:\n\n• Energy optimization and cost savings\n• Multi-agent AI coordination\n• Storm surge handling and forecasting\n• Pump performance and efficiency\n• OPC UA integration and connectivity\n• System constraints and compliance\n• Digital Twin simulation\n\nCould you provide more details about what you'd like to know?`;
  };

  const handleSuggestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
          darkMode
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        style={{ bottom: window.innerWidth < 768 ? '5rem' : '1.5rem' }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
        />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed right-6 z-40 w-96 max-w-[calc(100vw-3rem)] shadow-2xl rounded-2xl overflow-hidden ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
            style={{
              bottom: window.innerWidth < 768 ? '6.5rem' : '5.5rem',
              height: 'calc(100vh - 8rem)',
              maxHeight: '600px',
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white">AI Assistant</h3>
                <p className="text-blue-100 text-sm">Always here to help</p>
              </div>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100% - 180px)' }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-blue-600'
                        : darkMode
                        ? 'bg-gray-700'
                        : 'bg-gray-100'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-2xl p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : darkMode
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Bot className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div className={`rounded-2xl p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`}
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`}
                      />
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className={`p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(q)}
                      className={`px-3 py-1 rounded-full text-xs ${
                        darkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    input.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
