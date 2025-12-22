"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Mic, Square, Play, Loader2, Sparkles, Volume2, Info, CheckCircle2, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpeakingCoach() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<any>(null);
    const [mode, setMode] = useState<'part1' | 'part2' | 'mirror'>('part1');
    const [mirrorSample, setMirrorSample] = useState("Technology has fundamentally altered the way we communicate in the 21st century.");
    const [mirrorScore, setMirrorScore] = useState<number | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [planningTime, setPlanningTime] = useState(60);
    const [isPlanning, setIsPlanning] = useState(false);
    const [scratchpad, setScratchpad] = useState("");

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);
    const timerInterval = useRef<NodeJS.Timeout | null>(null);

    const questions = {
        part1: [
            "Let's talk about where you live. Do you live in a house or an apartment?",
            "What do you like most about your neighborhood?",
            "Is it a good place for young people to live?"
        ],
        part2: {
            topic: "Describe a useful object in your home that you couldn't live without.",
            bullets: [
                "What it is",
                "How long you have had it",
                "What you use it for",
                "And explain why you couldn't live without it."
            ]
        }
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);
        audioChunks.current = [];

        mediaRecorder.current.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
        };

        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
        };

        mediaRecorder.current.start();
        setIsRecording(true);
        setRecordingTime(0);
        timerInterval.current = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
        }, 1000);
    };

    const stopRecording = () => {
        mediaRecorder.current?.stop();
        setIsRecording(false);
        if (timerInterval.current) clearInterval(timerInterval.current);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const startPlanning = () => {
        setIsPlanning(true);
        setPlanningTime(60);
        const planInterval = setInterval(() => {
            setPlanningTime(prev => {
                if (prev <= 1) {
                    clearInterval(planInterval);
                    setIsPlanning(false);
                    startRecording();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const analyzeSpeaking = async () => {
        setIsAnalyzing(true);
        // Note: In a real app, we'd upload the blob to a storage bucket OR send base64 to Gemini
        // For this elite demo, we'll simulate the multimodal processing
        setTimeout(() => {
            setAnalysis({
                overall: 7.5,
                fluency: 8.0,
                lexical: 7.0,
                grammar: 7.5,
                pronunciation: 7.5,
                fillers: ["um", "uh", "you know"],
                hesitationCount: 4,
                transcript: [
                    { word: "Well,", score: "green" },
                    { word: "I", score: "green" },
                    { word: "live", score: "green" },
                    { word: "in", score: "green" },
                    { word: "a", score: "green" },
                    { word: "relatively", score: "yellow" },
                    { word: "spacious", score: "red" },
                    { word: "apartment", score: "green" },
                    { word: "in", score: "green" },
                    { word: "the", score: "green" },
                    { word: "city", score: "green" },
                    { word: "center.", score: "green" },
                ],
                feedback: "Your fluency is excellent with minimal hesitation. However, you could use more idiomatic expressions to boost your lexical resource. For example, instead of 'I like it', try 'It's right up my alley'.",
            });
            setIsAnalyzing(false);
        }, 3000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto w-full p-8">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Live Experience</span>
                        <h1 className="text-3xl font-black text-primary flex items-center gap-3">
                            <Mic className="w-8 h-8 text-accent" />
                            AI Speaking Coach
                        </h1>
                    </div>
                    <p className="text-muted-foreground">Practice IELTS Speaking Part 1 with real-time AI evaluation.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Interaction */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                                    <button onClick={() => setMode('part1')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'part1' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400'}`}>Part 1</button>
                                    <button onClick={() => setMode('part2')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'part2' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400'}`}>Part 2</button>
                                    <button onClick={() => setMode('mirror')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'mirror' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400'}`}>Mirror Match</button>
                                </div>
                                {mode === 'part2' && !isRecording && !isPlanning && (
                                    <button onClick={startPlanning} className="bg-accent text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse">Start 1-Min Prep</button>
                                )}
                            </div>

                            <AnimatePresence mode="wait">
                                {mode === 'part1' ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Interview Questions</p>
                                        <h2 className="text-xl font-bold text-primary dark:text-blue-400 leading-relaxed mb-8">
                                            "What are your thoughts on the impact of social media on modern communication?"
                                        </h2>
                                    </motion.div>
                                ) : mode === 'part2' ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 mb-8">
                                        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-primary/10">
                                            <p className="text-[10px] font-black text-primary dark:text-blue-400 uppercase mb-2">The Cue Card</p>
                                            <p className="font-bold text-slate-800 dark:text-slate-200 mb-4">{questions.part2.topic}</p>
                                            <ul className="space-y-2">
                                                {questions.part2.bullets.map((b, i) => (
                                                    <li key={i} className="text-xs text-slate-500 flex items-center gap-2">
                                                        <div className="w-1 h-1 bg-accent rounded-full" /> {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {isPlanning && (
                                            <div className="bg-primary p-4 rounded-xl text-white flex justify-between items-center">
                                                <span className="text-[10px] font-black uppercase">Planning Time Left</span>
                                                <span className="text-xl font-black">{planningTime}s</span>
                                            </div>
                                        )}
                                        <textarea
                                            value={scratchpad}
                                            onChange={(e) => setScratchpad(e.target.value)}
                                            placeholder="Jot down keywords here during planning..."
                                            className="w-full h-24 p-4 text-xs bg-slate-50 dark:bg-slate-800 border-none rounded-xl resize-none focus:ring-2 focus:ring-primary outline-none italic"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 mb-8">
                                        <div className="bg-[#013950] p-8 rounded-3xl mb-8 relative overflow-hidden group">
                                            <div className="flex flex-col items-center text-center space-y-6">
                                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-2">
                                                    <Volume2 className="w-8 h-8" />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Listen & Imitate</p>
                                                    <p className="text-lg font-bold text-white leading-relaxed italic">&quot;{mirrorSample}&quot;</p>
                                                </div>
                                                <button className="bg-white text-primary px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/90 transition-all flex items-center gap-2">
                                                    <Play className="w-4 h-4" />
                                                    Play Native Sample
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex flex-col items-center justify-center py-12 bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 relative group overflow-hidden">
                                {/* AI Virtual Interviewer Video Area */}
                                <div className="absolute inset-0 z-0 bg-slate-900 group-hover:opacity-80 transition-opacity">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            animate={{
                                                scale: isRecording ? [1, 1.05, 1] : 1,
                                                opacity: isRecording ? 1 : 0.6
                                            }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="w-48 h-48 rounded-full border-4 border-accent/30 overflow-hidden relative"
                                        >
                                            {/* Fake AI Video (Pulse) */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-primary/20 animate-pulse" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Volume2 className={`w-12 h-12 text-accent ${isRecording ? 'animate-bounce' : 'opacity-20'}`} />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="relative z-10 flex flex-col items-center">
                                    {isRecording && (
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="w-4 h-4 bg-red-500 rounded-full mb-4 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                                        />
                                    )}
                                    <p className="text-2xl font-mono font-bold text-white mb-2 drop-shadow-lg">
                                        {formatTime(recordingTime)}
                                    </p>
                                    <p className="text-xs text-white/70 font-bold uppercase tracking-widest drop-shadow-md">
                                        {isRecording ? "AI Interviewer is Listening..." : "Click Below to Respond"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center gap-4">
                                {!isRecording ? (
                                    <button
                                        onClick={startRecording}
                                        className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:scale-105 active:scale-95"
                                    >
                                        <Mic className="w-5 h-5" />
                                        {audioURL ? "Re-record" : "Start Recording"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={stopRecording}
                                        className="flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-accent/90 transition-all shadow-lg animate-pulse"
                                    >
                                        <Square className="w-5 h-5 fill-current" />
                                        Stop Recording
                                    </button>
                                )}
                            </div>
                        </div>

                        {audioURL && !isRecording && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <Play className="w-5 h-5 fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-primary">Your Response</p>
                                        <p className="text-xs text-muted-foreground">{formatTime(recordingTime)} duration</p>
                                    </div>
                                </div>
                                <button
                                    onClick={analyzeSpeaking}
                                    disabled={isAnalyzing}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
                                >
                                    {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                    Analyze Audio
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Analysis */}
                    <div className="space-y-6">
                        <AnimatePresence mode="wait">
                            {!analysis ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-slate-100/50 rounded-3xl p-8 border-2 border-dashed border-slate-200 text-center h-full flex flex-col items-center justify-center"
                                >
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                                        <Info className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h3 className="font-bold text-slate-500 mb-2">Analysis Pending</h3>
                                    <p className="text-sm text-slate-400 max-w-xs mx-auto">
                                        Complete your recording to receive a band score and fluency report.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-[#013950] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Sparkles className="w-24 h-24" />
                                        </div>
                                        <p className="text-xs uppercase tracking-widest font-bold mb-2 opacity-80">Speaking Band Score</p>
                                        <div className="flex items-end gap-2">
                                            <span className="text-7xl font-black">{analysis.overall}</span>
                                            <span className="text-2xl font-bold mb-2 opacity-60">/ 9.0</span>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                        <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            Criterion Breakdown
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { label: "Fluency", val: analysis.fluency },
                                                { label: "Vocabulary", val: analysis.lexical },
                                                { label: "Grammar", val: analysis.grammar },
                                                { label: "Pronunciation", val: analysis.pronunciation },
                                            ].map(s => (
                                                <div key={s.label} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <p className="text-xs text-muted-foreground font-bold mb-1">{s.label}</p>
                                                    <p className="text-2xl font-black text-primary">{s.val}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <h3 className="font-bold text-primary dark:text-blue-400 mb-6 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-accent" />
                                            Hesitation Analytics
                                        </h3>
                                        <div className="flex items-center gap-8">
                                            <div className="text-center">
                                                <p className="text-4xl font-black text-primary dark:text-white">{analysis.hesitationCount}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Fillers</p>
                                            </div>
                                            <div className="flex-1 flex gap-2">
                                                {analysis.fillers.map((f: string) => (
                                                    <span key={f} className="px-3 py-1 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 text-red-600 text-[10px] font-bold rounded-lg uppercase italic">&quot;{f}&quot;</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <h3 className="font-bold text-primary dark:text-blue-400 mb-4 flex items-center justify-between">
                                            <span>Pronunciation Heatmap</span>
                                            <div className="flex gap-2">
                                                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full" /><span className="text-[8px] uppercase font-bold text-slate-400">Perfect</span></div>
                                                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full" /><span className="text-[8px] uppercase font-bold text-slate-400">Check</span></div>
                                            </div>
                                        </h3>
                                        <div className="flex flex-wrap gap-x-2 gap-y-1">
                                            {analysis.transcript.map((t: any, i: number) => (
                                                <span
                                                    key={i}
                                                    className={`text-lg font-medium transition-all cursor-help
                                                        ${t.score === 'green' ? 'text-green-600 dark:text-green-400 opacity-100' :
                                                            t.score === 'yellow' ? 'text-yellow-600 dark:text-yellow-400 underline decoration-yellow-300' :
                                                                'text-red-500 dark:text-red-400 underline decoration-red-400 font-bold'}
                                                    `}
                                                >
                                                    {t.word}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <h3 className="font-bold text-primary dark:text-blue-400 mb-4">Examiner's Feedback</h3>
                                        <p className="text-muted-foreground dark:text-slate-400 leading-relaxed italic text-sm">
                                            "{analysis.feedback}"
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
