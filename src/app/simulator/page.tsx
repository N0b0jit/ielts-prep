"use client";

import { useState, useEffect } from "react";
import { TestHeader } from "@/components/TestHeader";
import { TestFooter } from "@/components/TestFooter";
import { AnnotatableText } from "@/components/AnnotatableText";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, BookOpen, Clock, Settings2, Sparkles, ChevronRight, Zap } from "lucide-react";

export default function SimulatorPage() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [fontSize, setFontSize] = useState("text-base");
    const [velocityMode, setVelocityMode] = useState(false);
    const [currentLine, setCurrentLine] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [focusWarnings, setFocusWarnings] = useState(0);
    const [showFocusModal, setShowFocusModal] = useState(false);

    const passageLines = [
        "The evolution of urban architecture has been profoundly influenced by both technological advancements and shifting societal values.",
        "In the early 20th century, the advent of steel-frame construction allowed for the first skyscrapers, fundamentally changing city skylines.",
        "However, modern architecture is now pivoting toward sustainability and human-centric design.",
        "Smart materials that adjust to light and temperature are becoming commonplace in new builds.",
        "This shift reflects a growing awareness of the environmental impact of large-scale construction.",
        "Furthermore, urban planners are increasingly focusing on 'green spaces' within vertical structures.",
        "The integration of nature into the built environment is shown to reduce urban heat island effects.",
        "As we look to the future, the challenge remains: how to balance density with livability?",
        "Innovations like carbon-sequestering concrete offer a glimpse into a net-zero future.",
        "Ultimately, the goal is to create cities that are not just efficient, but resilient and equitable."
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (velocityMode) {
            interval = setInterval(() => {
                setCurrentLine((prev) => (prev + 1) % passageLines.length);
            }, 3000); // 3 seconds per line for 250 WPM training
        }
        return () => clearInterval(interval);
    }, [velocityMode, passageLines.length]);

    useEffect(() => {
        const handleBlur = () => {
            if (focusWarnings < 3) {
                setFocusWarnings(prev => prev + 1);
                setShowFocusModal(true);
            }
        };

        window.addEventListener("blur", handleBlur);
        return () => window.removeEventListener("blur", handleBlur);
    }, [focusWarnings]);

    const totalQuestions = 40; // Standard IELTS Reading

    const simulatorData = {
        passage: `
            <h1 class="text-3xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                The Mystery of the Indus Valley Civilization
            </h1>
            <div class="p-6 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl my-8">
                <p class="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Instructions</p>
                <p class="text-gray-600 dark:text-gray-400">You should spend about 20 minutes on Questions 1-13, which are based on the Reading Passage above.</p>
            </div>
        `
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-slate-950 font-sans">
            <TestHeader testName="IELTS Reading Practice | Test 1" durationMinutes={60} />

            <main className="flex-1 flex overflow-hidden">
                {/* Left Pane: Sticky Passage */}
                <div className="flex-1 overflow-y-auto p-12 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="max-w-3xl mx-auto">
                        {/* The actual passage content, conditionally rendered */}
                        <div className={`prose dark:prose-invert max-w-none ${fontSize} leading-relaxed font-serif text-slate-700 dark:text-slate-300`}>
                            {velocityMode ? (
                                <div className="space-y-4">
                                    {passageLines.map((line, i) => (
                                        <motion.p
                                            key={i}
                                            animate={{
                                                opacity: i === currentLine ? 1 : 0.2,
                                                scale: i === currentLine ? 1 : 0.98,
                                                x: i === currentLine ? 0 : -5
                                            }}
                                            className={`${i === currentLine ? 'text-[#013950] dark:text-white font-bold' : ''}`}
                                        >
                                            {line}
                                        </motion.p>
                                    ))}
                                </div>
                            ) : (
                                <AnnotatableText html={simulatorData.passage + `
                                    <div class="space-y-6 text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
                                        <p>
                                            The Indus Valley Civilization, also known as the Harappan Civilization, was one of the three earliest civilizations in the world, alongside Mesopotamia and Ancient Egypt. At its peak, it spanned a vast area in what is now modern-day Pakistan and northwest India.
                                        </p>
                                        <p>
                                            What makes this civilization particularly fascinating is its advanced urban planning. Cities like Harappa and Mohenjo-daro featured sophisticated drainage systems, grid-patterned streets, and large-scale public buildings. Yet, despite these achievements, the civilization eventually declined and vanished, leaving behind a script that remains untranslated to this day.
                                        </p>
                                        <p>
                                            Archaeologists have proposed various theories for the decline. Some suggest climate change led to the drying up of major rivers, while others point to tectonic shifts or invasions. However, the exact cause remains one of history's greatest enigmas.
                                        </p>
                                        <p>
                                            The discovery of numerous seals depicting animals and mythical creatures suggests a rich cultural and religious life. These seals were likely used in trade, indicating a highly organized economic system that connected the Indus Valley with distant lands in the Middle East.
                                        </p>
                                    </div>
                                `} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Pane: Scrolling Questions */}
                <div className="flex-1 overflow-y-auto p-12 bg-slate-50/50 dark:bg-slate-950">
                    <div className="max-w-2xl mx-auto space-y-12">
                        {/* Pacing Pro Gauge */}
                        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 mb-2">
                                <span className="flex items-center gap-2">
                                    <Clock className="w-3 h-3" />
                                    Pacing Pro: Section 1
                                </span>
                                <span className="text-primary dark:text-blue-400 italic">Target: 20 mins</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: "35%" }} // Simulated progress
                                />
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
                                Strategy: Spend no more than <span className="font-bold text-primary dark:text-blue-400">1.5 minutes</span> per question to leave time for the final passage.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-primary dark:text-blue-400 mb-2">Questions 1-4</h2>
                            <p className="text-sm text-slate-500 mb-6 font-medium">Do the following statements agree with the information given in the Reading Passage?</p>

                            <div className="space-y-4">
                                {[
                                    { id: 1, text: "The Indus Valley Civilization was the first civilization in the world." },
                                    { id: 2, text: "The civilization script has been deciphered by modern linguists." },
                                    { id: 3, text: "Advanced urban planning was a key feature of its major cities." },
                                    { id: 4, text: "Most archaeologists agree that climate change was the sole cause of the decline." }
                                ].map((q) => (
                                    <div key={q.id} className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <p className="font-bold text-gray-900 dark:text-white mb-4 italic">{q.id}. {q.text}</p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => { setVelocityMode(!velocityMode); if (!velocityMode) setCurrentLine(0); }}
                                                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${velocityMode ? 'bg-accent text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                                            >
                                                <Zap className="w-3 h-3" />
                                                {velocityMode ? "Velocity Active" : "Start Speed Trainer"}
                                            </button>
                                            <select
                                                value={fontSize}
                                                onChange={(e) => setFontSize(e.target.value)}
                                                className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-none focus:ring-0"
                                            >
                                                <option value="text-sm">Small</option>
                                                <option value="text-base">Medium</option>
                                                <option value="text-lg">Large</option>
                                            </select>
                                            {["TRUE", "FALSE", "NOT GIVEN"].map((val) => (
                                                <button
                                                    key={val}
                                                    onClick={() => setAnswers({ ...answers, [q.id]: val })}
                                                    className={`
                                                        px-4 py-2 text-xs font-bold rounded border-2 transition-all
                                                        ${answers[q.id] === val
                                                            ? "bg-primary dark:bg-blue-600 border-primary dark:border-blue-600 text-white"
                                                            : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500"}
                                                    `}
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
                            <p className="text-center text-slate-400 text-sm font-bold tracking-widest uppercase">End of Passage 1</p>
                        </div>
                    </div>
                </div>
            </main>

            <TestFooter
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                onNavigate={setCurrentQuestion}
                answeredQuestions={Object.keys(answers).map(Number)}
            />

            {/* Focus Guard Modal */}
            <AnimatePresence>
                {showFocusModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-red-900/40 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] max-w-sm w-full text-center shadow-2xl border-4 border-red-500"
                        >
                            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-primary dark:text-white mb-2 uppercase tracking-tighter">Focus Warning!</h3>
                            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                                Switching tabs or windows is restricted during mock tests. <br />
                                <span className="font-bold text-red-600">Warning {focusWarnings} of 3</span>
                            </p>
                            {focusWarnings >= 3 ? (
                                <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl mb-8">
                                    <p className="text-xs font-bold text-red-600 uppercase">Test Invalidated</p>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowFocusModal(false)}
                                    className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all"
                                >
                                    I Understand
                                </button>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
