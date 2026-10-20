'use client';

import React, { useState } from 'react';
import { FormulaItem } from '@/types';
import { Calculator, X, Check, AlertCircle } from 'lucide-react';

interface Props {
  formula: FormulaItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function FormulaCalculatorModal({ formula, isOpen, onClose }: Props) {
  const config = formula.calculatorConfig;
  const [targetVar, setTargetVar] = useState<string>(config.solvableVariables[0] || '');
  const [inputs, setInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    config.variables.forEach((v) => {
      initial[v.symbol] = v.defaultValue;
    });
    return initial;
  });

  const [calculationResult, setCalculationResult] = useState<{
    result: number;
    steps: string[];
    unit: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCalculate = () => {
    setErrorMsg(null);
    try {
      const res = config.solve(targetVar, inputs);
      setCalculationResult(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'Calculation error. Check physical boundaries.');
      setCalculationResult(null);
    }
  };

  const handleInputChange = (sym: string, val: string) => {
    const num = parseFloat(val);
    setInputs((prev) => ({
      ...prev,
      [sym]: isNaN(num) ? 0 : num,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-sand-surface w-full max-w-lg rounded-2xl border border-sand-border shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-maroon-pale border-b border-maroon-light flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-maroon text-white">
              <Calculator size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-maroon-deep">{formula.name} Calculator</h3>
              <p className="text-[11px] text-maroon font-mono">{formula.textbookNotation}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-sand-subtext hover:text-maroon hover:bg-sand-muted"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Target Variable Chooser */}
          <div>
            <label className="font-bold text-sand-text block mb-1.5">
              Choose Unknown Variable to Solve for:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {config.solvableVariables.map((sym) => {
                const varMeta = config.variables.find((v) => v.symbol === sym);
                const isSelected = targetVar === sym;
                return (
                  <button
                    key={sym}
                    onClick={() => {
                      setTargetVar(sym);
                      setCalculationResult(null);
                      setErrorMsg(null);
                    }}
                    className={`py-2 px-3 rounded-xl border text-center font-semibold transition-all ${
                      isSelected
                        ? 'bg-orange text-white border-orange-deep shadow-xs'
                        : 'bg-sand-muted text-sand-text border-sand-border hover:border-orange'
                    }`}
                  >
                    <span className="block font-mono text-sm">{sym}</span>
                    <span className="text-[10px] opacity-80">{varMeta?.unit}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Known Input Values */}
          <div className="space-y-3 pt-2 border-t border-sand-border">
            <span className="font-bold text-sand-text block">Enter Known Quantities:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {config.variables
                .filter((v) => v.symbol !== targetVar)
                .map((v) => (
                  <div key={v.symbol} className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
                    <label className="flex justify-between text-[11px] font-semibold text-sand-subtext mb-1">
                      <span>{v.label}</span>
                      <span className="font-mono text-orange-deep">{v.unit}</span>
                    </label>
                    <input
                      type="number"
                      step={v.step || 0.1}
                      min={v.min}
                      max={v.max}
                      value={inputs[v.symbol] ?? v.defaultValue}
                      onChange={(e) => handleInputChange(v.symbol, e.target.value)}
                      className="w-full bg-sand-surface border border-sand-border rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-sand-text focus:outline-hidden focus:border-orange"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-2.5 rounded-xl bg-orange hover:bg-orange-deep text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Calculator size={14} />
            Compute Step-by-Step Solution
          </button>

          {/* Error Message if any */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-maroon-pale border border-maroon-light text-maroon-deep flex items-start gap-2">
              <AlertCircle size={15} className="mt-0.5 shrink-0 text-maroon" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step-by-Step Result Card */}
          {calculationResult && (
            <div className="p-4 rounded-xl bg-forest-pale border border-forest-light space-y-2">
              <div className="flex items-center justify-between border-b border-forest-light pb-2">
                <span className="font-bold text-forest-deep flex items-center gap-1">
                  <Check size={14} className="text-forest" />
                  Calculated Result:
                </span>
                <span className="text-base font-black font-mono text-forest-deep">
                  {targetVar} = {calculationResult.result.toFixed(3)} {calculationResult.unit}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-forest-deep block mb-1">
                  Mathematical Substitution Steps:
                </span>
                <div className="space-y-1 font-mono text-[11px] bg-sand-surface p-2.5 rounded-lg border border-forest-light/60 text-sand-text">
                  {calculationResult.steps.map((st, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-sand-subtext select-none">{i + 1}.</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
