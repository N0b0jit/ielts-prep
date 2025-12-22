"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import {
    PenTool, Send, Loader2, Sparkles, BookOpen, AlertCircle,
    TrendingUp, Target, CheckCircle2, ShieldCheck, PenTool as PenIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WritingLab() {
    const [essay, setEssay] = useState("");
    const [prompt, setPrompt] = useState("Some people think that it is best to work for the same organization for one's whole life. Others think that it is better to change jobs frequently. Discuss both views and give your opinion.");
    const [wordCount, setWordCount] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<any>(null);
    const [timeLeft, setTimeLeft] = useState(40 * 60);
    const [showBrainstorm, setShowBrainstorm] = useState(false);
    const [brainstormData, setBrainstormData] = useState<any>(null);
    const [isBrainstorming, setIsBrainstorming] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const [isRepairing, setIsRepairing] = useState(false);
    const [repairCount, setRepairCount] = useState(0);
    const [showSample, setShowSample] = useState(false);
    const [showBooster, setShowBooster] = useState(false);
    const [suggestions, setSuggestions] = useState([
        { original: "important", upgrade: "paramount", context: "This factor is paramount to..." },
        { original: "good", upgrade: "exemplary", context: "An exemplary choice for..." },
        { original: "bad", upgrade: "detrimental", context: "Has a detrimental effect on..." }
    ]);
    const sampleAnswer = "Across the globe, the debate surrounding career stability versus professional mobility remains highly contentious. Proponents of lifelong tenure in a single organization argue that it fosters deep-seated loyalty and provides a secure financial foundation. Conversely, advocates of frequent job changes maintain that such a path facilitates broader skill acquisition and psychological resilience. In my view, while both approaches possess merit, the modern economic landscape increasingly favors professional adaptability...";

    const getPacingColor = () => {
        const elapsed = (40 * 60) - timeLeft;
        if (elapsed < 300) return "bg-green-500";
        if (elapsed < 1800) return "bg-blue-500";
        if (elapsed < 2100) return "bg-orange-500";
        return "bg-red-500";
    };

    useEffect(() => {
        const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
        setWordCount(words);
    }, [essay]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const analyzeEssay = async () => {
        if (wordCount < 50) {
            alert("Please write at least 50 words for a meaningful analysis.");
            return;
        }
        setIsAnalyzing(true);
        setTimeout(() => {
            setFeedback({
                scores: { overall: 7.5, taskResponse: 8.0, coherence: 7.0, lexical: 7.5, grammar: 7.5 },
                feedback: {
                    lexical: "Excellent use of academic terms. Consider more idiomatic collocations.",
                    grammar: "Strong control of complex structures, though minor punctuation errors exist."
                },
                comparisons: [
                    { original: essay.split('.')[0] || "Sample sentence.", improved: "The provided evidence strongly indicates that the implementation of such policies is not only beneficial but essential for long-term sustainability." },
                ]
            });
            setIsAnalyzing(false);
        }, 2000);
    };

    const generateIdeas = () => {
        setIsBrainstorming(true);
        setTimeout(() => {
            setBrainstormData({
                agree: ["Increased work-life balance", "Exposure to diverse industries", "Faster salary growth"],
                disagree: ["Loss of long-term benefits/pension", "Lack of job security", "Need for constant reskilling"],
                structure: "Intro > Argument 1 (Flexibility) > Argument 2 (Stability) > Personal Opinion > Conclusion"
            });
            setIsBrainstorming(false);
        }, 1500);
    };

    const transformStyle = (type: 'academic' | 'concise') => {
        if (essay.length < 20) return;
        setIsTransforming(true);
        setTimeout(() => {
            const result = type === 'academic'
                ? essay.replace(/I think/g, "It is arguably the case that").replace(/good/g, "efficacious")
                : essay.slice(0, essay.length / 2) + "... [Concise version generated]";
            setEssay(result);
            setIsTransforming(false);
        }, 800);
    };

    const repairGrammar = () => {
        setIsRepairing(true);
        setTimeout(() => {
            let fixed = essay
                .replace(/\bi is\b/gi, "I am")
                .replace(/\bpeople is\b/gi, "people are")
                .replace(/\bit have\b/gi, "it has")
                .replace(/\bthe government should to\b/gi, "the government should");

            if (fixed !== essay) {
                setRepairCount(prev => prev + 1);
                setEssay(fixed);
            }
            setIsRepairing(false);
        }, 1200);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14">
                {/* Editor Side */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-primary dark:text-blue-400">
                                <PenTool className="w-5 h-5 text-accent" />
                                Writing Lab
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="text-sm font-medium text-muted-foreground bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase text-[10px] tracking-widest font-black">
                                    Time: <span className={`${timeLeft < 300 ? "text-red-500" : ""}`}>{formatTime(timeLeft)}</span>
                                </div>
                                <div className="text-sm font-medium text-muted-foreground bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase text-[10px] tracking-widest font-black">
                                    Words: <span className={`${wordCount < 250 ? "text-orange-500" : "text-green-500"}`}>{wordCount}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 rounded-r-lg mb-8 flex justify-between items-center">
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 leading-relaxed italic pr-8">
                                &quot;{prompt}&quot;
                            </p>
                            <button
                                onClick={() => { setShowBrainstorm(true); generateIdeas(); }}
                                className="flex-shrink-0 bg-white dark:bg-slate-800 text-primary dark:text-white border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                            >
                                <Sparkles className="w-3 h-3 text-accent" />
                                Brainstorm
                            </button>
                        </div>

                        {/* Pacing Pro Gauge */}
                        <div className="mb-6">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 mb-1">
                                <span>Pacing Pro Gauge</span>
                                <span className="text-primary dark:text-blue-400 italic">Phase: {timeLeft > 2100 ? "Planning" : timeLeft > 300 ? "Writing" : "Polishing"}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${getPacingColor()}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((40 * 60 - timeLeft) / (40 * 60)) * 100}%` }}
                                />
                            </div>
                        </div>

                        <textarea
                            value={essay}
                            onChange={(e) => setEssay(e.target.value)}
                            placeholder="Start typing your essay here..."
                            className={`w-full h-[500px] p-6 text-lg border-2 border-slate-100 dark:border-slate-800 bg-transparent rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none leading-relaxed dark:text-white ${showSample ? 'hidden' : 'block'}`}
                        />

                        {showSample && (
                            <div className="grid grid-cols-2 gap-8 h-[500px]">
                                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-y-auto">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Your Draft</p>
                                    <p className="text-sm dark:text-white leading-relaxed whitespace-pre-wrap">{essay || "No content yet."}</p>
                                </div>
                                <div className="p-6 bg-green-50/50 dark:bg-green-900/10 border-2 border-green-500/20 rounded-xl overflow-y-auto relative">
                                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase">Band 9.0 Elite</div>
                                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-4">Expert Sample</p>
                                    <p className="text-sm dark:text-white leading-relaxed font-serif">{sampleAnswer}</p>
                                </div>
                            </div>
                        )}

                        {showBooster && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute right-[-320px] top-0 w-72 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl z-10"
                            >
                                <div className="flex items-center gap-2 mb-6 text-purple-600">
                                    <Sparkles className="w-5 h-5" />
                                    <h3 className="font-black text-[10px] uppercase tracking-widest">Lexical Booster</h3>
                                </div>
                                <div className="space-y-4">
                                    {suggestions.map((s, i) => (
                                        <div key={i} className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-800/50 group">
                                            <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Replace: {s.original}</p>
                                            <p className="text-sm font-black text-purple-600 mb-2">{s.upgrade}</p>
                                            <p className="text-[10px] text-slate-500 italic mb-3">"{s.context}"</p>
                                            <button className="w-full py-2 bg-purple-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Quick Replace</button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={() => transformStyle('academic')}
                                disabled={isTransforming}
                                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
                            >
                                {isTransforming ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-accent" />}
                                Style: Academic Elite
                            </button>
                            <button
                                onClick={() => transformStyle('concise')}
                                disabled={isTransforming}
                                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-primary dark:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                            >
                                <PenTool className="w-3 h-3 text-blue-500" />
                                Tone: Concise Pro
                            </button>
                            <button
                                onClick={repairGrammar}
                                disabled={isRepairing}
                                className="px-4 py-2 bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center gap-2"
                            >
                                {isRepairing ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShieldCheck className="w-3 h-3" />}
                                Quick Grammar Repair
                            </button>
                            <button
                                onClick={() => setShowSample(!showSample)}
                                className={`px-4 py-2 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${showSample ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-primary dark:text-white'}`}
                            >
                                <BookOpen className="w-3 h-3 inline mr-2" />
                                {showSample ? "Back to Editor" : "Compare w/ Band 9"}
                            </button>
                            <button
                                onClick={() => setShowBooster(!showBooster)}
                                className={`px-4 py-2 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${showBooster ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/20' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-primary dark:text-white'}`}
                            >
                                <Sparkles className="w-3 h-3 inline mr-2" />
                                {showBooster ? "Hide Booster" : "Lexical Booster"}
                            </button>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={analyzeEssay}
                                disabled={isAnalyzing}
                                className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                Analyze Full Essay
                            </button>
                        </div>

                        {repairCount > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase">Grammar Polished</p>
                                    <p className="text-[9px] text-green-600/60 font-bold uppercase underline">Undo changes?</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Sidebar Side */}
                <div className="space-y-6">
                    {/* Live Checklist - Always Visible */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400 mb-6 flex items-center gap-2">
                            <Target className="w-4 h-4 text-accent" />
                            Live Band 9 Checklist
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: "Transition Words", regex: /\b(however|therefore|moreover|consequently|nonetheless|despite|furthermore)\b/i },
                                { label: "Passive Voice / Complexity", regex: /\b(is|are|was|were)\b.*\b(been|ed|en)\b/i },
                                { label: "Academic Vocabulary", regex: /\b(significant|substantial|empirical|fundamental|correlation|paradigm)\b/i },
                                { label: "Word Count (150+)", check: () => wordCount >= 150 },
                                { label: "Multi-Paragraph Structure", check: () => essay.split('\n\n').length >= 3 }
                            ].map((item, i) => {
                                const isDone = item.check ? item.check() : item.regex?.test(essay);
                                return (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className={`text-[11px] font-bold ${isDone ? 'text-slate-800 dark:text-white' : 'text-slate-400'}`}>{item.label}</span>
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${isDone ? 'bg-green-500 border-green-500 text-white' : 'border-slate-100 dark:border-slate-800'}`}>
                                            {isDone && <CheckCircle2 className="w-3 h-3" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {!feedback ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-slate-100/50 dark:bg-slate-900/50 rounded-3xl p-8 border border-dashed border-slate-200 dark:border-slate-800 text-center"
                            >
                                <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                                <h4 className="font-bold text-slate-500 dark:text-slate-400 text-sm mb-2">Analysis Pending</h4>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500">Finish your essay to receive detailed feedback and Band Score.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="bg-[#013950] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Sparkles className="w-24 h-24" />
                                    </div>
                                    <p className="text-xs uppercase tracking-widest font-bold mb-2 opacity-80">Estimated Score</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-6xl font-black">{feedback.scores.overall}</span>
                                        <span className="text-xl font-bold mb-2 opacity-60">/ 9.0</span>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400 mb-2">Criteria Breakdown</h4>
                                    {[
                                        { label: "Task Response", score: feedback.scores.taskResponse },
                                        { label: "Cohesion", score: feedback.scores.coherence },
                                        { label: "Lexical", score: feedback.scores.lexical },
                                        { label: "Grammar", score: feedback.scores.grammar },
                                    ].map(s => (
                                        <div key={s.label} className="space-y-2">
                                            <div className="flex justify-between text-[11px] font-bold">
                                                <span>{s.label}</span>
                                                <span>{s.score}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-accent" style={{ width: `${(s.score / 9) * 100}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {feedback.comparisons && (
                                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400">Deep Rewrite Fixes</h4>
                                        {feedback.comparisons.map((c: any, i: number) => (
                                            <div key={i} className="space-y-2">
                                                <p className="text-[9px] font-black uppercase text-red-400">Original</p>
                                                <p className="text-xs p-3 bg-red-50 dark:bg-red-900/10 rounded-xl text-slate-500 line-through italic">{c.original}</p>
                                                <p className="text-[9px] font-black uppercase text-green-400">Band 9 Version</p>
                                                <p className="text-xs p-3 bg-green-50 dark:bg-green-900/10 rounded-xl text-slate-800 dark:text-slate-200 font-medium">{c.improved}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Brainstorm Modal */}
            <AnimatePresence>
                {showBrainstorm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
                        >
                            <div className="bg-[#013950] p-8 text-white flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <Sparkles className="w-8 h-8 text-accent" />
                                    <div>
                                        <h3 className="font-black uppercase tracking-widest text-sm">AI Brainstorming</h3>
                                        <p className="text-[10px] text-blue-200 font-bold">TASK 2 STRATEGY GUIDE</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowBrainstorm(false)} className="p-2 hover:bg-white/10 rounded-full">
                                    <AlertCircle className="w-6 h-6 rotate-45" />
                                </button>
                            </div>

                            <div className="p-10 space-y-8">
                                {isBrainstorming ? (
                                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Generating Points...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-green-500 uppercase">Pro Arguments</p>
                                                {brainstormData?.agree.map((item: string, i: number) => (
                                                    <div key={i} className="p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-red-500 uppercase">Con Arguments</p>
                                                {brainstormData?.disagree.map((item: string, i: number) => (
                                                    <div key={i} className="p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-300">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-primary/5">
                                            <p className="text-[10px] font-black text-primary dark:text-blue-400 uppercase mb-2">Recommended Essay Flow</p>
                                            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic">{brainstormData?.structure}</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="p-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <button onClick={() => setShowBrainstorm(false)} className="bg-[#013950] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Start Writing</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
