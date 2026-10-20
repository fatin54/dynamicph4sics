'use client';

import React, { useState } from 'react';
import { BOARD_QUESTIONS } from '@/data/boardQuestions';
import { BoardQuestion, QuestionSourceCategory } from '@/types';
import {
  GraduationCap,
  Search,
  Filter,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
  Languages,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Compass,
} from 'lucide-react';

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [useBangla, setUseBangla] = useState<boolean>(false);

  // Expanded states for hints & solutions
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [selectedMCQAnswers, setSelectedMCQAnswers] = useState<Record<string, string>>({});

  const topics = [
    { id: 'all', labelEn: 'All Topics', labelBn: 'সকল অধ্যায় ও টপিক' },
    { id: 'topic-projectile', labelEn: 'Projectile Motion (প্রাস)', labelBn: 'প্রাসের গতি' },
    { id: 'topic-ref-frames', labelEn: 'Relative Velocity (আপেক্ষিক বেগ)', labelBn: 'আপেক্ষিক বেগ ও প্রসঙ্গ কাঠামো' },
    { id: 'topic-linear-equations', labelEn: 'Linear Kinematics (সরলরৈখিক গতি)', labelBn: 'সুষম ত্বরণে সরলরৈখিক গতি' },
    { id: 'topic-calculus-motion', labelEn: 'Calculus in Dynamics', labelBn: 'গতি বর্ণনায় ক্যালকুলাস' },
    { id: 'topic-falling-bodies', labelEn: 'Falling Bodies & Balloons', labelBn: 'পড়ন্ত বস্তু ও খাড়া গতি' },
    { id: 'topic-motion-graphs', labelEn: 'Motion Graphs (s-t, v-t)', labelBn: 'বেগ-সময় লেখচিত্র' },
    { id: 'topic-circular-motion', labelEn: 'Circular Motion (বৃত্তাকার গতি)', labelBn: 'সুষম বৃত্তাকার গতি' },
  ];

  const toggleHint = (id: string) => {
    setExpandedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectMCQ = (qId: string, optKey: string) => {
    setSelectedMCQAnswers((prev) => ({ ...prev, [qId]: optKey }));
    setExpandedSolutions((prev) => ({ ...prev, [qId]: true }));
  };

  const filteredQuestions = BOARD_QUESTIONS.filter((q) => {
    // Source filter
    const matchesSource =
      selectedSource === 'all' ||
      (selectedSource === 'board' && q.sourceCategory === 'Official Board Exam') ||
      (selectedSource === 'ishak' && (q.sourceCategory === 'Ishak Sir Textbook Reference' || q.sourceCategory === 'Independently Written Practice')) ||
      (selectedSource === 'admission' && q.sourceCategory === 'Admission & Top College');

    // Topic filter
    const matchesTopic = selectedTopic === 'all' || q.topicId === selectedTopic;

    // Type filter
    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'MCQ' ? q.questionType === 'MCQ' : q.questionType !== 'MCQ');

    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;

    // Search query
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      q.questionEn.toLowerCase().includes(term) ||
      q.questionBn.includes(term) ||
      q.board.toLowerCase().includes(term) ||
      q.sourceReference.toLowerCase().includes(term);

    return matchesSource && matchesTopic && matchesType && matchesDifficulty && matchesSearch;
  });

  const countBoard = BOARD_QUESTIONS.filter((q) => q.sourceCategory === 'Official Board Exam').length;
  const countIshak = BOARD_QUESTIONS.filter((q) => q.sourceCategory === 'Ishak Sir Textbook Reference' || q.sourceCategory === 'Independently Written Practice').length;
  const countAdmission = BOARD_QUESTIONS.filter((q) => q.sourceCategory === 'Admission & Top College').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-maroon-pale text-maroon-deep text-xs font-semibold mb-2 border border-maroon-light">
            <GraduationCap size={14} />
            <span>NCTB Standard Comprehensive Question Bank • Chapter 3 Dynamics</span>
          </div>
          <h1 className="text-3xl font-black text-maroon-deep tracking-tight">
            Dynamics Question &amp; Problem Archive
          </h1>
          <p className="text-xs sm:text-sm text-sand-subtext mt-1 max-w-2xl">
            Curated examination and exercise problems: Authentic 10-year HSC Board papers (Dhaka, Cumilla, Rajshahi) alongside benchmark conceptual problems inspired by <strong>Prof. Dr. Mohammad Ishaque &amp; Prof. Md. Amir Hossain Khan</strong>.
          </p>
        </div>

        {/* Language switch */}
        <button
          onClick={() => setUseBangla(!useBangla)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sand-surface border border-sand-border text-sand-text hover:text-orange transition-colors shadow-2xs"
        >
          <Languages size={14} />
          <span>{useBangla ? 'English View' : 'বাংলায় দেখুন'}</span>
        </button>
      </div>

      {/* Source Category Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-sand-muted p-1.5 rounded-2xl border border-sand-border text-xs font-bold">
        <button
          onClick={() => setSelectedSource('all')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            selectedSource === 'all'
              ? 'bg-maroon text-white shadow-xs'
              : 'text-sand-text hover:text-maroon'
          }`}
        >
          All Sources ({BOARD_QUESTIONS.length})
        </button>

        <button
          onClick={() => setSelectedSource('board')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
            selectedSource === 'board'
              ? 'bg-forest text-white shadow-xs'
              : 'text-sand-text hover:text-forest'
          }`}
        >
          <ShieldCheck size={14} />
          <span>Official Board Exams ({countBoard})</span>
        </button>

        <button
          onClick={() => setSelectedSource('ishak')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
            selectedSource === 'ishak'
              ? 'bg-orange text-white shadow-xs'
              : 'text-sand-text hover:text-orange-deep'
          }`}
        >
          <BookOpen size={14} />
          <span>Ishak Sir Curriculum Benchmarks ({countIshak})</span>
        </button>

        <button
          onClick={() => setSelectedSource('admission')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
            selectedSource === 'admission'
              ? 'bg-maroon-deep text-white shadow-xs'
              : 'text-sand-text hover:text-maroon'
          }`}
        >
          <Award size={14} />
          <span>BUET &amp; Elite Admission ({countAdmission})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 bg-sand-muted p-4 rounded-2xl border border-sand-border">
        {/* Search Input */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-subtext" />
          <input
            type="text"
            placeholder="Search questions by topic, keyword, or citation (e.g. 'rain', 'umbrella', 'balloon', 'metro', 'wall')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sand-surface border border-sand-border text-xs text-sand-text focus:outline-hidden focus:border-orange shadow-2xs"
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Topic Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-sand-subtext font-semibold shrink-0">Topic:</span>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-sand-surface border border-sand-border text-xs font-semibold text-sand-text focus:outline-hidden"
            >
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {useBangla ? t.labelBn : t.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-sand-subtext font-semibold shrink-0">Format:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-sand-surface border border-sand-border text-xs font-semibold text-sand-text focus:outline-hidden"
            >
              <option value="all">All Formats (MCQ &amp; CQ)</option>
              <option value="MCQ">Multiple Choice (MCQ)</option>
              <option value="CQ">Creative / Numerical (CQ)</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-sand-subtext font-semibold shrink-0">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-sand-surface border border-sand-border text-xs font-semibold text-sand-text focus:outline-hidden"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="Easy">Easy (Recall &amp; Direct Formula)</option>
              <option value="Medium">Medium (Standard Board Standard)</option>
              <option value="Hard">Hard (Multi-Step &amp; Algebraic)</option>
              <option value="Admission">Admission (Elite Challenge)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-sand-border/50 text-[11px] text-sand-subtext">
          <span>Active filter query results:</span>
          <span className="font-bold text-sand-text">
            Showing {filteredQuestions.length} of {BOARD_QUESTIONS.length} curated questions
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-sand-surface border border-sand-border space-y-2">
            <p className="font-bold text-sand-text text-sm">No matching questions found.</p>
            <p className="text-xs text-sand-subtext">Try clearing your filters or searching with a broader keyword.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isHintOpen = expandedHints[q.id];
            const isSolutionOpen = expandedSolutions[q.id];
            const userMCQChoice = selectedMCQAnswers[q.id];

            const isIshakReference =
              q.sourceCategory === 'Ishak Sir Textbook Reference' ||
              q.sourceCategory === 'Independently Written Practice';

            return (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-4 text-xs sm:text-sm transition-all"
              >
                {/* Question Top Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-border pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-white font-bold text-xs ${
                        isIshakReference
                          ? 'bg-orange'
                          : q.board === 'BUET Admission Test'
                          ? 'bg-maroon-deep'
                          : 'bg-maroon'
                      }`}
                    >
                      {q.board} {q.year}
                    </span>

                    <span className="px-2 py-0.5 rounded bg-sand-muted border border-sand-border font-semibold text-[11px] text-sand-text">
                      {q.questionType === 'MCQ' ? 'MCQ (1 Mark)' : `Creative / Numerical (${q.marks} Marks)`}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        q.difficulty === 'Easy'
                          ? 'bg-forest-pale text-forest-deep'
                          : q.difficulty === 'Medium'
                          ? 'bg-orange-pale text-orange-deep'
                          : 'bg-maroon-pale text-maroon-deep'
                      }`}
                    >
                      {q.difficulty} Level
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-semibold flex items-center gap-1 ${
                      isIshakReference
                        ? 'text-orange-deep'
                        : q.board === 'BUET Admission Test'
                        ? 'text-maroon'
                        : 'text-forest'
                    }`}
                  >
                    {isIshakReference ? (
                      <BookOpen size={13} className="text-orange" />
                    ) : (
                      <ShieldCheck size={13} />
                    )}
                    <span>{q.verificationStatus}</span>
                  </span>
                </div>

                {/* Question Statement */}
                <div className="space-y-1.5">
                  <p className="font-bold text-sand-text text-sm sm:text-base leading-relaxed">
                    {useBangla ? q.questionBn : q.questionEn}
                  </p>
                  <p className="text-[11px] text-sand-subtext italic">
                    Source Attribution: {q.sourceReference}
                  </p>
                </div>

                {/* MCQ Options if present */}
                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map((opt) => {
                      let optStyle = 'bg-sand-muted border-sand-border text-sand-text hover:border-orange';
                      if (userMCQChoice) {
                        if (opt.key === q.correctOptionKey) {
                          optStyle = 'bg-forest-pale border-forest text-forest-deep font-bold';
                        } else if (userMCQChoice === opt.key && opt.key !== q.correctOptionKey) {
                          optStyle = 'bg-maroon-pale border-maroon text-maroon-deep font-bold';
                        } else {
                          optStyle = 'bg-sand-muted border-sand-border text-sand-subtext opacity-50';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectMCQ(q.id, opt.key)}
                          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 text-xs transition-all ${optStyle}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-sand-surface border border-sand-border flex items-center justify-center font-bold text-[11px] shrink-0">
                            {opt.key}
                          </span>
                          <span>{useBangla ? opt.textBn : opt.textEn}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Formula reference */}
                {q.relevantFormulaLatex && (
                  <div className="p-3 rounded-xl bg-sand-bg border border-sand-border flex items-center justify-between text-xs">
                    <span className="text-sand-subtext font-semibold">Governing Equation:</span>
                    <code className="font-mono text-orange-deep font-bold bg-orange-pale px-2 py-0.5 rounded text-[11px]">
                      {q.relevantFormulaLatex}
                    </code>
                  </div>
                )}

                {/* Staged Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => toggleHint(q.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sand-muted hover:bg-sand-border border border-sand-border text-sand-text transition-colors"
                  >
                    <Lightbulb size={14} className="text-orange" />
                    <span>{isHintOpen ? 'Hide Hint' : 'Reveal Hint (ইঙ্গিত)'}</span>
                  </button>

                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-orange hover:bg-orange-deep text-white shadow-xs transition-colors"
                  >
                    <CheckCircle2 size={14} />
                    <span>{isSolutionOpen ? 'Hide Model Solution' : 'Reveal Full Solution & Rubric'}</span>
                  </button>
                </div>

                {/* Revealed Hint Card */}
                {isHintOpen && (
                  <div className="p-4 rounded-xl bg-orange-pale/60 border border-orange-light text-xs text-orange-deep space-y-1">
                    <span className="font-bold block">Conceptual Hint:</span>
                    <p className="leading-relaxed">
                      {useBangla ? q.hintBn : q.hintEn}
                    </p>
                  </div>
                )}

                {/* Revealed Full Solution Card */}
                {isSolutionOpen && (
                  <div className="p-5 rounded-xl bg-forest-pale/60 border border-forest-light text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-forest-light pb-2">
                      <span className="font-bold text-forest-deep uppercase tracking-wider text-[11px]">
                        Step-by-Step Mathematical Solution:
                      </span>
                      <span className="font-mono font-black text-forest-deep text-sm">
                        {useBangla ? q.finalAnswerBn : q.finalAnswerEn}
                      </span>
                    </div>

                    <div className="space-y-1.5 font-mono text-xs text-sand-text bg-white p-3.5 rounded-lg border border-forest-light">
                      {(useBangla ? q.solutionStepsBn : q.solutionStepsEn).map((step, idx) => (
                        <div key={idx} className="flex gap-2 leading-relaxed">
                          <span className="text-sand-subtext select-none">{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-[11px] text-forest-deep flex items-start gap-1.5">
                      <Award size={14} className="mt-0.5 shrink-0 text-forest" />
                      <span><strong>Examiner Advice:</strong> {q.examinerMarkingTips}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
