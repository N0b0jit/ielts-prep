"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface TestFooterProps {
    currentQuestion: number;
    totalQuestions: number;
    onNavigate: (index: number) => void;
    answeredQuestions: number[];
}

export const TestFooter = ({
    currentQuestion,
    totalQuestions,
    onNavigate,
    answeredQuestions,
}: TestFooterProps) => {
    return (
        <footer className="h-16 bg-white border-t flex items-center justify-between px-4 select-none">
            <div className="flex-1 overflow-x-auto no-scrollbar py-2">
                <div className="flex gap-1 min-w-max">
                    {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => onNavigate(num)}
                            className={`
                relative w-8 h-8 text-xs font-semibold rounded transition-all
                ${currentQuestion === num
                                    ? "bg-[#013950] text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }
              `}
                        >
                            {num}
                            {answeredQuestions.includes(num) && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-blue-500 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 pl-4 border-l ml-4 bg-white">
                <button
                    disabled={currentQuestion === 1}
                    onClick={() => onNavigate(currentQuestion - 1)}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </button>
                <button
                    disabled={currentQuestion === totalQuestions}
                    onClick={() => onNavigate(currentQuestion + 1)}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold bg-[#013950] text-white hover:bg-[#014a6b] rounded disabled:opacity-30"
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </footer>
    );
};
