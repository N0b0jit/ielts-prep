"use client";

import { Navbar } from "@/components/Navbar";
import { BarChart3, AlertCircle, CheckCircle2, XCircle, TrendingDown, Sparkles, TrendingUp as TrendUpIcon, History } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
    { name: 'Mon', score: 6.0, global: 6.5 },
    { name: 'Tue', score: 6.5, global: 6.5 },
    { name: 'Wed', score: 6.5, global: 6.6 },
    { name: 'Thu', score: 7.0, global: 6.4 },
    { name: 'Fri', score: 7.5, global: 6.5 },
    { name: 'Sat', score: 7.0, global: 6.7 },
    { name: 'Sun', score: 8.0, global: 6.5 },
];

export default function ErrorJournal() {
    const stats = [
        { type: "True/False/Not Given", correct: 12, wrong: 8, color: "bg-blue-500" },
        { type: "Multiple Choice", correct: 15, wrong: 3, color: "bg-green-500" },
        { type: "Matching Headings", correct: 5, wrong: 10, color: "bg-red-500" },
        { type: "Summary Completion", correct: 18, wrong: 2, color: "bg-teal-500" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto w-full p-8">
                <div className="mb-12">
                    <h1 className="text-3xl font-black text-primary flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-accent" />
                        Performance Analytics
                    </h1>
                    <p className="text-muted-foreground mt-2">Track your progress and identify your weak spots in the Reading module.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 text-green-600 mb-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase tracking-wider">Total Correct</span>
                        </div>
                        <p className="text-4xl font-black text-primary">50</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 text-red-500 mb-2">
                            <XCircle className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase tracking-wider">Total Wrong</span>
                        </div>
                        <p className="text-4xl font-black text-primary">23</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-2 text-blue-500 mb-2">
                            <TrendingDown className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase tracking-wider">Accuracy</span>
                        </div>
                        <p className="text-4xl font-black text-primary">68%</p>
                    </div>
                </div>

                {/* Performance Trend Chart */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold font-sans text-primary dark:text-blue-400 flex items-center gap-2">
                            <TrendUpIcon className="w-5 h-5 text-accent" />
                            Band Score Trend
                        </h2>
                        <div className="flex gap-2">
                            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase italic">+1.5 Band Improvement</span>
                        </div>
                    </div>

                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 'bold' }}
                                />
                                <YAxis
                                    domain={[4, 9]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 'bold' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    name="Your Score"
                                    stroke="#c7002b"
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: '#c7002b', strokeWidth: 3, stroke: '#fff' }}
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="global"
                                    name="Global Average"
                                    stroke="#94a3b8"
                                    strokeDasharray="5 5"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm transition-all hover:shadow-md">
                        <h2 className="text-xl font-bold mb-8 text-primary flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-accent" />
                            Weakness Analysis
                        </h2>
                        <div className="space-y-8">
                            {stats.map((stat) => (
                                <div key={stat.type} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{stat.type}</p>
                                            <p className="text-xs text-muted-foreground">{stat.wrong} errors recorded</p>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400">
                                            {Math.round((stat.correct / (stat.correct + stat.wrong)) * 100)}% Accuracy
                                        </span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(stat.correct / (stat.correct + stat.wrong)) * 100}%` }}
                                            className={`${stat.color} h-full transition-all duration-1000`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#013950] rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Sparkles className="w-32 h-32" />
                        </div>

                        <h2 className="text-2xl font-bold mb-4">Your AI Study Roadmap</h2>
                        <p className="text-blue-100 text-sm mb-8 leading-relaxed max-w-sm">
                            We've analyzed your performance across all modules. Click below to generate a personalized 30-day strategy to hit your target band score.
                        </p>

                        <div className="space-y-6">
                            <button className="w-full bg-white text-primary py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-2">
                                <TrendingDown className="w-4 h-4 text-accent" />
                                Generate 30-Day Plan
                            </button>

                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                <p className="text-xs font-bold mb-3 uppercase tracking-tighter opacity-60">Insight of the Week</p>
                                <p className="text-sm italic leading-relaxed">
                                    "You spend 40% more time on Multiple Choice questions than necessary. Focus on 'Scanning' instead of 'Close Reading' to save 5 minutes per passage."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-8 text-primary">Priority Warning</h2>
                    <div className="mt-12 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                            <p className="text-sm font-bold text-red-900">Priority Warning</p>
                            <p className="text-sm text-red-800 leading-relaxed">
                                You are consistently missing <strong>Matching Headings</strong> questions (33% accuracy).
                                We recommend focusing your study here before the next diagnostic test.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
