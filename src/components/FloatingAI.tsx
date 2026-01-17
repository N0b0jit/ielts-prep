"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Sparkles, Bot, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chatWithAI } from "@/lib/gemini";

export function FloatingAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([
        { role: "bot", content: "Hi! I'm your AI Invigilator. How can I help you with your IELTS prep today?" }
    ]);

    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;

        const apiKey = localStorage.getItem("gemini_api_key");
        if (!apiKey) {
            setChat(prev => [...prev, { role: "user", content: message }, { role: "bot", content: "Please set your Gemini API key in the settings (gear icon) to chat with me!" }]);
            setMessage("");
            return;
        }

        const newHistory = [...chat, { role: "user", content: message }];
        setChat(newHistory);
        setMessage("");
        setIsTyping(true);

        try {
            const response = await chatWithAI(apiKey, newHistory, message);
            setChat([...newHistory, { role: "bot", content: response }]);
        } catch (error) {
            setChat([...newHistory, { role: "bot", content: "Sorry, I encountered an error. Please check your connection or API key." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${isMinimized ? 'h-16 w-64' : 'h-[500px] w-[350px]'}`}
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest">AI Invigilator</p>
                                    <p className="text-[10px] opacity-70">Always Online</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded">
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Chat Area */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
                                    {chat.map((m, i) => (
                                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'}`}>
                                                {m.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 flex gap-1">
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="Ask anything..."
                                            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white"
                                        />
                                        <button
                                            onClick={handleSend}
                                            className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-1 mt-3 opacity-40 justify-center">
                                        <Sparkles className="w-3 h-3" />
                                        <span className="text-[9px] font-bold uppercase tracking-tighter">Powered by Gemini 1.5 Flash</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all border-4 border-white dark:border-slate-800"
                >
                    <MessageSquare className="w-6 h-6" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white dark:border-slate-800"
                    />
                </motion.button>
            )}
        </div>
    );
}
