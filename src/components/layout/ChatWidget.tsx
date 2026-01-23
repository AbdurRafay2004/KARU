import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAction } from 'convex/react';
import { api } from '../../../convex/_generated/api';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
    "Show me handmade pottery 🏺",
    "What jewelry is available? 💍",
    "Find me items under 50 taka",
    "Tell me about your artisans 🎨",
];

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi there! 👋 I'm your KARU assistant powered by AI. How can I help you today?",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const geminiChat = useAction(api.gemini.chat);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputText('');
        setIsTyping(true);

        try {
            const response = await geminiChat({ message: text });
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Gemini API error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm having trouble connecting right now. Please try again or contact support@karu.com for help.",
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage(inputText);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[350px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200"
                    >
                        {/* Header */}
                        <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-stone-800 rounded-full">
                                    <Sparkles size={18} className="text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm">KARU Assistant</h3>
                                    <p className="text-xs text-stone-400">Always here to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-stone-800 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="h-[400px] overflow-y-auto p-4 bg-stone-50 flex flex-col gap-3">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                        ? 'bg-stone-900 text-white self-end rounded-br-none'
                                        : 'bg-white text-stone-800 shadow-sm border border-stone-100 self-start rounded-bl-none'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="self-start bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-stone-100">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-0"></span>
                                        <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-150"></span>
                                        <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-300"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Questions */}
                        {messages.length === 1 && (
                            <div className="px-4 pb-2 bg-stone-50 flex gap-2 overflow-x-auto no-scrollbar mask-gradient">
                                {SUGGESTED_QUESTIONS.map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSendMessage(q)}
                                        className="whitespace-nowrap px-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs text-stone-600 hover:bg-stone-100 hover:border-stone-300 transition-colors shadow-sm"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}


                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-stone-100 flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask about products, orders, shipping..."
                                className="flex-1 bg-stone-100 text-stone-800 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-200"
                            />
                            <button
                                onClick={() => handleSendMessage(inputText)}
                                disabled={!inputText.trim()}
                                className="p-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                animate={{
                    y: [0, -5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative text-white p-5 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{
                    background: 'linear-gradient(to bottom right, #E88B6A 0%, #C75D3C 100%)',
                    borderRadius: '65% 35% 45% 55% / 55% 45% 55% 45%',
                    width: '70px',
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <MessageCircle size={24} />
                )}
                {!isOpen && (
                    <span className="absolute right-0 top-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
