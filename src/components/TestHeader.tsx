"use client";

import { Settings, LogOut, Clock, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface TestHeaderProps {
    testName: string;
    durationMinutes: number;
}

export const TestHeader = ({ testName, durationMinutes }: TestHeaderProps) => {
    const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <header className="h-14 bg-[#013950] text-white flex items-center justify-between px-6 select-none">
            <div className="flex items-center gap-4">
                <h1 className="font-semibold text-sm tracking-wide uppercase italic">{testName}</h1>
            </div>

            <div className="flex items-center bg-white/10 px-4 py-1 rounded-md border border-white/20 gap-3">
                <Clock className="h-4 w-4 text-blue-200" />
                <span className="font-mono text-lg font-bold leading-none w-16 text-center">
                    {formatTime(timeLeft)}
                </span>
            </div>

            <div className="flex items-center gap-5">
                <button className="flex flex-col items-center hover:text-blue-200 transition-colors">
                    <HelpCircle className="h-4 w-4" />
                    <span className="text-[10px] mt-0.5">Help</span>
                </button>
                <button className="flex flex-col items-center hover:text-blue-200 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span className="text-[10px] mt-0.5">Settings</span>
                </button>
                <div className="h-8 w-px bg-white/20 mx-1" />
                <button className="flex flex-col items-center hover:text-red-300 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span className="text-[10px] mt-0.5">Exit</span>
                </button>
            </div>
        </header>
    );
};
