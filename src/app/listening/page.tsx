"use client";

import { useState, useRef, useEffect } from "react";
import { TestHeader } from "@/components/TestHeader";
import { TestFooter } from "@/components/TestFooter";
import { Headphones, Play, Pause, RotateCcw, Volume2, Info, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ListeningPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showTranscript, setShowTranscript] = useState(false);

    const [accent, setAccent] = useState("UK");

    const totalQuestions = 10;

    const accents = [
        { code: "UK", label: "British (London)", flag: "🇬🇧" },
        { code: "AU", label: "Australian (Sydney)", flag: "🇦🇺" },
        { code: "US", label: "American (Chicago)", flag: "🇺🇸" },
    ];

    // Mock Progress Simulation
    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(prev => (prev < 100 ? prev + 0.1 : 100));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-slate-950">
            <TestHeader testName="IELTS Listening | Section 1" durationMinutes={30} />

            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Audio Player Bar */}
                <div className="h-28 bg-slate-900 text-white flex items-center px-12 gap-8 border-b border-white/10">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-accent/20"
                    >
                        {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current ml-1" />}
                    </button>

                    <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            <div className="flex items-center gap-3">
                                <span>Phoebe's Restaurant Booking</span>
                                <div className="flex bg-white/5 rounded-lg p-0.5 ml-2">
                                    {accents.map(acc => (
                                        <button
                                            key={acc.code}
                                            onClick={() => setAccent(acc.code)}
                                            className={`px-2 py-1 rounded-md transition-all ${accent === acc.code ? 'bg-accent text-white shadow-sm' : 'hover:bg-white/5'}`}
                                            title={acc.label}
                                        >
                                            {acc.flag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <span>{Math.floor(progress / 5)}:{(progress % 5).toFixed(0).padStart(2, '0')} / 05:00</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-accent"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400">
                        <Volume2 className="w-5 h-5" />
                        <RotateCcw className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Interactive Form */}
                    <div className="flex-1 overflow-y-auto p-12 bg-white">
                        <div className="max-w-2xl mx-auto">
                            <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl mb-12">
                                <h2 className="text-xl font-black text-primary mb-6">Questions 1-5</h2>
                                <p className="text-sm text-slate-500 mb-8 border-b pb-4 border-slate-200">
                                    Complete the form below. Write <span className="text-accent font-bold">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> for each answer.
                                </p>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="flex items-center gap-4">
                                            <span className="w-6 h-6 flex items-center justify-center bg-primary text-white text-xs font-bold rounded-full">1</span>
                                            <p className="flex-1 text-primary font-medium">Customer Name: </p>
                                            <input
                                                type="text"
                                                placeholder="Type answer..."
                                                className="border-b-2 border-slate-300 focus:border-primary outline-none px-2 py-1 bg-transparent w-48 text-primary font-bold"
                                                onChange={(e) => setAnswers({ ...answers, 1: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="w-6 h-6 flex items-center justify-center bg-primary text-white text-xs font-bold rounded-full">2</span>
                                            <p className="flex-1 text-primary font-medium">Number of Guests: </p>
                                            <input
                                                type="text"
                                                placeholder="Type answer..."
                                                className="border-b-2 border-slate-300 focus:border-primary outline-none px-2 py-1 bg-transparent w-48 text-primary font-bold"
                                                onChange={(e) => setAnswers({ ...answers, 2: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="w-6 h-6 flex items-center justify-center bg-primary text-white text-xs font-bold rounded-full">3</span>
                                            <p className="flex-1 text-primary font-medium">Date of Arrival (May): </p>
                                            <input
                                                type="text"
                                                placeholder="Type answer..."
                                                className="border-b-2 border-slate-300 focus:border-primary outline-none px-2 py-1 bg-transparent w-48 text-primary font-bold"
                                                onChange={(e) => setAnswers({ ...answers, 3: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Transcript / Tips */}
                    <div className="w-[400px] border-l border-slate-200 bg-slate-50 p-8 flex flex-col">
                        <div className="mb-8">
                            <button
                                onClick={() => setShowTranscript(!showTranscript)}
                                className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-primary transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-accent" />
                                    <span className="text-sm font-bold text-primary">View Transcript</span>
                                </div>
                                <motion.div animate={{ rotate: showTranscript ? 180 : 0 }}>
                                    <RotateCcw className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                                </motion.div>
                            </button>
                        </div>

                        <AnimatePresence>
                            {showTranscript && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="flex-1 overflow-y-auto bg-white rounded-3xl p-6 border border-slate-200 text-sm leading-relaxed text-muted-foreground italic h-full"
                                >
                                    <p className="mb-4"><strong>Receptionist:</strong> Good afternoon, Phoebe's Restaurant. How can I help you?</p>
                                    <p className="mb-4"><strong>Customer:</strong> Hi, I'd like to book a table for a group of friends next month.</p>
                                    <p className="mb-4"><strong>Receptionist:</strong> Certainly. What name should it be under?</p>
                                    <p className="mb-4"><strong>Customer:</strong> It's <strong>Sarah Jenkinson</strong>. That's J-E-N-K-I-N-S-O-N.</p>
                                    <p className="mb-4"><strong>Receptionist:</strong> Thank you, Ms. Jenkinson. And for how many people?</p>
                                    <p className="mb-4"><strong>Customer:</strong> There will be <strong>eight</strong> of us in total...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!showTranscript && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <Info className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-primary">Listening Strategy</p>
                                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                                        Listen for spelling! In IELTS Section 1, names are often spelled out. Have your pen ready to write down letters immediately.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <TestFooter
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                onNavigate={setCurrentQuestion}
                answeredQuestions={Object.keys(answers).map(Number)}
            />
        </div>
    );
}
