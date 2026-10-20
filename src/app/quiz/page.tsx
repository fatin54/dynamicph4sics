'use client';

import React from 'react';
import QuizEngine from '@/components/quiz/QuizEngine';

export default function QuizPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
        <h1 className="text-3xl font-black text-maroon-deep">
          HSC Dynamics Practice Examination
        </h1>
        <p className="text-xs text-sand-subtext">
          Timed Multiple-Choice Practice with Instant Rationale &amp; Difficulty Progression
        </p>
      </div>

      <QuizEngine />
    </div>
  );
}
