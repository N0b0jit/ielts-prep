"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
            {[
                { name: "light", icon: Sun },
                { name: "dark", icon: Moon },
                { name: "system", icon: Monitor },
            ].map((t) => (
                <button
                    key={t.name}
                    onClick={() => setTheme(t.name)}
                    className={`
            p-1.5 rounded-full transition-all relative
            ${theme === t.name ? "bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-blue-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}
          `}
                >
                    <t.icon className="h-4 w-4" />
                    {theme === t.name && (
                        <motion.div
                            layoutId="activeTheme"
                            className="absolute inset-0 rounded-full border border-slate-200 dark:border-slate-600"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
