"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  CheckCircle2, BookOpen, ShieldCheck, Mail, Sparkles,
  ArrowRight, Mic, LineChart as ChartIcon, Target, Trophy,
  GraduationCap, PenTool, BarChart3, Clock, ChevronRight, Brain
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-24 sm:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.50),white)]" />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12">
            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex justify-center"
              >
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-primary/20 bg-white/50 backdrop-blur">
                  Powered by Gemini 1.5 Flash AI.{" "}
                  <a href="#" className="font-semibold text-primary">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-primary sm:text-6xl"
              >
                Master your IELTS with <span className="text-accent">Elite AI Feedback</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-lg leading-8 text-muted-foreground"
              >
                The world&apos;s first 100% free, agentic IELTS preparation platform.
                Get professional band scores and detailed analysis in seconds.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 flex items-center justify-center gap-x-6"
              >
                <Link
                  href="/diagnostic"
                  className="rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-xl hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all scale-100 hover:scale-105"
                >
                  Start Diagnostic Test
                </Link>
                <Link href="/writing-lab" className="text-sm font-semibold leading-6 text-primary">
                  Try Writing Lab <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Goals & Missions Grid */}
        <section className="bg-slate-50 py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Goal Setter */}
              <div className="bg-[#013950] rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent opacity-20 blur-2xl group-hover:opacity-40 transition-opacity" />
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">Elite Performance Radar</h3>
                    <p className="text-3xl font-black">SKILL MAP</p>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl">
                    <ChartIcon className="w-5 h-5 text-accent" />
                  </div>
                </div>

                <div className="relative h-48 flex items-center justify-center mb-8">
                  {/* Custom SVG Radar Chart */}
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.1" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.1" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.1" />

                    {/* Skill Polygon */}
                    <polygon
                      points="50,15 85,35 75,75 25,75 15,35"
                      fill="rgba(242, 182, 0, 0.2)"
                      stroke="#F2B600"
                      strokeWidth="2"
                      className="animate-pulse"
                    />

                    {/* Labels */}
                    <text x="50" y="8" textAnchor="middle" className="text-[5px] fill-blue-200 font-bold uppercase">Writing</text>
                    <text x="95" y="38" textAnchor="middle" className="text-[5px] fill-blue-200 font-bold uppercase">Reading</text>
                    <text x="80" y="85" textAnchor="middle" className="text-[5px] fill-blue-200 font-bold uppercase">Speaking</text>
                    <text x="20" y="85" textAnchor="middle" className="text-[5px] fill-blue-200 font-bold uppercase">Grammar</text>
                    <text x="5" y="38" textAnchor="middle" className="text-[5px] fill-blue-200 font-bold uppercase">Lexical</text>
                  </svg>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-blue-300">Weakness Spotted:</span>
                    <span className="font-black text-accent uppercase">Lexical Resource</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full">
                    <div className="bg-accent w-[40%] h-full rounded-full shadow-[0_0_10px_#F2B600]" />
                  </div>
                </div>
              </div>

              {/* Mission Control */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-primary dark:text-blue-400 uppercase tracking-widest">Mission Control</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">3 Daily Objectives</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { task: "Lexical Sprint", xp: "+50 XP", done: true },
                    { task: "Mock Speaking", xp: "+120 XP", done: false },
                    { task: "Reading S1", xp: "+80 XP", done: false },
                  ].map((m, i) => (
                    <div key={i} className={`p-4 rounded-2xl border ${m.done ? 'bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-800' : 'bg-slate-50 border-slate-100 dark:bg-slate-800/50 dark:border-slate-800'} transition-all cursor-pointer group`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-black uppercase ${m.done ? 'text-green-600' : 'text-slate-400'}`}>{m.task}</span>
                        {m.done ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-200" />}
                      </div>
                      <p className="text-[9px] font-black text-blue-500">{m.xp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { label: "Lexical Sensei", icon: Brain, color: "text-purple-500", bg: "bg-purple-50" },
                  { label: "Grammar Guru", icon: ShieldCheck, color: "text-red-500", bg: "bg-red-50" },
                  { label: "Speed Demon", icon: Target, color: "text-yellow-600", bg: "bg-yellow-50" },
                  { label: "Elite Echo", icon: Mic, color: "text-blue-500", bg: "bg-blue-50" },
                ].map((badge, i) => (
                  <div key={i} className={`p-4 rounded-3xl ${badge.bg} dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center text-center group hover:scale-105 transition-all`}>
                    <badge.icon className={`w-8 h-8 ${badge.color} mb-2 group-hover:rotate-12 transition-transform`} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-white">{badge.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-accent uppercase tracking-widest">Master All Pillars</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Everything you need to score high
              </p>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            >
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                {[
                  {
                    name: "The Simulator",
                    description: "High-fidelity split-screen reading and listening mocks that mimic the real test.",
                    icon: BookOpen,
                  },
                  {
                    name: "AI Writing Lab",
                    description: "Instant feedback on all 4 IELTS criteria with a 'Band 9 Improver' generator.",
                    icon: PenTool,
                  },
                  {
                    name: "Diagnostic Engine",
                    description: "A 15-minute quick assessment to estimate your current band score.",
                    icon: ShieldCheck,
                  },
                  {
                    name: "Error Journal",
                    description: "Track misses and identify patterns in question types like T/F/NG or Matching.",
                    icon: BarChart3,
                  },
                ].map((feature) => (
                  <motion.div key={feature.name} variants={item} className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-primary">
                      <feature.icon className="h-5 w-5 flex-none text-accent" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </motion.div>
                ))}
              </dl>

              {/* Trending Topics Feed */}
              <div className="mt-24 bg-white/5 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400">Trending Exam Topics (Dec 2025)</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {[
                    "AI in Classrooms", "Renewable Energy", "Urban Overcrowding",
                    "Remote Work Ethics", "Space Tourism", "Biodiversity Loss"
                  ].map(topic => (
                    <div key={topic} className="flex items-center gap-2 group cursor-pointer bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl hover:bg-primary transition-all">
                      <div className="w-6 h-6 bg-accent/20 rounded-md flex items-center justify-center text-accent group-hover:bg-white transition-all text-[10px] font-black">#</div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-white transition-all">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Global Pulse: Live Activity Feed */}
              <div className="mt-8 bg-slate-900 rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Mic className="w-24 h-24 text-white" />
                </div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-300">Global Activity Pulse</h3>
                  </div>
                  <span className="text-[10px] font-bold text-white/40 uppercase">1,204 Students Online</span>
                </div>

                <div className="space-y-4">
                  {[
                    { user: "Aleksei V.", action: "scored Band 8.5 in Writing", time: "2m ago" },
                    { user: "Sarah J.", action: "completed 'Sustainable Energy' Mock", time: "5m ago" },
                    { user: "Li Wei", action: "unlocked 'Grammar Guru' Badge", time: "12m ago" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-black text-accent">{activity.user[0]}</div>
                        <div>
                          <p className="text-[11px] font-bold text-white">{activity.user} <span className="font-medium text-blue-100/60">{activity.action}</span></p>
                          <p className="text-[9px] text-white/30 font-bold uppercase">{activity.time}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/20" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mastery Tier Card */}
              <div className="mt-16 bg-gradient-to-br from-slate-900 via-[#013950] to-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 blur-[100px] -mr-48 -mt-48 rounded-full" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-accent/20 border border-accent/30 text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Mastery Level 4</span>
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4].map(i => <Sparkles key={i} className="w-3 h-3 fill-current" />)}
                      </div>
                    </div>
                    <h2 className="text-4xl font-black mb-4 leading-tight">
                      Your Path to <span className="text-accent underline decoration-4 underline-offset-8">Band 9.0</span>
                    </h2>
                    <p className="text-blue-100/70 text-lg mb-8 max-w-md">
                      Top 15% globally. Achieving Elite status will unlock specific University-Ready certificates.
                    </p>
                    <div className="flex gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex-1">
                        <p className="text-[10px] uppercase font-bold text-blue-300 mb-1 tracking-widest">XP Progress</p>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} className="h-full bg-accent" />
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 px-8 text-center">
                        <p className="text-[10px] uppercase font-bold text-blue-300 mb-1 tracking-widest">Rank</p>
                        <p className="text-xl font-black">ELITE</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Grammar Guru", icon: ShieldCheck, color: "text-blue-400" },
                      { label: "Fluency King", icon: Sparkles, color: "text-yellow-400" },
                      { label: "Lexical Ace", icon: BookOpen, color: "text-green-400" },
                      { label: "Speed Demon", icon: Clock, color: "text-purple-400" },
                    ].map((badge) => (
                      <div key={badge.label} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all cursor-pointer group">
                        <div className={`p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform ${badge.color}`}>
                          <badge.icon className="w-8 h-8" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning Ecosystem Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
                <div className="bg-[#013950] rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <GraduationCap className="w-32 h-32" />
                  </div>
                  <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-accent" />
                    Smart Flashcards
                  </h2>
                  <p className="text-blue-100 mb-8 leading-relaxed max-w-sm">
                    Master words using Spaced Repetition (SRS).
                  </p>
                  <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all">
                    Start Practice
                  </button>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Mail className="w-32 h-32 text-primary" />
                  </div>
                  <h2 className="text-2xl font-black mb-4 flex items-center gap-3 text-primary dark:text-blue-400">
                    <Mail className="w-8 h-8 text-accent" />
                    Weekly Digest
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed max-w-sm font-medium">
                    Personalized study tips delivered to your inbox.
                  </p>
                  <div className="flex gap-2">
                    <input type="text" placeholder="your@email.com" className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 flex-1 text-sm outline-none focus:ring-2 focus:ring-primary" />
                    <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                      Join
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-primary py-12 text-white border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-accent" />
            <span className="text-xl font-black uppercase tracking-tighter italic">Antigravity IELTS</span>
          </div>
          <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">
            © 2025 Antigravity AI. 100% Free Forever.
          </p>
        </div>
      </footer>
    </div>
  );
}
