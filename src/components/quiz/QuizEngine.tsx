'use client';

import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '@/data/quizzes';
import { QuizQuestion } from '@/types';
import { CheckCircle2, XCircle, RotateCcw, Clock, Award, ChevronRight, Lightbulb, Languages } from 'lucide-react';

export default function QuizEngine() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [useBangla, setUseBangla] = useState<boolean>(false);

  // Timer
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && !isFinished && !showExplanation) {
      interval = setInterval(() => {
        setTimeRemaining((t) => {
          if (t <= 1) {
            handleTimeUp();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isFinished, showExplanation, currentIndex]);

  const handleTimeUp = () => {
    setShowExplanation(true);
  };

  const handleSelectOption = (key: string) => {
    if (showExplanation) return;
    setSelectedKey(key);
    setShowExplanation(true);

    const chosen = currentQ.options.find((o) => o.key === key);
    if (chosen?.isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedKey(null);
      setShowExplanation(false);
      setShowHint(false);
      setTimeRemaining(60);
    } else {
      setIsFinished(true);
      // Save quiz attempt to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('hsc_dynamics_progress') || '{}');
        stored.quizScores = stored.quizScores || {};
        stored.quizScores['hsc-chapter3-mixed'] = {
          correct: score + (selectedKey && currentQ.options.find(o => o.key === selectedKey)?.isCorrect ? 1 : 0),
          total: QUIZ_QUESTIONS.length,
          timestamp: Date.now(),
        };
        localStorage.setItem('hsc_dynamics_progress', JSON.stringify(stored));
      } catch (e) {
        // ignore storage errors
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedKey(null);
    setShowExplanation(false);
    setShowHint(false);
    setScore(0);
    setIsFinished(false);
    setTimeRemaining(60);
  };

  if (isFinished) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="bg-sand-surface rounded-2xl border border-sand-border p-8 shadow-sm text-center max-w-xl mx-auto space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-orange-pale text-orange-deep mx-auto flex items-center justify-center">
          <Award size={36} />
        </div>

        <h3 className="text-2xl font-bold text-maroon-deep">Practice Quiz Completed!</h3>
        <p className="text-xs text-sand-subtext">
          HSC Physics 1st Paper • Chapter 3 Dynamics Mastery Assessment
        </p>

        <div className="p-5 rounded-2xl bg-sand-muted border border-sand-border flex justify-around">
          <div>
            <span className="text-[11px] text-sand-subtext block">Score</span>
            <span className="text-2xl font-black text-forest-deep">
              {score} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-sand-subtext block">Accuracy</span>
            <span className="text-2xl font-black text-orange-deep">{pct}%</span>
          </div>
          <div>
            <span className="text-[11px] text-sand-subtext block">Board Grade</span>
            <span className="text-2xl font-black text-maroon-deep">
              {pct >= 80 ? 'A+' : pct >= 70 ? 'A' : pct >= 60 ? 'A-' : pct >= 50 ? 'B' : 'Revision Needed'}
            </span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange hover:bg-orange-deep text-white font-bold text-xs shadow-sm transition-colors"
        >
          <RotateCcw size={15} />
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-6 shadow-sm">
      {/* Quiz Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-lg bg-maroon text-white font-mono font-bold text-xs">
            Q {currentIndex + 1} of {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-forest-pale text-forest-deep border border-forest-light">
            {currentQ.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sand-muted border border-sand-border text-xs font-mono">
            <Clock size={13} className="text-orange" />
            <span className={timeRemaining <= 10 ? 'text-maroon font-bold animate-pulse' : 'text-sand-text'}>
              {timeRemaining}s
            </span>
          </div>

          {/* Bangla toggle */}
          <button
            onClick={() => setUseBangla(!useBangla)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs bg-sand-muted text-sand-text hover:text-orange border border-sand-border"
          >
            <Languages size={13} />
            <span>{useBangla ? 'ENG' : 'বাংলা'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-sand-muted rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-orange transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question Prompt */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-bold text-sand-text leading-snug">
          {useBangla ? currentQ.questionBn : currentQ.questionEn}
        </h3>
      </div>

      {/* Options List */}
      <div className="space-y-2.5 mb-6">
        {currentQ.options.map((opt) => {
          let btnStyle = 'bg-sand-muted border-sand-border text-sand-text hover:border-orange';
          if (showExplanation) {
            if (opt.isCorrect) {
              btnStyle = 'bg-forest-pale border-forest text-forest-deep font-bold';
            } else if (selectedKey === opt.key && !opt.isCorrect) {
              btnStyle = 'bg-maroon-pale border-maroon text-maroon-deep font-bold';
            } else {
              btnStyle = 'bg-sand-muted border-sand-border text-sand-subtext opacity-50';
            }
          }

          return (
            <button
              key={opt.key}
              disabled={showExplanation}
              onClick={() => handleSelectOption(opt.key)}
              className={`w-full p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${btnStyle}`}
            >
              <span className="w-6 h-6 rounded-lg bg-sand-surface border border-sand-border flex items-center justify-center font-bold text-xs shrink-0">
                {opt.key}
              </span>
              <div className="flex-1 text-xs sm:text-sm">
                <span>{opt.text}</span>
                {showExplanation && (
                  <p className="mt-1.5 text-xs text-sand-subtext font-normal">
                    {opt.explanation}
                  </p>
                )}
              </div>
              {showExplanation && opt.isCorrect && (
                <CheckCircle2 size={18} className="text-forest shrink-0 mt-0.5" />
              )}
              {showExplanation && selectedKey === opt.key && !opt.isCorrect && (
                <XCircle size={18} className="text-maroon shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 text-xs font-semibold text-sand-subtext hover:text-orange"
        >
          <Lightbulb size={14} className="text-orange" />
          <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
        </button>

        {showExplanation && (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange hover:bg-orange-deep text-white font-bold text-xs shadow-sm transition-colors"
          >
            <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'View Results' : 'Next Question'}</span>
            <ChevronRight size={15} />
          </button>
        )}
      </div>

      {/* Hint Box */}
      {showHint && (
        <div className="mt-4 p-3.5 rounded-xl bg-orange-pale border border-orange-light text-xs text-orange-deep">
          <span className="font-bold block mb-0.5">Hint:</span>
          <p>{currentQ.hint}</p>
        </div>
      )}
    </div>
  );
}
