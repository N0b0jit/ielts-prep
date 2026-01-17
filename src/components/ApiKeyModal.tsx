
"use client";

import { useState, useEffect } from "react";
import { Key, CheckCircle2, XCircle, Loader2, Info, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { checkApiKey } from "@/lib/gemini";

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
    const [apiKey, setApiKey] = useState("");
    const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("gemini_api_key");
        if (stored) {
            setApiKey(stored);
            setStatus('valid');
        }
    }, []);

    const handleSave = async () => {
        if (!apiKey.trim()) return;
        setStatus('checking');
        setErrorMessage("");

        const result = await checkApiKey(apiKey.trim()); // Trim whitespace

        if (result.valid) {
            localStorage.setItem("gemini_api_key", apiKey.trim());
            setStatus('valid');
            setTimeout(() => onClose(), 1500);
        } else {
            setStatus('invalid');
            setErrorMessage(result.error || "Invalid API Key. Please check and try again.");
        }
    };

    const handleClear = () => {
        localStorage.removeItem("gemini_api_key");
        setApiKey("");
        setStatus('idle');
        setErrorMessage("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Key className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-primary dark:text-white">Gemini API Settings</h2>
                                <p className="text-xs text-muted-foreground">Unlock the full power of Antigravity AI</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30">
                                <div className="flex gap-3">
                                    <Info className="w-5 h-5 text-blue-500 shrink-0" />
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-blue-800 dark:text-blue-200 leading-relaxed">
                                            This platform is 100% free. To use the AI features (Grading, Speaking analysis), you need your own free Google Gemini API key.
                                        </p>
                                        <a
                                            href="https://aistudio.google.com/app/apikey"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Get Free Key Here <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => {
                                        setApiKey(e.target.value);
                                        if (status === 'invalid') setStatus('idle');
                                    }}
                                    placeholder="Paste your API key here..."
                                    className={`w-full p-4 pr-12 text-sm bg-slate-50 dark:bg-slate-950 border-2 rounded-xl outline-none transition-all ${status === 'invalid'
                                        ? 'border-red-500 focus:border-red-500'
                                        : status === 'valid'
                                            ? 'border-green-500 focus:border-green-500'
                                            : 'border-slate-200 dark:border-slate-800 focus:border-primary'
                                        }`}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    {status === 'checking' && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                                    {status === 'valid' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                    {status === 'invalid' && <XCircle className="w-5 h-5 text-red-500" />}
                                </div>
                            </div>

                            {status === 'invalid' && (
                                <p className="text-xs text-red-500 font-bold ml-1">{errorMessage}</p>
                            )}

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleSave}
                                    disabled={status === 'checking' || !apiKey}
                                    className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === 'checking' ? 'Validating...' : status === 'valid' ? 'Saved & Ready' : 'Save API Key'}
                                </button>
                                {status === 'valid' && (
                                    <button
                                        onClick={handleClear}
                                        className="px-4 py-3 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-xl font-bold text-sm hover:bg-red-100 transition-all"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
