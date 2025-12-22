"use client";

import { useState, useRef } from "react";
import { Highlighter, PenLine, StickyNote, X, Trash2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Highlight {
    id: string;
    text: string;
    color: string;
    note?: string;
}

export function AnnotatableText({ html }: { html: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 });
    const [selection, setSelection] = useState<Selection | null>(null);
    const [definition, setDefinition] = useState<{ word: string, text: string, synonyms: string[] } | null>(null);

    const handleDoubleClick = (e: React.MouseEvent) => {
        const sel = window.getSelection();
        const word = sel?.toString().trim();
        if (word && word.length > 2 && !word.includes(" ")) {
            setDefinition({
                word: word,
                text: "Directly contextualized explanation based on IELTS Academic requirements.",
                synonyms: ["Sophisticated", "Advanced", "Professional"]
            });
            setToolbarPos({ x: e.pageX, y: e.pageY - 40 });
            setShowToolbar(false);
        }
    };

    const handleMouseUp = () => {
        const sel = window.getSelection();
        if (sel && sel.toString().length > 2) {
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            setToolbarPos({
                x: rect.left + window.scrollX + rect.width / 2,
                y: rect.top + window.scrollY - 40
            });
            setSelection(sel);
            setShowToolbar(true);
            setDefinition(null);
        } else {
            setShowToolbar(false);
        }
    };

    const addHighlight = (color: string) => {
        if (!selection) return;
        const newHighlight: Highlight = {
            id: Math.random().toString(36).substr(2, 9),
            text: selection.toString(),
            color: color,
        };
        setHighlights([...highlights, newHighlight]);
        setShowToolbar(false);
        window.getSelection()?.removeAllRanges();
    };

    return (
        <div className="relative group">
            <div
                ref={containerRef}
                onMouseUp={handleMouseUp}
                onDoubleClick={handleDoubleClick}
                dangerouslySetInnerHTML={{ __html: html }}
                className="prose dark:prose-invert max-w-none select-text"
            />

            <AnimatePresence>
                {showToolbar && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        style={{ left: toolbarPos.x, top: toolbarPos.y }}
                        className="absolute z-50 flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 rounded-xl shadow-xl -translate-x-1/2"
                    >
                        <button onClick={() => addHighlight("#fef08a")} className="p-1.5 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg text-yellow-600">
                            <Highlighter className="w-4 h-4" />
                        </button>
                        <button onClick={() => addHighlight("#bfdbfe")} className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-blue-600">
                            <PenLine className="w-4 h-4" />
                        </button>
                        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500">
                            <StickyNote className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {definition && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        style={{ left: toolbarPos.x, top: toolbarPos.y }}
                        className="absolute z-[60] w-64 bg-[#013950] text-white p-5 rounded-2xl shadow-2xl -translate-x-1/2"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-black text-accent uppercase tracking-tighter italic flex items-center gap-2">
                                <Sparkles className="w-3 h-3" />
                                {definition.word}
                            </h4>
                            <button onClick={() => setDefinition(null)} className="p-1 hover:bg-white/10 rounded">
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-80 mb-4">{definition.text}</p>
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">IELTS Synonyms</p>
                            <div className="flex flex-wrap gap-2">
                                {definition.synonyms.map(s => (
                                    <span key={s} className="text-[9px] bg-white/10 px-2 py-1 rounded border border-white/5">{s}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Highlights Sidebar */}
            <div className="fixed top-24 right-6 w-64 pointer-events-none hidden xl:block">
                <div className="space-y-3 pointer-events-auto">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Active Highlights</p>
                    {highlights.map((h) => (
                        <motion.div
                            key={h.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-sm group/item border-l-4"
                            style={{ borderLeftColor: h.color }}
                        >
                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic">"{h.text}"</p>
                            <button
                                onClick={() => setHighlights(highlights.filter(x => x.id !== h.id))}
                                className="mt-2 text-[9px] font-bold text-red-500 opacity-0 group-hover/item:opacity-100 transition-all flex items-center gap-1"
                            >
                                <Trash2 className="w-3 h-3" /> Remove
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
