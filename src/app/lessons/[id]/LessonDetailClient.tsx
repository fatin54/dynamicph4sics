'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LESSONS_DATABASE } from '@/data/lessons';
import {
  BookOpen,
  Clock,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Languages,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  FlaskConical,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

// Dynamic import or direct inclusion of simulations
import NewtonLab from '@/components/simulations/NewtonLab';
import FootballLab from '@/components/simulations/FootballLab';
import CollisionLab from '@/components/simulations/CollisionLab';
import FrictionLab from '@/components/simulations/FrictionLab';
import PulleyLab from '@/components/simulations/PulleyLab';
import ImpulseLab from '@/components/simulations/ImpulseLab';
import ProjectileLab from '@/components/simulations/ProjectileLab';
import FallingBodyLab from '@/components/simulations/FallingBodyLab';
import MotionGraphsLab from '@/components/simulations/MotionGraphsLab';
import CircularMotionLab from '@/components/simulations/CircularMotionLab';

export default function LessonDetailClient({ id }: { id: string }) {
  const lesson = LESSONS_DATABASE.find((l) => l.id === id);
  if (!lesson) {
    notFound();
  }

  const [activeLayer, setActiveLayer] = useState<'A' | 'B' | 'C'>('A');
  const [useBangla, setUseBangla] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('hsc_dynamics_progress') || '{}');
        return stored.completedLessons?.includes(lesson.id) || false;
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    try {
      const stored = JSON.parse(localStorage.getItem('hsc_dynamics_progress') || '{}');
      stored.completedLessons = stored.completedLessons || [];
      if (!isBookmarked) {
        if (!stored.completedLessons.includes(lesson.id)) {
          stored.completedLessons.push(lesson.id);
        }
      } else {
        stored.completedLessons = stored.completedLessons.filter((item: string) => item !== lesson.id);
      }
      localStorage.setItem('hsc_dynamics_progress', JSON.stringify(stored));
    } catch (e) {
      // ignore
    }
  };

  // Render the appropriate simulation based on simulationId
  const renderSimulation = () => {
    switch (lesson.simulationId) {
      case 'newton-lab':
        return <NewtonLab />;
      case 'football-lab':
        return <FootballLab />;
      case 'collision-lab':
        return <CollisionLab />;
      case 'friction-lab':
        return <FrictionLab />;
      case 'pulley-lab':
        return <PulleyLab />;
      case 'impulse-lab':
        return <ImpulseLab />;
      case 'projectile-lab':
        return <ProjectileLab />;
      case 'falling-body-lab':
        return <FallingBodyLab />;
      case 'motion-graphs-lab':
        return <MotionGraphsLab />;
      case 'circular-motion-lab':
        return <CircularMotionLab />;
      default:
        return null;
    }
  };

  const currentIndex = LESSONS_DATABASE.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? LESSONS_DATABASE[currentIndex - 1] : null;
  const nextLesson = currentIndex < LESSONS_DATABASE.length - 1 ? LESSONS_DATABASE[currentIndex + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button & Action pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <Link
          href="/lessons"
          className="flex items-center gap-1.5 font-bold text-sand-subtext hover:text-maroon transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to All Lessons</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Bangla toggle */}
          <button
            onClick={() => setUseBangla(!useBangla)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sand-muted border border-sand-border text-sand-text hover:text-orange font-semibold transition-colors"
          >
            <Languages size={13} />
            <span>{useBangla ? 'English View' : 'বাংলায় পড়ুন'}</span>
          </button>

          {/* Bookmark / Complete */}
          <button
            onClick={toggleBookmark}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-bold transition-all ${
              isBookmarked
                ? 'bg-forest-pale border-forest text-forest-deep'
                : 'bg-sand-muted border-sand-border text-sand-subtext hover:text-sand-text'
            }`}
          >
            <Bookmark size={13} className={isBookmarked ? 'fill-forest text-forest' : ''} />
            <span>{isBookmarked ? 'Completed / Saved' : 'Mark as Complete'}</span>
          </button>
        </div>
      </div>

      {/* Lesson Header Title */}
      <div className="border-b border-sand-border pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-orange-deep bg-orange-pale px-2.5 py-0.5 rounded border border-orange-light">
            Textbook Section {lesson.sectionNumber}
          </span>
          <span className="text-xs text-sand-subtext flex items-center gap-1">
            <Clock size={12} />
            {lesson.estimatedMinutes} mins
          </span>
          {lesson.isOfficialChapter3 ? (
            <span className="text-[10px] font-bold text-forest bg-forest-pale px-2 py-0.5 rounded border border-forest-light">
              NCTB Official Chapter 3
            </span>
          ) : (
            <span className="text-[10px] font-bold text-maroon bg-maroon-pale px-2 py-0.5 rounded border border-maroon-light">
              Causes of Motion &amp; Forces Bridge
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-maroon-deep leading-tight">
          {lesson.titleEn}
        </h1>
        <p className="text-sm sm:text-base font-bold text-sand-subtext font-sans">
          {lesson.titleBn}
        </p>
      </div>

      {/* 3-Layer Pedagogical Switcher Bar */}
      <div className="p-1.5 rounded-2xl bg-sand-muted border border-sand-border grid grid-cols-3 gap-1.5 text-xs font-bold">
        <button
          onClick={() => setActiveLayer('A')}
          className={`py-3 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeLayer === 'A'
              ? 'bg-orange text-white shadow-sm'
              : 'text-sand-text hover:text-orange-deep'
          }`}
        >
          <span>Layer A: Intuitive English</span>
          <span className="text-[10px] opacity-80 font-sans font-normal">(সহজভাবে বুঝি)</span>
        </button>

        <button
          onClick={() => setActiveLayer('B')}
          className={`py-3 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeLayer === 'B'
              ? 'bg-maroon text-white shadow-sm'
              : 'text-sand-text hover:text-maroon'
          }`}
        >
          <span>Layer B: HSC Academic</span>
          <span className="text-[10px] opacity-80 font-sans font-normal">(বই অনুযায়ী শিখি)</span>
        </button>

        <button
          onClick={() => setActiveLayer('C')}
          className={`py-3 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeLayer === 'C'
              ? 'bg-forest text-white shadow-sm'
              : 'text-sand-text hover:text-forest'
          }`}
        >
          <span>Layer C: Board Exam Ready</span>
          <span className="text-[10px] opacity-80 font-sans font-normal">(বোর্ড প্রস্তুতি)</span>
        </button>
      </div>

      {/* LAYER A CONTENT: Intuitive English */}
      {activeLayer === 'A' && (
        <div className="p-6 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-6 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-orange-deep font-bold uppercase tracking-wider text-xs">
            <Sparkles size={16} />
            <span>Layer A: Explain It Like I&apos;m 8</span>
          </div>

          <div className="p-4 rounded-xl bg-orange-pale/50 border border-orange-light space-y-2">
            <h3 className="font-bold text-maroon-deep text-sm sm:text-base">
              The Everyday Scenario:
            </h3>
            <p className="text-sand-text">
              {useBangla ? lesson.layerA_Intuitive.banglaScenario : lesson.layerA_Intuitive.everydayScenario}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-maroon-deep text-sm sm:text-base">
              The Core Intuition:
            </h3>
            <p className="text-sand-text">
              {useBangla ? lesson.layerA_Intuitive.banglaCoreIdea : lesson.layerA_Intuitive.coreIdea}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sand-muted border border-sand-border space-y-1">
            <span className="font-bold text-sand-text block">Simple Mental Model:</span>
            <p className="text-sand-subtext">{lesson.layerA_Intuitive.analogy}</p>
          </div>

          <div className="p-4 rounded-xl bg-forest-pale border border-forest-light text-forest-deep flex items-start gap-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-forest" />
            <div>
              <span className="font-bold">Key Takeaway: </span>
              {lesson.layerA_Intuitive.keyObservation}
            </div>
          </div>
        </div>
      )}

      {/* LAYER B CONTENT: HSC Academic */}
      {activeLayer === 'B' && (
        <div className="p-6 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-6 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-maroon-deep font-bold uppercase tracking-wider text-xs">
            <BookOpen size={16} />
            <span>Layer B: Textbook Academic Physics (Shahjahan Tapan Standard)</span>
          </div>

          {/* Formal Definition */}
          <div className="p-4 rounded-xl bg-maroon-pale/40 border border-maroon-light space-y-2">
            <span className="font-bold text-maroon-deep block text-sm">
              Official Definition (সংজ্ঞা):
            </span>
            <p className="text-sand-text">
              {useBangla ? lesson.layerB_Academic.banglaFormalDefinition : lesson.layerB_Academic.formalDefinition}
            </p>
          </div>

          {/* Physical Principle */}
          <div className="space-y-2">
            <span className="font-bold text-maroon-deep block text-sm">
              Governing Physical Principle:
            </span>
            <p className="text-sand-text">
              {lesson.layerB_Academic.physicalPrinciple}
            </p>
          </div>

          {/* Key Equations in KaTeX notation */}
          <div className="p-4 rounded-xl bg-sand-muted border border-sand-border space-y-2">
            <span className="font-bold text-sand-text block">Governing Formulas:</span>
            <div className="space-y-1.5 font-mono text-xs sm:text-sm font-bold text-orange-deep bg-sand-surface p-3 rounded-lg border border-sand-border">
              {lesson.layerB_Academic.keyEquations.map((eq, i) => (
                <div key={i}>{eq}</div>
              ))}
            </div>
          </div>

          {/* Derivation walkthrough if present */}
          {lesson.layerB_Academic.derivation && (
            <div className="p-5 rounded-2xl bg-sand-bg border border-sand-border space-y-4">
              <span className="font-extrabold text-maroon-deep block text-sm">
                Mathematical Derivation: {lesson.layerB_Academic.derivation.title}
              </span>
              <div className="space-y-3">
                {lesson.layerB_Academic.derivation.steps.map((step) => (
                  <div key={step.stepNumber} className="p-3 bg-sand-surface rounded-xl border border-sand-border space-y-1">
                    <span className="text-[11px] font-bold text-sand-subtext">
                      Step {step.stepNumber}: {step.description}
                    </span>
                    <div className="p-2 bg-sand-muted rounded font-mono text-orange-deep font-bold text-xs">
                      {step.latex}
                    </div>
                    <p className="text-[11px] text-sand-subtext">{step.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* LAYER C CONTENT: Board Exam Ready */}
      {activeLayer === 'C' && (
        <div className="p-6 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-6 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-forest-deep font-bold uppercase tracking-wider text-xs">
            <GraduationCap size={16} />
            <span>Layer C: Bangladesh HSC Board Examination Mastery</span>
          </div>

          <div className="p-4 rounded-xl bg-forest-pale/50 border border-forest-light space-y-1">
            <span className="font-bold text-forest-deep block">10-Year Historical Trends:</span>
            <p className="text-sand-text">{lesson.layerC_ExamReady.highFrequencyTrends}</p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-maroon-deep block text-sm">Examiner Marking Tips:</span>
            <ul className="space-y-1.5 pl-5 list-disc text-sand-text">
              {lesson.layerC_ExamReady.examinerTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-maroon-pale border border-maroon-light space-y-1">
            <span className="font-bold text-maroon-deep flex items-center gap-1">
              <AlertTriangle size={14} className="text-maroon" />
              Common Student Traps to Avoid:
            </span>
            <ul className="space-y-1 pl-5 list-disc text-maroon-deep text-xs">
              {lesson.layerC_ExamReady.commonTraps.map((trap, i) => (
                <li key={i}>{trap}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Interactive Simulation Laboratory Section */}
      {lesson.simulationId && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <FlaskConical size={18} className="text-orange" />
            <h2 className="text-lg font-bold text-maroon-deep">
              Interactive Experiment for this Topic
            </h2>
          </div>
          {renderSimulation()}
        </section>
      )}

      {/* Worked Numerical Examples */}
      {lesson.workedExamples.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-maroon-deep flex items-center gap-2">
            <CheckCircle2 size={18} className="text-forest" />
            Worked Numerical Walkthrough
          </h2>

          <div className="space-y-4">
            {lesson.workedExamples.map((ex) => (
              <div key={ex.id} className="p-5 rounded-2xl bg-sand-surface border border-sand-border space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between border-b border-sand-border pb-2">
                  <h3 className="font-bold text-maroon-deep">{ex.title}</h3>
                  <span className="text-[11px] font-mono text-orange-deep font-bold bg-orange-pale px-2 py-0.5 rounded">
                    {ex.formulaUsed}
                  </span>
                </div>

                <p className="text-sand-text font-medium leading-relaxed">
                  {ex.problemStatement}
                </p>

                {/* Given Data Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {ex.givenData.map((d, i) => (
                    <div key={i} className="bg-sand-muted p-2 rounded-lg border border-sand-border text-center">
                      <span className="text-[10px] text-sand-subtext block">{d.description}</span>
                      <span className="font-mono font-bold text-sand-text text-xs">
                        {d.symbol} = {d.value} {d.unit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Solution Steps */}
                <div className="p-3.5 bg-sand-bg rounded-xl border border-sand-border space-y-1.5 font-mono text-xs">
                  <span className="font-sans font-bold text-sand-subtext block text-[11px]">
                    Step-by-Step Mathematical Calculation:
                  </span>
                  {ex.solutionSteps.map((st, i) => (
                    <div key={i} className="text-sand-text flex gap-2">
                      <span className="text-sand-subtext">{i + 1}.</span>
                      <span>{st.step}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-forest-pale border border-forest-light">
                  <span className="font-bold text-forest-deep text-xs">Final Answer:</span>
                  <span className="font-mono font-black text-forest-deep text-sm">{ex.finalAnswer}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Misconceptions Card */}
      {lesson.misconceptions.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-maroon-deep flex items-center gap-2">
            <Lightbulb size={18} className="text-orange" />
            Frequently Confused Misconceptions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.misconceptions.map((misc, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-sand-surface border border-sand-border space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-maroon-pale border border-maroon-light text-maroon-deep">
                  <span className="font-bold block mb-0.5">Common Wrong Belief:</span>
                  <p>{misc.wrongBelief}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-forest-pale border border-forest-light text-forest-deep">
                  <span className="font-bold block mb-0.5">Scientific Reality:</span>
                  <p>{misc.scientificTruth}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Navigation Footer (Prev / Next Lesson) */}
      <div className="pt-8 border-t border-sand-border flex items-center justify-between gap-4">
        {prevLesson ? (
          <Link
            href={`/lessons/${prevLesson.id}`}
            className="flex items-center gap-2 p-3 rounded-xl border border-sand-border bg-sand-surface text-sand-text hover:border-orange text-xs font-semibold"
          >
            <ArrowLeft size={14} />
            <div className="text-left">
              <span className="text-[10px] text-sand-subtext block">Previous</span>
              <span className="font-bold line-clamp-1">{prevLesson.titleEn}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/lessons/${nextLesson.id}`}
            className="flex items-center gap-2 p-3 rounded-xl border border-sand-border bg-sand-surface text-sand-text hover:border-orange text-xs font-semibold"
          >
            <div className="text-right">
              <span className="text-[10px] text-sand-subtext block">Next</span>
              <span className="font-bold line-clamp-1">{nextLesson.titleEn}</span>
            </div>
            <ArrowRight size={14} />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
