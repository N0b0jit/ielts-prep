"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Image as ImageIcon, Upload, Loader2, Sparkles, ChevronRight, BarChart, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Task1Analyzer() {
    const [image, setImage] = useState<string | null>(null);
    const [essay, setEssay] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState<any>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeTask1 = async () => {
        if (!image || !essay) return;
        setIsAnalyzing(true);

        // Simulate Gemini Multimodal Analysis
        setTimeout(() => {
            setFeedback({
                scores: { overall: 7.0, content: 7.5, cohesion: 6.5, vocab: 7.0, grammar: 7.0 },
                observation: "You accurately identified the main upward trend in the line graph between 2010 and 2020. However, you missed the slight dip in 2015 which is a key detail for a Band 8+ response.",
                suggestions: ["Describe the plateau period more specifically", "Use comparative structures like 'in stark contrast to'", "Check subject-verb agreement in paragraph 2"]
            });
            setIsAnalyzing(false);
        }, 4000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full p-8">
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-primary flex items-center gap-3">
                            <BarChart className="w-8 h-8 text-accent" />
                            Task 1 Visual Analyzer
                        </h1>
                        <p className="text-muted-foreground mt-2">Academic Report Writing with Multi-Modal AI Feedback.</p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Vision Pro</span>
                        <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Academic Only</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Image Upload & Preview */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                Graph / Chart Image
                            </h3>

                            {!image ? (
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all">
                                    <Upload className="w-10 h-10 text-slate-300 mb-2" />
                                    <p className="text-sm font-medium text-slate-500">Upload Screenshot</p>
                                    <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                </label>
                            ) : (
                                <div className="relative group">
                                    <img src={image} alt="Graph" className="w-full h-auto rounded-xl border border-slate-100" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                        <button
                                            onClick={() => setImage(null)}
                                            className="bg-white text-xs font-bold py-2 px-4 rounded-full text-red-600 shadow-lg"
                                        >
                                            Remove & Change
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                <p className="text-[11px] text-amber-800 leading-relaxed italic">
                                    Tip: Upload a clear screenshot of the graph and the prompt for the best AI analysis.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Center: Report Editor */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm h-full">
                            <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Report Content
                            </h3>

                            <textarea
                                value={essay}
                                onChange={(e) => setEssay(e.target.value)}
                                placeholder="Write your 150-word report here..."
                                className="w-full h-[400px] p-6 text-lg border-2 border-slate-50 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none leading-relaxed"
                            />

                            <div className="mt-8">
                                <button
                                    onClick={analyzeTask1}
                                    disabled={isAnalyzing || !image || !essay}
                                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all disabled:opacity-50 shadow-xl shadow-primary/10"
                                >
                                    {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                    Analyze Task 1 Report
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Vision Feedback */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {!feedback ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-slate-100/50 rounded-3xl p-8 border-2 border-dashed border-slate-200 h-full flex flex-col items-center justify-center text-center"
                                >
                                    <p className="text-sm font-bold text-slate-400">Analysis Results</p>
                                    <p className="text-xs text-slate-400 mt-2">Waiting for image and text submission...</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-[#013950] text-white rounded-3xl p-6 shadow-xl">
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Estimated Band</p>
                                        <p className="text-5xl font-black">{feedback.scores.overall}</p>
                                    </div>

                                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                                        <h4 className="font-bold text-sm text-primary mb-4">Vision Observations</h4>
                                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                                            "{feedback.observation}"
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                                        <h4 className="font-bold text-sm text-primary mb-4">Key Fixes</h4>
                                        <ul className="space-y-3">
                                            {feedback.suggestions.map((s: string, i: number) => (
                                                <li key={i} className="flex gap-2 text-xs text-muted-foreground border-l-2 border-accent pl-3">
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
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
