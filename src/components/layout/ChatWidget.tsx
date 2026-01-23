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

// Simple markdown formatter for chat messages
function formatMessage(text: string) {
    // Split by line breaks
    const lines = text.split('\n');

    return (
        <>
            {lines.map((line, i) => {
                // Handle bullet points (lines starting with * or -)
                if (line.trim().match(/^[*-]\s+/)) {
                    const content = line.trim().substring(2); // Remove "* " or "- "
                    return (
                        <div key={i} className="flex gap-2 mb-1">
                            <span className="text-karu-terracotta font-bold">•</span>
                            <span>{formatInlineMarkdown(content)}</span>
                        </div>
                    );
                }

                // Regular line
                if (line.trim()) {
                    return <div key={i} className="mb-1">{formatInlineMarkdown(line)}</div>;
                }

                // Empty line
                return <div key={i} className="h-2"></div>;
            })}
        </>
    );
}

// Format inline markdown (bold text with **)
function formatInlineMarkdown(text: string) {
    const parts = [];
    let key = 0;

    // Match **bold** patterns
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        // Add bold text
        parts.push(<strong key={key++} className="font-semibold">{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
}

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
                        className="mb-4 w-[350px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E88B6A]/20"
                    >
                        {/* Header */}
                        <div className="bg-[#2D2A26] text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-karu-terracotta/20 rounded-full border border-karu-terracotta/30">
                                    <Sparkles size={18} className="text-karu-terracotta" />
                                </div>
                                <div>
                                    <h3 className="font-display font-semibold text-base tracking-wide">KARU Assistant</h3>
                                    <p className="text-xs text-stone-400 font-light">Always here to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors text-stone-400 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="h-[400px] overflow-y-auto p-4 bg-[#FDF8F3] flex flex-col gap-3">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-karu-terracotta text-white self-end rounded-br-none shadow-md'
                                        : 'bg-white text-stone-800 shadow-sm border border-stone-100 self-start rounded-bl-none'
                                        }`}
                                >
                                    {msg.sender === 'bot' ? formatMessage(msg.text) : msg.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="self-start bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-stone-100">
                                    <div className="flex gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-karu-terracotta/60 rounded-full animate-bounce delay-0"></span>
                                        <span className="w-1.5 h-1.5 bg-karu-terracotta/60 rounded-full animate-bounce delay-150"></span>
                                        <span className="w-1.5 h-1.5 bg-karu-terracotta/60 rounded-full animate-bounce delay-300"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Questions */}
                        {messages.length === 1 && (
                            <div className="px-4 pb-3 bg-[#FDF8F3] flex gap-2 overflow-x-auto no-scrollbar mask-gradient">
                                {SUGGESTED_QUESTIONS.map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSendMessage(q)}
                                        className="whitespace-nowrap px-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs text-stone-600 hover:border-karu-terracotta hover:text-karu-terracotta transition-colors shadow-sm"
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
                                placeholder="Ask about products..."
                                className="flex-1 bg-stone-50 text-stone-800 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20 border border-transparent focus:border-karu-terracotta/30 transition-all placeholder:text-stone-400"
                            />
                            <button
                                onClick={() => handleSendMessage(inputText)}
                                disabled={!inputText.trim()}
                                className="p-2.5 bg-karu-terracotta text-white rounded-full hover:bg-[#B54D30] transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
                            >
                                <Send size={16} />
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
                className="relative text-white p-5 shadow-lg hover:shadow-xl transition-shadow duration-300 z-50"
                style={{
                    background: 'linear-gradient(135deg, #E88B6A 0%, #C75D3C 100%)',
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
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E88B6A] border-2 border-white"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
