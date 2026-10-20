'use client';

import React, { useState } from 'react';
import { Info } from 'lucide-react';

export default function MotionGraphsLab() {
  const [profile, setProfile] = useState<'trapezoid' | 'accel' | 'const_v'>('trapezoid');
  const [scrubberTime, setScrubberTime] = useState<number>(10); // seconds

  const maxT = 20; // seconds

  // Kinematic evaluation at time t
  const getKinematics = (t: number) => {
    if (profile === 'const_v') {
      const v = 15;
      const s = v * t;
      const a = 0;
      return { s, v, a };
    } else if (profile === 'accel') {
      const a = 1.5;
      const v = a * t;
      const s = 0.5 * a * t * t;
      return { s, v, a };
    } else {
      // Trapezoid: 0-5s accel (a=3), 5-15s coast (v=15), 15-20s brake (a=-3)
      if (t <= 5) {
        const a = 3;
        const v = a * t;
        const s = 0.5 * a * t * t;
        return { s, v, a };
      } else if (t <= 15) {
        const a = 0;
        const v = 15;
        const s = 0.5 * 3 * 25 + v * (t - 5);
        return { s, v, a };
      } else {
        const a = -3;
        const dt = t - 15;
        const v = Math.max(0, 15 + a * dt);
        const s = 37.5 + 15 * 10 + (15 * dt + 0.5 * a * dt * dt);
        return { s, v, a };
      }
    }
  };

  const current = getKinematics(scrubberTime);

  // SVG dimensions for each of the 3 mini-graphs
  const svgW = 220;
  const svgH = 110;
  const pad = 24;
  const plotW = svgW - 2 * pad;
  const plotH = svgH - 2 * pad;

  // Max scales
  const maxS = profile === 'trapezoid' ? 225 : profile === 'accel' ? 300 : 300;
  const maxV = profile === 'trapezoid' ? 18 : profile === 'accel' ? 30 : 20;

  // Generate path points
  const numSteps = 40;
  let sPath = '';
  let vPath = '';
  let aPath = '';
  let vAreaPath = '';

  for (let i = 0; i <= numSteps; i++) {
    const t = (i / numSteps) * maxT;
    const { s, v, a } = getKinematics(t);

    const x = pad + (t / maxT) * plotW;
    const yS = svgH - pad - (s / maxS) * plotH;
    const yV = svgH - pad - (v / maxV) * plotH;
    const yA = svgH / 2 - (a / 5) * (plotH / 2);

    if (i === 0) {
      sPath = `M ${x} ${yS}`;
      vPath = `M ${x} ${yV}`;
      aPath = `M ${x} ${yA}`;
    } else {
      sPath += ` L ${x} ${yS}`;
      vPath += ` L ${x} ${yV}`;
      aPath += ` L ${x} ${yA}`;
    }

    if (t <= scrubberTime) {
      if (i === 0) {
        vAreaPath = `M ${x} ${svgH - pad} L ${x} ${yV}`;
      } else {
        vAreaPath += ` L ${x} ${yV}`;
      }
    }
  }
  const curX = pad + (scrubberTime / maxT) * plotW;
  vAreaPath += ` L ${curX} ${svgH - pad} Z`;

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-maroon-deep flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange"></span>
            Kinematic Graphs (s-t, v-t, a-t) Analyzer
          </h3>
          <p className="text-xs text-sand-subtext mt-0.5">
            Interactively inspect how Slope = Derivative and Area = Integral across all three synchronized graphs
          </p>
        </div>

        {/* Profile Tabs */}
        <div className="flex items-center bg-sand-muted p-1 rounded-xl gap-1 text-xs font-semibold">
          <button
            onClick={() => setProfile('trapezoid')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              profile === 'trapezoid' ? 'bg-orange text-white shadow-sm' : 'text-sand-text hover:text-orange-deep'
            }`}
          >
            Trapezoidal Trip (HSC Exam)
          </button>
          <button
            onClick={() => setProfile('accel')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              profile === 'accel' ? 'bg-orange text-white shadow-sm' : 'text-sand-text hover:text-orange-deep'
            }`}
          >
            Constant Accel (a = const)
          </button>
          <button
            onClick={() => setProfile('const_v')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              profile === 'const_v' ? 'bg-orange text-white shadow-sm' : 'text-sand-text hover:text-orange-deep'
            }`}
          >
            Uniform Velocity (v = const)
          </button>
        </div>
      </div>

      {/* 3 Synced Mini-Graphs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        {/* 1. Position-Time Graph */}
        <div className="bg-sand-bg p-3 rounded-xl border border-sand-border flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs font-bold text-maroon-deep mb-1">
            <span>Position-Time (s-t)</span>
            <span className="font-mono text-orange-deep">s = {current.s.toFixed(1)} m</span>
          </div>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
            {/* Axes */}
            <line x1={pad} y1={svgH - pad} x2={svgW - 5} y2={svgH - pad} stroke="#6E6466" strokeWidth="1" />
            <line x1={pad} y1={svgH - pad} x2={pad} y2={5} stroke="#6E6466" strokeWidth="1" />
            {/* Curve */}
            <path d={sPath} fill="none" stroke="#781F3A" strokeWidth="2.5" />
            {/* Scrubber vertical line */}
            <line x1={curX} y1={5} x2={curX} y2={svgH - pad} stroke="#E87524" strokeWidth="1.5" strokeDasharray="2,2" />
            {/* Scrubber Point */}
            <circle cx={curX} cy={svgH - pad - (current.s / maxS) * plotH} r="4" fill="#E87524" />
          </svg>
          <span className="text-[10px] text-sand-subtext mt-1">Slope = Instantaneous Velocity (v)</span>
        </div>

        {/* 2. Velocity-Time Graph */}
        <div className="bg-sand-bg p-3 rounded-xl border border-sand-border flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs font-bold text-forest-deep mb-1">
            <span>Velocity-Time (v-t)</span>
            <span className="font-mono text-forest">v = {current.v.toFixed(1)} m/s</span>
          </div>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
            {/* Area under curve shaded */}
            <path d={vAreaPath} fill="#9AC9A7" opacity="0.5" />
            {/* Axes */}
            <line x1={pad} y1={svgH - pad} x2={svgW - 5} y2={svgH - pad} stroke="#6E6466" strokeWidth="1" />
            <line x1={pad} y1={svgH - pad} x2={pad} y2={5} stroke="#6E6466" strokeWidth="1" />
            {/* Curve */}
            <path d={vPath} fill="none" stroke="#26734D" strokeWidth="2.5" />
            {/* Scrubber line */}
            <line x1={curX} y1={5} x2={curX} y2={svgH - pad} stroke="#E87524" strokeWidth="1.5" strokeDasharray="2,2" />
            <circle cx={curX} cy={svgH - pad - (current.v / maxV) * plotH} r="4" fill="#26734D" />
          </svg>
          <span className="text-[10px] text-sand-subtext mt-1">Shaded Area = Displacement (s); Slope = a</span>
        </div>

        {/* 3. Acceleration-Time Graph */}
        <div className="bg-sand-bg p-3 rounded-xl border border-sand-border flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs font-bold text-orange-deep mb-1">
            <span>Acceleration-Time (a-t)</span>
            <span className="font-mono text-orange-deep">a = {current.a.toFixed(1)} m/s²</span>
          </div>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
            {/* Axes with zero in middle */}
            <line x1={pad} y1={svgH / 2} x2={svgW - 5} y2={svgH / 2} stroke="#6E6466" strokeWidth="1" />
            <line x1={pad} y1={svgH - pad} x2={pad} y2={5} stroke="#6E6466" strokeWidth="1" />
            {/* Curve */}
            <path d={aPath} fill="none" stroke="#E87524" strokeWidth="2.5" />
            {/* Scrubber */}
            <line x1={curX} y1={5} x2={curX} y2={svgH - pad} stroke="#E87524" strokeWidth="1.5" strokeDasharray="2,2" />
            <circle cx={curX} cy={svgH / 2 - (current.a / 5) * (plotH / 2)} r="4" fill="#A63D12" />
          </svg>
          <span className="text-[10px] text-sand-subtext mt-1">Area = Velocity Change (Δv)</span>
        </div>
      </div>

      {/* Scrubber Control */}
      <div className="bg-sand-muted p-4 rounded-xl border border-sand-border mb-4">
        <div className="flex justify-between items-center text-xs font-bold mb-2">
          <span className="text-sand-text">Drag Time Scrubber (t)</span>
          <span className="font-mono text-orange-deep text-sm">{scrubberTime.toFixed(1)} s / 20.0 s</span>
        </div>
        <input
          type="range"
          min="0"
          max={maxT}
          step="0.2"
          value={scrubberTime}
          onChange={(e) => setScrubberTime(parseFloat(e.target.value))}
          className="w-full accent-orange"
        />
      </div>

      {/* Mathematical Synthesis */}
      <div className="p-3 bg-forest-pale rounded-xl border border-forest-light text-xs text-forest-deep flex items-start gap-2">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" />
        <div>
          <span className="font-bold">HSC Mathematical Proof at t = {scrubberTime.toFixed(1)} s: </span>
          Notice that the green shaded area under the velocity curve from 0 to {scrubberTime.toFixed(1)} s equals <strong>{current.s.toFixed(1)} meters</strong>, which matches the position s(t) on the left graph! Furthermore, the tangent slope of the velocity curve equals <strong>{current.a.toFixed(1)} m/s²</strong>!
        </div>
      </div>
    </div>
  );
}
