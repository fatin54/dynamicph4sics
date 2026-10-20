'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  Calculator,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
} from 'lucide-react';
import ProjectileLab from '@/components/simulations/ProjectileLab';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-maroon-pale/40 via-sand-bg to-sand-bg pt-14 pb-12 border-b border-sand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* Textbook Citation Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sand-surface border border-sand-border text-xs text-maroon-deep font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              <span>Aligned with Dr. Shahjahan Tapan, M. Aziz Hasan &amp; Dr. Rana Chowdhury Textbook</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-black text-maroon-deep tracking-tight leading-tight">
              Understand Physics.{' '}
              <span className="text-orange underline decoration-orange-light decoration-4 underline-offset-6">
                Don&apos;t Memorize It.
              </span>
            </h1>

            {/* Bangla Headline */}
            <p className="text-lg sm:text-xl font-bold text-sand-subtext font-sans">
              পদার্থবিজ্ঞান বুঝে শেখো, মুখস্থ করে নয়।
            </p>

            {/* Supporting description */}
            <p className="text-sm sm:text-base text-sand-subtext leading-relaxed">
              Master <strong>HSC Physics 1st Paper, Chapter 3 — Dynamics (গতিবিদ্যা)</strong> through interactive laboratory experiments, progressive 3-layer explanations, and verified 10-year Bangladesh board examination questions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link
                href="/lessons"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange hover:bg-orange-deep text-white font-bold text-sm shadow-md transition-all hover:scale-102"
              >
                <span>Start Learning</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/lab"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sand-surface hover:bg-sand-muted border border-sand-border text-maroon-deep font-bold text-sm shadow-xs transition-all"
              >
                <FlaskConical size={16} className="text-orange" />
                <span>Explore the Physics Lab</span>
              </Link>
            </div>
          </div>

          {/* Interactive Hero Widget Preview */}
          <div className="mt-12 max-w-5xl mx-auto shadow-xl rounded-2xl overflow-hidden border-2 border-orange-light">
            <div className="bg-maroon-deep text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange" />
                <span>Live Interactive Physics Sandbox: Projectile Trajectory (প্রাস)</span>
              </div>
              <span className="text-orange-light font-mono">Real-Time Kinematics</span>
            </div>
            <ProjectileLab />
          </div>
        </div>
      </section>

      {/* 3-Layer Pedagogical Method Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-orange-deep uppercase tracking-wider">
            Curriculum Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-maroon-deep">
            The 3-Layer Learning Method
          </h2>
          <p className="text-xs sm:text-sm text-sand-subtext">
            Every concept starts as an intuitive everyday story and progressively elevates to full HSC examination mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Layer A */}
          <div className="p-6 rounded-2xl bg-sand-surface border-t-4 border-t-orange border border-sand-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-pale text-orange-deep flex items-center justify-center font-black text-sm">
              A
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-maroon-deep">Layer A — Intuitive English</h3>
              <span className="text-xs text-orange font-bold font-sans">সহজভাবে বুঝি</span>
            </div>
            <p className="text-xs text-sand-subtext leading-relaxed">
              Explained like you are 8 years old. Uses everyday situations—kicking a football, jumping from a boat, feeling the sudden brake on a local bus. Zero confusing jargon.
            </p>
            <div className="text-[11px] text-forest font-semibold flex items-center gap-1 pt-2 border-t border-sand-border">
              <CheckCircle2 size={13} />
              <span>Intuitive conceptual foundation</span>
            </div>
          </div>

          {/* Layer B */}
          <div className="p-6 rounded-2xl bg-sand-surface border-t-4 border-t-maroon border border-sand-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-maroon-pale text-maroon-deep flex items-center justify-center font-black text-sm">
              B
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-maroon-deep">Layer B — HSC Academic</h3>
              <span className="text-xs text-maroon font-bold font-sans">বই অনুযায়ী শিখি</span>
            </div>
            <p className="text-xs text-sand-subtext leading-relaxed">
              The rigorous academic physics of the Shahjahan Tapan textbook. Formal definitions, calculus derivations, vector notations, assumptions, and dimensional units.
            </p>
            <div className="text-[11px] text-forest font-semibold flex items-center gap-1 pt-2 border-t border-sand-border">
              <CheckCircle2 size={13} />
              <span>Full mathematical derivations</span>
            </div>
          </div>

          {/* Layer C */}
          <div className="p-6 rounded-2xl bg-sand-surface border-t-4 border-t-forest border border-sand-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-forest-pale text-forest-deep flex items-center justify-center font-black text-sm">
              C
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-maroon-deep">Layer C — Board Ready</h3>
              <span className="text-xs text-forest font-bold font-sans">বোর্ড পরীক্ষার প্রস্তুতি</span>
            </div>
            <p className="text-xs text-sand-subtext leading-relaxed">
              Structured preparation for HSC examinations. 10-year board questions, common student misconceptions, step-by-step scoring rubrics, and time-management tips.
            </p>
            <div className="text-[11px] text-forest font-semibold flex items-center gap-1 pt-2 border-t border-sand-border">
              <CheckCircle2 size={13} />
              <span>Examiner rubrics &amp; model answers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Physics Laboratories Grid */}
      <section className="bg-sand-muted py-14 border-y border-sand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-orange-deep uppercase tracking-wider">
                Simulations Suite
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-maroon-deep mt-1">
                Interactive Physics Laboratories
              </h2>
              <p className="text-xs text-sand-subtext mt-0.5">
                Calculated live in the browser using exact mathematical physics equations
              </p>
            </div>

            <Link
              href="/lab"
              className="text-xs font-bold text-orange-deep hover:underline flex items-center gap-1"
            >
              <span>View All 7 Experiments</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/lab?sim=newton"
              className="p-5 rounded-2xl bg-sand-surface border border-sand-border hover:border-orange transition-all hover:shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-pale text-orange-deep flex items-center justify-center font-bold mb-3 group-hover:bg-orange group-hover:text-white transition-colors">
                <Zap size={18} />
              </div>
              <h3 className="text-sm font-bold text-maroon-deep group-hover:text-orange-deep">
                Newton&apos;s Laws Lab
              </h3>
              <p className="text-xs text-sand-subtext mt-1">
                Explore Inertia, F = ma acceleration, and Action-Reaction force pairs.
              </p>
            </Link>

            <Link
              href="/lab?sim=football"
              className="p-5 rounded-2xl bg-sand-surface border border-sand-border hover:border-orange transition-all hover:shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-forest-pale text-forest-deep flex items-center justify-center font-bold mb-3 group-hover:bg-forest group-hover:text-white transition-colors">
                <FlaskConical size={18} />
              </div>
              <h3 className="text-sm font-bold text-maroon-deep group-hover:text-orange-deep">
                Football Impulse Lab
              </h3>
              <p className="text-xs text-sand-subtext mt-1">
                Impact force, follow-through contact time, and momentum impulse J = F Δt.
              </p>
            </Link>

            <Link
              href="/lab?sim=projectile"
              className="p-5 rounded-2xl bg-sand-surface border border-sand-border hover:border-orange transition-all hover:shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-pale text-orange-deep flex items-center justify-center font-bold mb-3 group-hover:bg-orange group-hover:text-white transition-colors">
                <Award size={18} />
              </div>
              <h3 className="text-sm font-bold text-maroon-deep group-hover:text-orange-deep">
                Projectile (প্রাস) Lab
              </h3>
              <p className="text-xs text-sand-subtext mt-1">
                2D parabolic trajectories, apex velocity, and wall clearance tests.
              </p>
            </Link>

            <Link
              href="/lab?sim=pulley"
              className="p-5 rounded-2xl bg-sand-surface border border-sand-border hover:border-orange transition-all hover:shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-maroon-pale text-maroon-deep flex items-center justify-center font-bold mb-3 group-hover:bg-maroon group-hover:text-white transition-colors">
                <Calculator size={18} />
              </div>
              <h3 className="text-sm font-bold text-maroon-deep group-hover:text-orange-deep">
                Atwood Pulley Lab
              </h3>
              <p className="text-xs text-sand-subtext mt-1">
                Connected masses, Free-Body Diagrams (FBD), acceleration, and string tension.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 10-Year Board Bank Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-maroon-deep to-[#300A18] text-white space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-orange-light uppercase tracking-wider">
                Historical Archive (2015–2024)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                10-Year Bangladesh Board Question Archive
              </h2>
              <p className="text-xs text-white/80 mt-1">
                Every question independently solved, verified against the textbook, and translated into crystal-clear English.
              </p>
            </div>

            <Link
              href="/questions"
              className="px-5 py-2.5 rounded-xl bg-orange hover:bg-orange-deep text-white font-bold text-xs shadow-md transition-colors"
            >
              Open Question Bank
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
              <span className="text-[10px] font-bold text-orange-light uppercase">Dhaka Board 2017</span>
              <p className="text-xs font-bold">Projectile Obstacle Clearance</p>
              <p className="text-[11px] text-white/70">
                Finding minimum angle reduction (0.93°) to strike a 2m wall 85m away.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
              <span className="text-[10px] font-bold text-orange-light uppercase">Cumilla Board 2017</span>
              <p className="text-xs font-bold">Two Kicks at 30° &amp; 60°</p>
              <p className="text-[11px] text-white/70">
                Proving equal ranges (8.84 m) for complementary angles caught at separate times.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1">
              <span className="text-[10px] font-bold text-orange-light uppercase">BUET 2018–2019</span>
              <p className="text-xs font-bold">Goalkeeper Pursuit Problem</p>
              <p className="text-[11px] text-white/70">
                Simultaneous 2D projectile flight vs runner intercepting ball before ground impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-maroon-deep">
          Ready to Ace HSC Dynamics?
        </h2>
        <p className="text-xs sm:text-sm text-sand-subtext max-w-xl mx-auto">
          Start with Lesson 1 to build your intuition, experiment in the physics laboratory, and practice with authentic board questions.
        </p>
        <div className="pt-2">
          <Link
            href="/lessons"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-orange hover:bg-orange-deep text-white font-bold text-sm shadow-md transition-all hover:scale-102"
          >
            <span>Begin Lesson 1: Reference Frames</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
