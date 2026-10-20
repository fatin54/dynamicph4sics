'use client';

import React, { useState } from 'react';
import { CREATIVE_QUESTIONS } from '@/data/creativeQuestions';
import { CreativeQuestionItem } from '@/types';
import { Compass, Lightbulb, CheckCircle2, ChevronRight, BookOpen, Award, Languages } from 'lucide-react';

export default function GuidedCQSolver() {
  const [selectedCQ, setSelectedCQ] = useState<CreativeQuestionItem>(CREATIVE_QUESTIONS[0]);
  const [activePartIndex, setActivePartIndex] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [useBangla, setUseBangla] = useState<boolean>(false);

  const activePart = selectedCQ.parts[activePartIndex];

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-maroon text-white">
              <Compass size={18} />
            </span>
            <h2 className="text-xl font-bold text-maroon-deep">
              Guided Creative Question (CQ) Solver
            </h2>
          </div>
          <p className="text-xs text-sand-subtext mt-1">
            Master the 4-tier HSC exam structure: (ক) Knowledge, (খ) Comprehension, (গ) Application, and (ঘ) Higher Ability
          </p>
        </div>

        {/* Language toggle */}
        <button
          onClick={() => setUseBangla(!useBangla)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sand-muted border border-sand-border text-sand-text hover:text-orange transition-colors"
        >
          <Languages size={14} />
          <span>{useBangla ? 'English View' : 'বাংলায় দেখুন'}</span>
        </button>
      </div>

      {/* Select CQ Scenario */}
      <div className="mb-6">
        <label className="text-xs font-bold text-sand-subtext uppercase tracking-wider block mb-2">
          Select Board CQ Problem:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CREATIVE_QUESTIONS.map((cq) => {
            const isSelected = cq.id === selectedCQ.id;
            return (
              <button
                key={cq.id}
                onClick={() => {
                  setSelectedCQ(cq);
                  setActivePartIndex(0);
                  setShowHint(false);
                  setShowModelAnswer(false);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-maroon-pale border-maroon text-maroon-deep font-bold shadow-xs'
                    : 'bg-sand-muted border-sand-border text-sand-text hover:border-orange'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="px-2 py-0.5 rounded bg-white text-maroon font-bold text-[10px] border border-maroon-light">
                    {cq.board} Board {cq.year}
                  </span>
                  <span className="text-[11px] text-sand-subtext">{cq.scenarioType}</span>
                </div>
                <p className="text-xs font-semibold line-clamp-2">
                  {useBangla ? cq.stemBn : cq.stemEn}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Stimulus / Stem Card */}
      <div className="p-4 rounded-xl bg-sand-bg border-l-4 border-l-maroon border border-sand-border mb-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-maroon-deep block mb-1">
          {useBangla ? 'উদ্দীপক (Stimulus / Scenario):' : 'Stimulus / Scenario:'}
        </span>
        <p className="text-xs leading-relaxed text-sand-text">
          {useBangla ? selectedCQ.stemBn : selectedCQ.stemEn}
        </p>
        <span className="text-[10px] text-sand-subtext block mt-2">
          Source: {selectedCQ.sourceReference}
        </span>
      </div>

      {/* 4-Part Tab Strip (ক, খ, গ, ঘ) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {selectedCQ.parts.map((p, idx) => {
          const isSelected = activePartIndex === idx;
          return (
            <button
              key={p.part}
              onClick={() => {
                setActivePartIndex(idx);
                setShowHint(false);
                setShowModelAnswer(false);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-orange text-white border-orange-deep shadow-sm'
                  : 'bg-sand-muted text-sand-text border-sand-border hover:border-orange'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-0.5">
                <span className="font-bold">{useBangla ? p.labelBn : p.labelEn}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isSelected ? 'bg-orange-deep text-white' : 'bg-sand-surface text-sand-subtext'
                }`}>
                  {p.marks} {p.marks === 1 ? 'Mark' : 'Marks'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Question Part Workspace */}
      <div className="p-5 rounded-2xl bg-sand-muted border border-sand-border space-y-5">
        <div>
          <span className="text-[11px] font-bold text-orange-deep uppercase tracking-wider block mb-1">
            Question Prompt:
          </span>
          <h3 className="text-sm sm:text-base font-bold text-maroon-deep">
            {useBangla ? activePart.questionBn : activePart.questionEn}
          </h3>
        </div>

        {/* Socratic Guiding Steps */}
        <div className="p-3.5 rounded-xl bg-sand-surface border border-sand-border space-y-2">
          <span className="text-xs font-bold text-sand-text flex items-center gap-1.5">
            <Lightbulb size={14} className="text-orange" />
            Examiner Guiding Path: How to Think Through This:
          </span>
          <ul className="space-y-1 text-xs text-sand-subtext pl-5 list-disc">
            {activePart.guidingQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>

        {/* Formula hint if applicable */}
        {activePart.keyFormula && (
          <div className="p-3 rounded-xl bg-sand-surface border border-sand-border flex items-center justify-between text-xs">
            <span className="text-sand-subtext font-semibold">Required Formula:</span>
            <code className="font-mono text-orange-deep font-bold bg-orange-pale px-2 py-1 rounded">
              {activePart.keyFormula}
            </code>
          </div>
        )}

        {/* Action Buttons: Hint & Model Answer */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-sand-surface border border-sand-border text-sand-text hover:border-orange hover:text-orange-deep transition-colors"
          >
            <Lightbulb size={14} className="text-orange" />
            <span>{showHint ? 'Hide Guidance' : 'Reveal Step Hint'}</span>
          </button>

          <button
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-orange hover:bg-orange-deep text-white shadow-sm transition-colors"
          >
            <CheckCircle2 size={14} />
            <span>{showModelAnswer ? 'Hide Model Solution' : 'Reveal Model Answer & Marking Scheme'}</span>
          </button>
        </div>

        {/* Hint Accordion */}
        {showHint && (
          <div className="p-4 rounded-xl bg-orange-pale border border-orange-light text-xs text-orange-deep space-y-1">
            <span className="font-bold block">Examiner Guidance:</span>
            <p className="leading-relaxed">
              Break down the calculation step-by-step. Remember that units must be stated explicitly. Do not round numbers prematurely before the final step.
            </p>
          </div>
        )}

        {/* Model Answer & Marking Scheme */}
        {showModelAnswer && (
          <div className="p-5 rounded-xl bg-forest-pale border border-forest-light text-xs space-y-4">
            <div>
              <span className="font-bold text-forest-deep uppercase tracking-wider block mb-1">
                Official Model Answer:
              </span>
              <p className="text-forest-deep leading-relaxed bg-white p-3.5 rounded-lg border border-forest-light font-medium">
                {useBangla ? activePart.modelAnswerBn : activePart.modelAnswerEn}
              </p>
            </div>

            {/* Marking Criteria Table */}
            <div>
              <span className="font-bold text-forest-deep uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Award size={13} className="text-forest" />
                Examiner Marking Scheme (নাম্বার বণ্টন):
              </span>
              <div className="space-y-1.5">
                {activePart.markingCriteria.map((crit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-forest-light text-sand-text"
                  >
                    <span>{crit.condition}</span>
                    <span className="font-bold text-forest ml-3 shrink-0">
                      +{crit.mark} {crit.mark === 1 ? 'Mark' : 'Marks'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
