"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FileUp, FileText, Sparkles, Loader2, CheckCircle2, ChevronRight, BookOpen, PenTool, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomExam() {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [generatedContent, setGeneratedContent] = useState<any>(null);

    const handleUpload = () => {
        if (!file) return;
        setIsUploading(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    setGeneratedContent({
                        topic: "Advanced Technological Evolution and Human Psychology",
                        reading: "Passage extract based on " + file.name + "...",
                        writing: "In many societies, technology is seen as a double-edged sword. Discuss how content in " + file.name + " supports this.",
                        speaking: ["What are your thoughts on the main theme of this document?", "How has this topic influenced modern society?"]
                    });
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto w-full p-8 mt-16">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Zero-Shot Custom Prep
                    </motion.div>
                    <h1 className="text-5xl font-black text-[#013950] dark:text-white mb-6 tracking-tighter">
                        Generate IELTS Prep <br /> From <span className="text-accent underline decoration-8 underline-offset-8">Any Document</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Upload a PDF document, article, or study notes. Antigravity AI will instantly build a custom Reading, Writing, and Speaking curriculum based on its content.
                    </p>
                </div>

                {!generatedContent ? (
                    <div className="max-w-xl mx-auto">
                        <div
                            className={`relative border-4 border-dashed rounded-[3rem] p-20 text-center transition-all ${file ? "border-green-500 bg-green-50/10" : "border-slate-200 dark:border-slate-800 hover:border-accent hover:bg-slate-50 dark:hover:bg-slate-900"
                                }`}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                accept="application/pdf"
                            />
                            <div className="flex flex-col items-center">
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl ${file ? "bg-green-500 text-white" : "bg-[#013950] text-white"}`}>
                                    <FileUp className="w-10 h-10" />
                                </div>
                                {file ? (
                                    <div className="space-y-1">
                                        <p className="text-lg font-black text-slate-800 dark:text-white uppercase">{file.name}</p>
                                        <p className="text-xs text-green-500 font-bold uppercase tracking-widest">File Ready for Analysis</p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-xl font-bold text-slate-800 dark:text-white mb-2">Drop your PDF here</p>
                                        <p className="text-sm text-slate-400 uppercase tracking-widest font-black">or click to browse</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {file && !isUploading && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={handleUpload}
                                className="w-full mt-8 bg-[#013950] text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                            >
                                Generate Custom Curriculum
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        )}

                        {isUploading && (
                            <div className="mt-12 space-y-6">
                                <div className="flex justify-between items-end mb-2">
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 text-accent animate-spin" />
                                        <div>
                                            <p className="text-xs font-black text-[#013950] dark:text-white uppercase tracking-widest">
                                                {progress < 40 ? "Scanning Document Structure..." : progress < 70 ? "Synthesizing Academic Prompts..." : "Finalizing IELTS-Style Questions..."}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Deep Brain Integration Active</p>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-black text-[#013950] dark:text-accent italic">{progress}%</span>
                                </div>
                                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="h-full bg-accent rounded-full shadow-[0_0_15px_rgba(199,0,43,0.3)]"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { title: "Custom Reading", icon: BookOpen, desc: "A full academic passage synthesized from your PDF with 3 complex question types.", link: "/simulator" },
                            { title: "Targeted Writing", icon: PenTool, desc: "Task 2 prompts designed to challenge your understanding of themes in your document.", link: "/writing-lab" },
                            { title: "Avatar Speaking", icon: Mic, desc: "Part 2 cue cards and Part 3 discussion points derived directly from your file.", link: "/speaking-coach" },
                        ].map((module, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <module.icon className="w-24 h-24" />
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary mb-8">
                                    <module.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-[#013950] dark:text-blue-400 mb-4">{module.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                                    {module.desc}
                                </p>
                                <button className="w-full bg-slate-50 dark:bg-slate-800 text-[#013950] dark:text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                                    Launch Module
                                </button>
                            </div>
                        ))}

                        <div className="md:col-span-3 mt-12 p-8 bg-green-500/10 border-2 border-dashed border-green-500/30 rounded-[3rem] flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-green-500 text-white rounded-3xl flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-green-700 dark:text-green-400 uppercase tracking-tighter">Curriculum Generated</h3>
                                    <p className="text-sm font-bold text-green-600/80">Themes: {generatedContent.topic}</p>
                                </div>
                            </div>
                            <button onClick={() => setGeneratedContent(null)} className="text-green-700 dark:text-green-400 text-xs font-black uppercase underline tracking-widest">Upload New File</button>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
