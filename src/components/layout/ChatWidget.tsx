import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
    "Where is my order?",
    "What is the return policy?",
    "Do you ship internationally?",
    "How can I pay?",
];

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi there! 👋 I'm your KARU assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const getBotResponse = (text: string): string => {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('ship') || lowerText.includes('delivery') || lowerText.includes('track')) {
            return "We ship all over Bangladesh! Delivery usually takes 3-5 business days. You can track your order in the 'Orders' section of your profile.";
        }
        if (lowerText.includes('return') || lowerText.includes('refund') || lowerText.includes('exchange')) {
            return "We accept returns within 7 days of delivery if the item is damaged or incorrect. Please contact support@karu.com for assistance.";
        }
        if (lowerText.includes('pay') || lowerText.includes('bkash') || lowerText.includes('nagad') || lowerText.includes('cash')) {
            return "We accept Cash on Delivery (COD), bKash, and Nagad. Secure online payments are coming soon!";
        }
        if (lowerText.includes('order') || lowerText.includes('status')) {
            return "You can check your order status by logging in and going to 'My Orders'. Let me know if you need help navigating there!";
        }
        if (lowerText.includes('contact') || lowerText.includes('support') || lowerText.includes('help')) {
            return "You can reach our human support team at support@karu.com or call us at +880 1XXX-XXXXXX (10am - 6pm).";
        }
        if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
            return "Hello! 😊 How can I assist you with your handicraft shopping today?";
        }
        return "I'm not sure about that, but I'm learning! You can try asking about shipping, returns, or payments, or contact our support team.";
    };

    const handleSendMessage = (text: string) => {
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

        // Simulate AI delay
        setTimeout(() => {
            const botResponse = getBotResponse(text);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
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
                                placeholder="Ask about orders, shipping..."
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

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-stone-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative group"
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <MessageCircle size={24} />
                )}
                {!isOpen && (
                    <span className="absolute right-0 top-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                )}
            </button>
        </div>
    );
}
