'use client';

import React from 'react';
import { SOURCE_REGISTER } from '@/data/sources';
import { BookOpen, ShieldCheck, CheckCircle2, FileText, Database, Info } from 'lucide-react';

export default function SourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sand-border pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-pale text-forest-deep text-xs font-semibold border border-forest-light">
          <ShieldCheck size={14} />
          <span>Curriculum Integrity &amp; Source Register</span>
        </div>
        <h1 className="text-3xl font-black text-maroon-deep tracking-tight">
          Academic Sources &amp; Textbook Register
        </h1>
        <p className="text-xs sm:text-sm text-sand-subtext max-w-3xl leading-relaxed">
          Transparent documentation of every curriculum reference, textbook page, official syllabus guideline, and historical board examination paper used to build DynamicsLab.
        </p>
      </div>

      {/* Primary Local Textbook Highlight Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-sand-surface to-maroon-pale/30 border-2 border-maroon-light shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-maroon text-white">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-maroon-deep">
                Primary Prescribed Textbook: উচ্চ মাধ্যমিক পদার্থবিজ্ঞান প্রথম পত্র
              </h2>
              <p className="text-xs text-sand-subtext">
                Authored by: ড. শাহজাহান তপন, মুহাম্মদ আজিজ হাসান, ড. রানা চৌধুরী
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-forest-pale text-forest-deep border border-forest-light">
            Verified In Local Project Root
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="bg-sand-surface p-3 rounded-xl border border-sand-border">
            <span className="text-sand-subtext block text-[10px] uppercase font-bold">Local File Path</span>
            <span className="font-mono text-sand-text font-semibold break-all text-[11px]">
              পদার্থবিজ্ঞান ১ম পত্র তপন স্যার-[students.bd].pdf
            </span>
          </div>

          <div className="bg-sand-surface p-3 rounded-xl border border-sand-border">
            <span className="text-sand-subtext block text-[10px] uppercase font-bold">Chapter 3 Scope</span>
            <span className="font-mono text-sand-text font-bold">
              গতিবিদ্যা (Dynamics) • Pages 141–234
            </span>
          </div>

          <div className="bg-sand-surface p-3 rounded-xl border border-sand-border">
            <span className="text-sand-subtext block text-[10px] uppercase font-bold">Chapter 4 Scope</span>
            <span className="font-mono text-sand-text font-bold">
              নিউটনীয় বলবিদ্যা • Pages 235–330
            </span>
          </div>
        </div>

        <p className="text-xs text-sand-subtext leading-relaxed">
          <strong>Verification Method:</strong> All definitions, mathematical derivations, equation numbers (e.g. 3.4, 3.46, 3.49), worked numerical examples, and exercise questions were extracted, translated, and checked directly from the 802 scanned pages of this physical reference volume.
        </p>
      </div>

      {/* Sources Register Table / Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-maroon-deep flex items-center gap-2">
          <Database size={18} className="text-orange" />
          Verified Source Register
        </h3>

        <div className="space-y-4">
          {SOURCE_REGISTER.map((entry, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-sand-surface border border-sand-border shadow-xs space-y-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-border pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-orange-pale text-orange-deep font-bold text-[10px] border border-orange-light">
                    {entry.category}
                  </span>
                  <h4 className="text-sm font-bold text-maroon-deep">{entry.title}</h4>
                </div>
                <span className="text-[11px] text-forest font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>{entry.verificationStatus}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sand-subtext">
                <div>
                  <span className="font-bold text-sand-text">Authority / Authors: </span>
                  <span>{entry.authorsOrAuthority}</span>
                </div>
                <div>
                  <span className="font-bold text-sand-text">Year / Edition: </span>
                  <span>{entry.publicationOrYear}</span>
                </div>
              </div>

              <div className="p-3 bg-sand-muted rounded-xl border border-sand-border text-sand-text leading-relaxed">
                <span className="font-bold block text-sand-subtext text-[11px] mb-0.5">Details:</span>
                {entry.details}
              </div>

              <div className="flex items-center justify-between text-[11px] text-sand-subtext pt-1">
                <span><strong>Coverage:</strong> {entry.pagesOrCoverage}</span>
                <span className="italic">{entry.copyrightNotice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
