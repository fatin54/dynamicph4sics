import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sand-muted border-t border-sand-border mt-16 pt-12 pb-8 text-sand-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Academic Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center text-white font-black text-sm">
                Δ
              </div>
              <span className="font-extrabold text-maroon-deep text-base">
                DYNAMICS<span className="text-orange">LAB</span>
              </span>
            </div>
            <p className="text-xs text-sand-subtext leading-relaxed">
              An interactive, English-first physics learning platform architected strictly around the Bangladesh NCTB HSC Class XI curriculum.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sand-surface border border-sand-border text-[11px] text-forest font-semibold">
              <ShieldCheck size={13} />
              <span>NCTB Syllabus Code 174</span>
            </div>
          </div>

          {/* Col 2: Mandatory Source Textbook Reference */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-maroon-deep flex items-center gap-1.5">
              <BookOpen size={13} className="text-orange" />
              Primary Reference Textbook
            </h4>
            <p className="text-xs font-semibold text-sand-text">
              উচ্চ মাধ্যমিক পদার্থবিজ্ঞান ১ম পত্র
            </p>
            <ul className="text-xs text-sand-subtext space-y-1">
              <li>• ড. শাহজাহান তপন (Dr. Shahjahan Tapan)</li>
              <li>• মুহাম্মদ আজিজ হাসান (Muhammad Aziz Hasan)</li>
              <li>• ড. রানা চৌধুরী (Dr. Rana Chowdhury)</li>
            </ul>
            <p className="text-[11px] text-sand-subtext/80 pt-1">
              Verified from local edition (802 scanned pages, Chapter 3: Dynamics, pp. 141–234).
            </p>
          </div>

          {/* Col 3: 10-Year Question Archive */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-maroon-deep">
              10-Year Board Archive
            </h4>
            <p className="text-xs text-sand-subtext leading-relaxed">
              Verified questions and solutions from all 9 General Education Boards and Unified Papers:
            </p>
            <div className="flex flex-wrap gap-1 text-[10px] text-sand-subtext">
              <span className="bg-sand-surface px-1.5 py-0.5 rounded border border-sand-border">Dhaka</span>
              <span className="bg-sand-surface px-1.5 py-0.5 rounded border border-sand-border">Rajshahi</span>
              <span className="bg-sand-surface px-1.5 py-0.5 rounded border border-sand-border">Cumilla</span>
              <span className="bg-sand-surface px-1.5 py-0.5 rounded border border-sand-border">Jashore</span>
              <span className="bg-sand-surface px-1.5 py-0.5 rounded border border-sand-border">Chattogram</span>
              <span className="bg-sand-surface px-1.5 py-0.5 rounded border border-sand-border">Barishal</span>
              <span className="bg-sand-surface px-1.5 py-0.5 rounded border border-sand-border">Sylhet</span>
              <span className="bg-sand-surface px-1.5 py-0.5 rounded border border-sand-border">Dinajpur</span>
              <span className="bg-sand-surface px-1.5 py-0.5 rounded border border-sand-border">Mymensingh</span>
            </div>
          </div>

          {/* Col 4: Platform Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-maroon-deep">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-1 text-xs text-sand-subtext">
              <Link href="/lessons" className="hover:text-orange-deep">Lessons</Link>
              <Link href="/lab" className="hover:text-orange-deep">Physics Lab</Link>
              <Link href="/formulas" className="hover:text-orange-deep">Formulas</Link>
              <Link href="/questions" className="hover:text-orange-deep">Board Archive</Link>
              <Link href="/cq-solver" className="hover:text-orange-deep">CQ Solver</Link>
              <Link href="/quiz" className="hover:text-orange-deep">Quiz Engine</Link>
              <Link href="/tutor" className="hover:text-orange-deep">AI Tutor</Link>
              <Link href="/sources" className="hover:text-orange-deep">Sources Register</Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-sand-border flex flex-col sm:flex-row items-center justify-between text-xs text-sand-subtext gap-3">
          <p>
            &copy; {new Date().getFullYear()} DynamicsLab. Created for Bangladeshi HSC Students.
          </p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted for true intuitive understanding of physics</span>
            <Heart size={12} className="text-orange fill-orange" />
          </div>
        </div>
      </div>
    </footer>
  );
}
