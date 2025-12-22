"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Trophy, Flame, Target } from "lucide-react";
import { motion } from "framer-motion";

export function MissionBar() {
    const [missions, setMissions] = useState([
        { id: 1, text: "Write 150+ words in Writing Lab", completed: false },
        { id: 2, text: "Try Australian Accent in Listening", completed: true },
        { id: 3, text: "Complete Speaking Part 2 Prep", completed: false },
    ]);

    const completedCount = missions.filter(m => m.completed).length;

    return (
        <div className="fixed top-16 left-0 right-0 z-40 bg-[#013950]/90 backdrop-blur-md border-b border-white/10 px-6 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-accent" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Daily Missions</span>
                    </div>

                    <div className="hidden md:flex gap-4">
                        {missions.map(m => (
                            <div key={m.id} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full border-2 ${m.completed ? 'bg-green-500 border-green-500' : 'border-white/20'}`}>
                                    {m.completed && <CheckCircle2 className="w-2 h-2 text-white" />}
                                </div>
                                <span className={`text-[9px] font-bold ${m.completed ? 'text-white' : 'text-white/40'} uppercase tracking-tighter`}>{m.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span className="text-[10px] font-black text-white">12 DAY STREAK</span>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-2">
                        <Target className="w-3 h-3 text-blue-400" />
                        <span className="text-[10px] font-black text-white uppercase">{completedCount}/{missions.length} DONE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
