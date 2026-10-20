'use client';

import React from 'react';
import AITutorChat from '@/components/tutor/AITutorChat';

export default function TutorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-1 mb-6">
        <h1 className="text-3xl font-black text-maroon-deep">
          Your Personal Physics AI Tutor
        </h1>
        <p className="text-xs text-sand-subtext">
          Socratic explanations, bilingual support, step-by-step math, and offline guaranteed responses
        </p>
      </div>

      <AITutorChat />
    </div>
  );
}
