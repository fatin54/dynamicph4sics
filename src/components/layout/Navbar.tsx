'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  FlaskConical,
  BookOpen,
  Calculator,
  GraduationCap,
  Sparkles,
  Award,
  Menu,
  X,
  Languages,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBangla, setShowBangla] = useState(false);

  const navLinks = [
    { href: '/lessons', label: 'Lessons', labelBn: 'অধ্যায় পাঠ', icon: BookOpen },
    { href: '/lab', label: 'Physics Lab', labelBn: 'পদার্থবিজ্ঞান ল্যাব', icon: FlaskConical },
    { href: '/formulas', label: 'Formula Explorer', labelBn: 'সূত্র সম্ভার', icon: Calculator },
    { href: '/questions', label: '10-Yr Board Bank', labelBn: '১০ বছরের বোর্ড প্রশ্ন', icon: GraduationCap },
    { href: '/cq-solver', label: 'CQ Solver', labelBn: 'সৃজনশীল সমাধান', icon: Compass },
    { href: '/quiz', label: 'Practice Quiz', labelBn: 'মডেল কুইজ', icon: Award },
    { href: '/tutor', label: 'AI Tutor', labelBn: 'পদার্থবিজ্ঞান শিক্ষক', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 bg-sand-surface/95 backdrop-blur-md border-b border-sand-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange to-orange-deep flex items-center justify-center text-white font-extrabold text-lg shadow-sm border border-orange-deep group-hover:scale-105 transition-transform">
              Δ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-maroon-deep">
                  DYNAMICS<span className="text-orange">LAB</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-forest-pale text-forest border border-forest-light">
                  HSC XI
                </span>
              </div>
              <p className="text-[11px] text-sand-subtext -mt-0.5">
                Physics 1st Paper • Chapter 3
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-maroon text-white shadow-sm'
                      : 'text-sand-text hover:bg-sand-muted hover:text-orange-deep'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-sand-subtext'} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/sources"
              className="text-xs font-semibold text-sand-subtext hover:text-maroon px-2 py-1.5 rounded-lg hover:bg-sand-muted"
            >
              NCTB Sources
            </Link>

            <Link
              href="/progress"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-forest-pale border border-forest-light text-forest-deep text-xs font-bold hover:bg-forest hover:text-white transition-colors"
            >
              <Award size={14} />
              <span>Progress</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-sand-muted text-sand-text hover:text-orange"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sand-border bg-sand-surface px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                  isActive
                    ? 'bg-maroon text-white font-bold'
                    : 'text-sand-text hover:bg-sand-muted'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{link.label}</span>
                </div>
                <span className="text-[11px] opacity-70 font-sans">{link.labelBn}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-sand-border flex justify-between items-center text-xs">
            <Link
              href="/sources"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sand-subtext font-semibold hover:text-maroon"
            >
              Textbook Verification Register
            </Link>
            <Link
              href="/progress"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-forest hover:underline"
            >
              My Progress
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
