"use client";

import { useState } from "react";
import { TestHeader } from "@/components/TestHeader";
import { TestFooter } from "@/components/TestFooter";
import { diagnosticTest } from "@/data/diagnostic";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle, TrendingUp, AlertCircle } from "lucide-react";

export default function DiagnosticPage() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const section = diagnosticTest.sections[0];
    const totalQuestions = section.questions.length;

    const handleAnswer = (questionId: number, value: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const calculateScore = () => {
        let correct = 0;
        section.questions.forEach((q) => {
            if (answers[q.id] === q.answer) {
                correct++;
            }
        });
        return correct;
    };

    const getBandScore = (correct: number) => {
        const ratio = correct / totalQuestions;
        if (ratio >= 0.9) return "8.5 - 9.0";
        if (ratio >= 0.75) return "7.5 - 8.0";
        if (ratio >= 0.6) return "6.0 - 7.0";
        if (ratio >= 0.4) return "5.0 - 5.5";
        return "Below 4.5";
    };

    if (isSubmitted) {
        const score = calculateScore();
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full bg-white rounded-3xl p-10 shadow-xl border border-slate-200 text-center"
                >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Test Completed!</h1>
                    <p className="text-muted-foreground mb-8">Here is your diagnostic assessment based on your performance.</p>

                    <div className="grid grid-cols-2 gap-6 mb-10">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Estimated Band</p>
                            <p className="text-4xl font-black text-primary">{getBandScore(score)}</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">Accuracy</p>
                            <p className="text-4xl font-black text-accent">{Math.round((score / totalQuestions) * 100)}%</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-left">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Brain className="w-5 h-5 text-blue-500" />
                            AI Insights
                        </h3>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-800 leading-relaxed">
                            Your performance in True/False/Not Given questions is strong, but you should practice more on multiple-choice context clues.
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.href = "/"}
                        className="mt-10 w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all"
                    >
                        Go to Dashboard
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white">
            <TestHeader testName={diagnosticTest.title} durationMinutes={diagnosticTest.duration} />

            <main className="flex-1 flex overflow-hidden">
                {/* Left Pane: Passage */}
                <div className="flex-1 overflow-y-auto p-12 border-r border-slate-200 bg-white">
                    <div className="max-w-3xl mx-auto prose prose-slate">
                        <div dangerouslySetInnerHTML={{ __html: section.passage }} />
                    </div>
                </div>

                {/* Right Pane: Questions */}
                <div className="flex-1 overflow-y-auto p-12 bg-slate-50">
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-8 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                                Progress: {Object.keys(answers).length} / {totalQuestions}
                            </span>
                            <button
                                onClick={() => setIsSubmitted(true)}
                                className="text-xs font-bold uppercase tracking-widest bg-[#c7002b] text-white px-4 py-2 rounded hover:bg-[#a50024] transition-all"
                            >
                                Submit Test
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {section.questions.map((q, idx) => (
                                numToIdx(currentQuestion) === idx && (
                                    <motion.div
                                        key={q.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                            <h3 className="text-lg font-bold text-primary mb-6">
                                                <span className="text-accent mr-2">Question {q.id}</span>
                                                {q.question}
                                            </h3>

                                            <div className="space-y-3">
                                                {q.options.map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => handleAnswer(q.id, option)}
                                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[q.id] === option
                                                                ? "border-primary bg-primary/5 text-primary font-semibold"
                                                                : "border-slate-100 hover:border-slate-300 bg-slate-50"
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
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

function numToIdx(num: number) {
    return num - 1;
}
