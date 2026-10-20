'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LESSONS_DATABASE } from '@/data/lessons';
import { BookOpen, Clock, ArrowRight, ShieldCheck, CheckCircle2, FlaskConical, Award } from 'lucide-react';

export default function LessonsPage() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'ch3' | 'bridge'>('all');

  const chapter3Lessons = LESSONS_DATABASE.filter((l) => l.isOfficialChapter3);
  const bridgeLessons = LESSONS_DATABASE.filter((l) => !l.isOfficialChapter3);

  const displayedLessons =
    filterCategory === 'ch3'
      ? chapter3Lessons
      : filterCategory === 'bridge'
      ? bridgeLessons
      : LESSONS_DATABASE;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-pale text-forest-deep text-xs font-semibold mb-2 border border-forest-light">
            <ShieldCheck size={14} />
            <span>NCTB Approved Curriculum Scope • Physics 1st Paper</span>
          </div>
          <h1 className="text-3xl font-black text-maroon-deep tracking-tight">
            Curriculum Lessons &amp; Study Modules
          </h1>
          <p className="text-xs sm:text-sm text-sand-subtext mt-1 max-w-2xl">
            Textbook-aligned modules with 3 progressive layers: <strong>Layer A (Intuitive)</strong>, <strong>Layer B (HSC Academic)</strong>, and <strong>Layer C (Board Exam Ready)</strong>.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-sand-muted p-1 rounded-xl gap-1 text-xs font-semibold">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterCategory === 'all'
                ? 'bg-maroon text-white shadow-xs'
                : 'text-sand-text hover:text-maroon'
            }`}
          >
            All Lessons ({LESSONS_DATABASE.length})
          </button>
          <button
            onClick={() => setFilterCategory('ch3')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterCategory === 'ch3'
                ? 'bg-maroon text-white shadow-xs'
                : 'text-sand-text hover:text-maroon'
            }`}
          >
            Chapter 3 Official ({chapter3Lessons.length})
          </button>
          <button
            onClick={() => setFilterCategory('bridge')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterCategory === 'bridge'
                ? 'bg-maroon text-white shadow-xs'
                : 'text-sand-text hover:text-maroon'
            }`}
          >
            Chapter 4 Bridge ({bridgeLessons.length})
          </button>
        </div>
      </div>

      {/* Chapter 3 Official Section */}
      {(filterCategory === 'all' || filterCategory === 'ch3') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-sand-border pb-2">
            <div>
              <h2 className="text-xl font-extrabold text-maroon-deep flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange" />
                Chapter 3: Dynamics (গতিবিদ্যা)
              </h2>
              <p className="text-xs text-sand-subtext mt-0.5">
                Prescribed textbook sections: অনুচ্ছেদ ৩.১ হতে ৩.১২ • 10 Class Periods
              </p>
            </div>
            <span className="text-xs font-bold text-forest bg-forest-pale px-2.5 py-1 rounded-lg border border-forest-light">
              Official NCTB Scope
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapter3Lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>
      )}

      {/* Chapter 4 Bridge Section */}
      {(filterCategory === 'all' || filterCategory === 'bridge') && (
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between border-b border-sand-border pb-2">
            <div>
              <h2 className="text-xl font-extrabold text-maroon-deep flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-forest" />
                Chapter 4 Bridge: Causes of Motion &amp; Forces (নিউটনীয় বলবিদ্যা)
              </h2>
              <p className="text-xs text-sand-subtext mt-0.5">
                Connecting Kinematics to Dynamics: Newton&apos;s Laws, Momentum, Collisions, Friction &amp; Pulleys
              </p>
            </div>
            <span className="text-xs font-bold text-orange-deep bg-orange-pale px-2.5 py-1 rounded-lg border border-orange-light">
              Supplementary Bridge
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bridgeLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function LessonCard({ lesson }: { lesson: any }) {
  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className="p-5 rounded-2xl bg-sand-surface border border-sand-border hover:border-orange transition-all hover:shadow-md flex flex-col justify-between group space-y-3"
    >
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-mono font-bold text-orange-deep px-2 py-0.5 rounded bg-orange-pale border border-orange-light">
            Section {lesson.sectionNumber}
          </span>
          <div className="flex items-center gap-1 text-sand-subtext">
            <Clock size={12} />
            <span>{lesson.estimatedMinutes} mins</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-maroon-deep group-hover:text-orange-deep transition-colors leading-snug">
          {lesson.titleEn}
        </h3>
        <p className="text-xs font-semibold text-sand-subtext font-sans mt-0.5">
          {lesson.titleBn}
        </p>

        <p className="text-xs text-sand-subtext mt-2.5 line-clamp-2 leading-relaxed">
          {lesson.layerA_Intuitive.coreIdea}
        </p>
      </div>

      <div className="pt-3 border-t border-sand-border flex items-center justify-between text-xs">
        {lesson.simulationId ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest">
            <FlaskConical size={13} />
            <span>Interactive Lab Included</span>
          </span>
        ) : (
          <span className="text-[11px] text-sand-subtext">3 Pedagogical Layers</span>
        )}

        <span className="flex items-center gap-1 font-bold text-orange-deep group-hover:translate-x-1 transition-transform">
          <span>Start Lesson</span>
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
