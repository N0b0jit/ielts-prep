"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Brain, Sparkles, ChevronRight, Trophy, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VOCAB_DATA = [
    { word: "Beautiful", level: "Band 6", alternatives: ["Exquisite", "Splendid", "Picturesque", "Breathtaking"] },
    { word: "Important", level: "Band 6", alternatives: ["Crucial", "Vital", "Pivotal", "Indispensable"] },
    { word: "Famous", level: "Band 6", alternatives: ["Renowned", "Illustrious", "Eminent", "Distinguished"] },
    { word: "Difficult", level: "Band 6", alternatives: ["Arduous", "Formidable", "Challenging", "Taxing"] },
];

export default function VocabularyGrace() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    const handleChoice = (choice: string) => {
        if (selected) return;
        setSelected(choice);
        if (VOCAB_DATA[currentIndex].alternatives.includes(choice)) {
            setScore(prev => prev + 25);
            setFeedback("Band 9.0 Match!");
        } else {
            setFeedback("Try again?");
        }
    };

    const nextWord = () => {
        if (currentIndex < VOCAB_DATA.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelected(null);
            setFeedback(null);
        } else {
            setShowResults(true);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <main className="flex-1 max-w-4xl mx-auto w-full p-8 mt-16">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
                    >
                        <Brain className="w-4 h-4" />
                        Lexical Mastery Engine
                    </motion.div>
                    <h1 className="text-5xl font-black text-[#013950] dark:text-white mb-4 tracking-tighter">
                        Synonym <span className="text-purple-600">Sprints</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Upgrade your vocabulary from Band 6.0 to Elite Academic status.</p>
                </div>

                {!showResults ? (
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 shadow-xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Sparkles className="w-32 h-32" />
                            </div>

                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Target Word ({VOCAB_DATA[currentIndex].level})</p>
                            <h2 className="text-6xl font-black text-[#013950] dark:text-white mb-8">{VOCAB_DATA[currentIndex].word}</h2>

                            <div className="grid grid-cols-2 gap-4">
                                {VOCAB_DATA[currentIndex].alternatives.map((alt) => (
                                    <button
                                        key={alt}
                                        onClick={() => handleChoice(alt)}
                                        className={`p-6 rounded-2xl border-2 font-black uppercase text-xs tracking-widest transition-all ${selected === alt
                                                ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/20'
                                                : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-600'
                                            }`}
                                    >
                                        {alt}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence>
                                {feedback && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 text-sm font-black text-purple-600 uppercase tracking-widest"
                                    >
                                        {feedback}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {selected && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={nextWord}
                                className="w-full bg-[#013950] text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3"
                            >
                                Next Challenge
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        )}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#013950] text-white rounded-[3rem] p-16 text-center shadow-2xl"
                    >
                        <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-8 animate-bounce" />
                        <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Session Complete!</h2>
                        <div className="text-7xl font-black text-accent mb-8 italic">{score}%</div>
                        <p className="text-blue-100/60 mb-12 uppercase font-bold tracking-widest">You have unlocked: Lexical Sensei</p>

                        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                            <button onClick={() => window.location.reload()} className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                                <RotateCcw className="w-4 h-4" /> Try Again
                            </button>
                            <button onClick={() => window.location.href = '/'} className="bg-accent p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                                Dashboard
                            </button>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
