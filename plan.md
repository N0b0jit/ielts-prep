# IELTS Preparation Platform - Project Plan

## 1. Vision
A 100% free, AI-powered IELTS preparation platform that mimics the official computer-delivered test environment and provides professional-grade feedback using Gemini AI.

## 2. Technical Stack
- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, Framer Motion (for smooth transitions), Lucide React (for iconography).
- **Backend/Database**: Supabase (Authentication, User Profiles, Test Results, Error Journal).
- **AI Engine**: Gemini 1.5 Flash API (via Google AI SDK).
- **Hosting**: Vercel (recommended).

## 3. Core Features & Architecture

### A. The Diagnostic Engine
- **Goal**: Quick 15-minute assessment.
- **Reading**: 1-2 passages with 10-12 questions.
- **Listening**: 1-2 audio clips with 10 questions.
- **Logic**: Automated scoring based on answer keys, mapped to IELTS Band Scores.

### B. AI Writing Lab
- **UI**: Clean text editor with word count and timer.
- **Analysis**: Gemini API evaluates based on:
  1. Task Response / Achievement
  2. Coherence and Cohesion
  3. Lexical Resource
  4. Grammatical Range and Accuracy
- **"Band 9 Improver"**: Generates a model answer based on the user's input, retaining their original ideas but polishing language.

### C. The Simulator (Reading UI)
- **Layout**: 
  - Left Panel: Sticky text scroll.
  - Right Panel: Questions scroll independently.
- **Interactions**: Highlight text, basic note-taking (simulated).

### D. The Error Journal
- **Tracking**: Logs every incorrect answer type (e.g., T/F/NG, Matching Headings, Multiple Choice).
- **Visualization**: A "Weakness Chart" using Recharts or simple CSS bars.

## 4. Database Schema (Supabase)
- `profiles`: user_id, email, full_name, target_band.
- `test_results`: result_id, user_id, test_type (Diagnostic/Full), band_score, detailed_scores (L/R/W/S).
- `error_journal`: entry_id, user_id, question_type, date, test_id.
- `saved_essays`: essay_id, user_id, prompt, body, ai_feedback.

## 5. Development Roadmap

### Phase 1: Foundation (Current)
- [x] Scaffold Next.js project.
- [ ] Research & implement IELTS brand guidelines (typography/colors).
- [ ] Basic Layout & Navigation.

### Phase 2: Core Components
- [ ] Build Split-Screen Simulator UI.
- [ ] Create Diagnostic Logic Engine.
- [ ] Form-based Writing Lab.

### Phase 3: AI & Backend
- [ ] Integrate Supabase Auth.
- [ ] Connect Gemini 1.5 Flash for Writing Analysis.
- [ ] Implement Error Journaling logic.

### Phase 4: Polish & Deployment
- [x] Add animations with Framer Motion.
- [x] Final UI/UX pass for "Elite" feel.
- [ ] Deployment to Vercel/Local Preview.

## 6. Advanced "Elite" Roadmap

### Phase 5: Multimedia AI
- [ ] **AI Speaking Coach**: Audio recording + Gemini analysis for fluency & pronunciation.
- [ ] **Task 1 Visual Analyzer**: Multimodal analysis of graphs/charts via photo upload.
- [ ] **Interactive Listening**: Mock listening tests with live transcripts.

### Phase 6: Intelligence & Personalization
- [x] **Smart Vocab Gap-Filler**: Real-time Band 9 synonym suggestions in Writing Lab.
- [ ] **AI Study Plan**: Dynamic 30-day roadmap generated from diagnostic errors.
- [ ] **Mock Mode**: Full-length timed simulation with browser focus tracking.

## 7. Enterprise-Grade Ecosystem

### Phase 7: Interactive Mastery
- [ ] **Reading Highlighter**: Real-time selection highlighting & sticky notes in Simulator.
- [ ] **AI Invigilator (Tutor Chat)**: Floating AI assistant for instant question clarification.
- [ ] **Spaced Repetition Flashcards**: Memorization system for Lexical Booster words.

### Phase 8: Progress & Retention
- [ ] **Progress Analytics**: Multi-module line charts for trend tracking.
- [ ] **PDF & Email Reports**: Professional performance certificates and automated summaries.
- [ ] **Branded Print System**: Print-friendly layouts for all essay feedback.
