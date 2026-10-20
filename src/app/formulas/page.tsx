'use client';

import React, { useState } from 'react';
import { FORMULA_LIBRARY } from '@/data/formulas';
import { FormulaItem } from '@/types';
import FormulaCalculatorModal from '@/components/formula/FormulaCalculatorModal';
import {
  Calculator,
  Search,
  BookOpen,
  Filter,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
} from 'lucide-react';

export default function FormulasPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormulaForCalc, setSelectedFormulaForCalc] = useState<FormulaItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Formulas' },
    { id: 'linear_kinematics', label: 'Linear Kinematics' },
    { id: 'projectile', label: 'Projectile (প্রাস)' },
    { id: 'circular_motion', label: 'Circular Motion' },
    { id: 'forces_momentum', label: 'Forces & Momentum' },
    { id: 'friction_pulley', label: 'Friction & Pulley' },
  ];

  const filteredFormulas = FORMULA_LIBRARY.filter((form) => {
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      form.name.toLowerCase().includes(q) ||
      form.banglaName.includes(q) ||
      form.latex.toLowerCase().includes(q) ||
      form.plainEnglishExplanation.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-pale text-orange-deep text-xs font-semibold mb-2 border border-orange-light">
            <Calculator size={14} />
            <span>Interactive Formula Library &amp; Solver</span>
          </div>
          <h1 className="text-3xl font-black text-maroon-deep tracking-tight">
            Formula Explorer &amp; Step-by-Step Calculator
          </h1>
          <p className="text-xs sm:text-sm text-sand-subtext mt-1 max-w-2xl">
            Every verified formula from Chapter 3 Dynamics and Chapter 4 Forces, rendered with exact SI units, derivations, and live numerical solvers.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-subtext" />
          <input
            type="text"
            placeholder="Search formula by name, symbol, or equation (e.g. 'v = u + at', 'range', 'projectile')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sand-surface border border-sand-border text-xs text-sand-text focus:outline-hidden focus:border-orange shadow-2xs"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-maroon text-white shadow-xs'
                  : 'bg-sand-surface text-sand-text border border-sand-border hover:border-orange'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFormulas.map((form) => (
          <div
            key={form.id}
            className="p-5 rounded-2xl bg-sand-surface border border-sand-border hover:border-orange shadow-xs flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-orange-deep font-bold bg-orange-pale px-2 py-0.5 rounded border border-orange-light text-[11px]">
                  {form.textbookSection}
                </span>
                <span className="text-[11px] text-sand-subtext">
                  Textbook: {form.textbookNotation}
                </span>
              </div>

              {/* Formula Name */}
              <h3 className="text-base font-bold text-maroon-deep">
                {form.name}
              </h3>
              <p className="text-xs font-semibold text-sand-subtext font-sans mt-0.5">
                {form.banglaName}
              </p>

              {/* LaTeX Display Box */}
              <div className="my-3 p-3.5 rounded-xl bg-sand-muted border border-sand-border text-center overflow-x-auto">
                <span className="font-mono font-black text-lg text-maroon-deep">
                  {form.latex}
                </span>
              </div>

              {/* Explanations */}
              <p className="text-xs text-sand-text leading-relaxed">
                {form.plainEnglishExplanation}
              </p>
              <p className="text-[11px] text-sand-subtext font-sans mt-1 leading-relaxed">
                {form.banglaExplanation}
              </p>

              {/* Variables List */}
              <div className="mt-3 pt-3 border-t border-sand-border space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sand-subtext block">
                  Symbol Variables &amp; Units:
                </span>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  {form.variables.map((v) => (
                    <div key={v.symbol} className="flex items-center gap-1.5 text-sand-subtext">
                      <span className="font-mono font-bold text-orange-deep">{v.symbol}</span>
                      <span>: {v.name}</span>
                      <span className="text-sand-subtext/70">({v.unit})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-sand-border flex items-center justify-between">
              <span className="text-[11px] text-forest font-semibold flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>Verified NCTB Formula</span>
              </span>

              <button
                onClick={() => setSelectedFormulaForCalc(form)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange hover:bg-orange-deep text-white font-bold text-xs shadow-sm transition-colors"
              >
                <Calculator size={14} />
                <span>Solve in Calculator</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Calculator Modal */}
      {selectedFormulaForCalc && (
        <FormulaCalculatorModal
          formula={selectedFormulaForCalc}
          isOpen={true}
          onClose={() => setSelectedFormulaForCalc(null)}
        />
      )}
    </div>
  );
}
