'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LESSONS_DATABASE } from '@/data/lessons';
import { Award, BookOpen, CheckCircle2, RotateCcw, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';

export default function ProgressPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, any>>({});

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('hsc_dynamics_progress') || '{}');
      if (stored.completedLessons) setCompletedLessons(stored.completedLessons);
      if (stored.quizScores) setQuizScores(stored.quizScores);
    } catch (e) {
      // ignore
    }
  }, []);

  const totalLessons = LESSONS_DATABASE.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const resetAllProgress = () => {
    if (confirm('Are you sure you want to reset your local study progress?')) {
      localStorage.removeItem('hsc_dynamics_progress');
      setCompletedLessons([]);
      setQuizScores({});
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-pale text-forest-deep text-xs font-semibold mb-2 border border-forest-light">
            <Award size={14} />
            <span>Student Dashboard &amp; Revision</span>
          </div>
          <h1 className="text-3xl font-black text-maroon-deep tracking-tight">
            My Learning Progress &amp; Mastery
          </h1>
          <p className="text-xs sm:text-sm text-sand-subtext mt-1">
            Track completed curriculum lessons, quiz scores, and review weak areas.
          </p>
        </div>

        <button
          onClick={resetAllProgress}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-sand-muted border border-sand-border text-sand-subtext hover:text-maroon transition-colors"
        >
          <RotateCcw size={13} />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* Progress Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-2">
          <span className="text-xs text-sand-subtext font-bold uppercase tracking-wider block">
            Lessons Completed
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-maroon-deep">{completedCount}</span>
            <span className="text-xs text-sand-subtext">/ {totalLessons} Modules</span>
          </div>
          <div className="w-full h-2 bg-sand-muted rounded-full overflow-hidden">
            <div className="h-full bg-orange transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-2">
          <span className="text-xs text-sand-subtext font-bold uppercase tracking-wider block">
            Overall Syllabus Completion
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-forest-deep">{progressPercent}%</span>
            <span className="text-xs text-forest font-semibold">
              {progressPercent === 100 ? 'Mastered!' : 'In Progress'}
            </span>
          </div>
          <p className="text-[11px] text-sand-subtext">
            {totalLessons - completedCount} lessons remaining to complete
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-2">
          <span className="text-xs text-sand-subtext font-bold uppercase tracking-wider block">
            Latest Quiz Score
          </span>
          {quizScores['hsc-chapter3-mixed'] ? (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-orange-deep">
                {quizScores['hsc-chapter3-mixed'].correct} / {quizScores['hsc-chapter3-mixed'].total}
              </span>
              <span className="text-xs text-sand-subtext font-semibold">
                ({Math.round((quizScores['hsc-chapter3-mixed'].correct / quizScores['hsc-chapter3-mixed'].total) * 100)}%)
              </span>
            </div>
          ) : (
            <div className="text-xs text-sand-subtext py-2">
              No quiz attempted yet.{' '}
              <Link href="/quiz" className="text-orange font-bold hover:underline">
                Take a Quiz &rarr;
              </Link>
            </div>
          )}
          <p className="text-[11px] text-sand-subtext">HSC Chapter 3 Mixed Assessment</p>
        </div>
      </div>

      {/* Checklist of Curriculum Lessons */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-maroon-deep flex items-center gap-2">
          <BookOpen size={18} className="text-orange" />
          Lesson Checklist &amp; Revision Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LESSONS_DATABASE.map((lesson) => {
            const isDone = completedLessons.includes(lesson.id);
            return (
              <Link
                key={lesson.id}
                href={`/lessons/${lesson.id}`}
                className={`p-4 rounded-xl border flex items-center justify-between text-xs transition-all ${
                  isDone
                    ? 'bg-forest-pale/40 border-forest-light'
                    : 'bg-sand-surface border-sand-border hover:border-orange'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    isDone ? 'bg-forest text-white' : 'bg-sand-muted text-sand-subtext border border-sand-border'
                  }`}>
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sand-text line-clamp-1">{lesson.titleEn}</h4>
                    <span className="text-[10px] text-sand-subtext">Section {lesson.sectionNumber}</span>
                  </div>
                </div>

                <span className="text-orange-deep font-bold text-[11px] flex items-center gap-1 shrink-0 ml-2">
                  <span>{isDone ? 'Review' : 'Study'}</span>
                  <ArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
