"use client";

import Link from "next/link";
import { GraduationCap, Menu, X, FileDown, Settings, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { ApiKeyModal } from "./ApiKeyModal";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

    const downloadReport = () => {
        // Simulation of PDF export
        alert("Generating your official Antigravity IELTS Performance Report (PDF)...");
        setTimeout(() => {
            alert("Performance Report (PDF) downloaded successfully!");
        }, 1500);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="h-8 w-8 text-primary dark:text-blue-400" />
                        <span className="text-xl font-bold tracking-tight text-primary dark:text-white">
                            Antigravity <span className="text-accent">IELTS</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
                        <Link href="/diagnostic" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors">
                            Diagnostic
                        </Link>
                        <Link href="/writing-lab" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors">
                            Writing
                        </Link>
                        <Link href="/speaking-coach" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors">
                            Speaking
                        </Link>
                        <Link href="/custom-exam" className="text-sm font-bold text-accent hover:opacity-80 transition-all flex items-center gap-1 italic">
                            <Sparkles className="w-3 h-3" />
                            Custom Prep
                        </Link>
                        <Link href="/vocabulary" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors">
                            Vocab Mastery
                        </Link>
                        <Link href="/listening" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors">
                            Listening
                        </Link>
                        <Link href="/journal" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary dark:hover:text-blue-400 transition-colors">
                            Journal
                        </Link>

                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

                        <ThemeToggle />

                        <button
                            onClick={() => setIsKeyModalOpen(true)}
                            className="p-2 text-muted-foreground hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
                            title="API Key Settings"
                        >
                            <Settings className="w-5 h-5" />
                        </button>

                        <button
                            onClick={downloadReport}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-accent text-white px-3 py-2 rounded-lg hover:bg-accent/90 transition-all shadow-md active:scale-95"
                        >
                            <FileDown className="h-3.5 w-3.5" />
                            PDF Report
                        </button>

                        <button className="rounded-full bg-primary dark:bg-blue-600 px-4 py-2 text-[10px] font-bold text-white hover:bg-primary/90 dark:hover:bg-blue-500 transition-all shadow-md uppercase tracking-wider">
                            Sign In
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-muted-foreground hover:text-primary"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden border-b bg-white px-4 py-4 space-y-4"
                    >
                        <Link href="/diagnostic" className="block text-base font-medium text-muted-foreground">Diagnostic Test</Link>
                        <Link href="/writing-lab" className="block text-base font-medium text-muted-foreground">Writing Lab</Link>
                        <Link href="/simulator" className="block text-base font-medium text-muted-foreground">Simulator</Link>
                        <Link href="/journal" className="block text-base font-medium text-muted-foreground">Error Journal</Link>
                        <button
                            onClick={() => setIsKeyModalOpen(true)}
                            className="w-full text-left py-2 text-base font-medium text-muted-foreground flex items-center gap-2"
                        >
                            <Settings className="w-4 h-4" /> API Settings
                        </button>
                        <button className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white">
                            Sign In
                        </button>
                    </motion.div>
                )}
            </nav>
            <ApiKeyModal isOpen={isKeyModalOpen} onClose={() => setIsKeyModalOpen(false)} />
        </>
    );
};
