'use client';

import React, { useState } from 'react';
import { Info } from 'lucide-react';

export default function ImpulseLab() {
  const [profile, setProfile] = useState<'rect' | 'tri' | 'sine'>('tri');
  const [peakForce, setPeakForce] = useState<number>(500); // N
  const [duration, setDuration] = useState<number>(0.04); // seconds (40 ms)
  const [mass, setMass] = useState<number>(0.5); // kg (e.g. tennis / cricket ball)

  // Area under curve calculation = Impulse J (N·s)
  let impulse = 0;
  if (profile === 'rect') {
    impulse = peakForce * duration;
  } else if (profile === 'tri') {
    impulse = 0.5 * peakForce * duration;
  } else {
    // Half-sine: integral from 0 to T of F0 sin(pi t / T) dt = 2 F0 T / pi
    impulse = (2 / Math.PI) * peakForce * duration;
  }

  const deltaV = mass > 0 ? impulse / mass : 0; // m/s

  // SVG dimensions
  const svgWidth = 480;
  const svgHeight = 180;
  const padding = 35;
  const plotW = svgWidth - 2 * padding;
  const plotH = svgHeight - 2 * padding;

  // Build path points
  let pathD = '';
  let areaD = '';
  const numSteps = 50;

  for (let i = 0; i <= numSteps; i++) {
    const fraction = i / numSteps;
    const t = fraction * duration;
    let fVal = 0;
    if (profile === 'rect') {
      fVal = (fraction > 0.05 && fraction < 0.95) ? peakForce : 0;
    } else if (profile === 'tri') {
      fVal = fraction <= 0.5 ? 2 * peakForce * fraction : 2 * peakForce * (1 - fraction);
    } else {
      fVal = peakForce * Math.sin(Math.PI * fraction);
    }

    const x = padding + fraction * plotW;
    const y = svgHeight - padding - (fVal / 1000) * plotH;

    if (i === 0) {
      pathD = `M ${x} ${y}`;
      areaD = `M ${x} ${svgHeight - padding} L ${x} ${y}`;
    } else {
      pathD += ` L ${x} ${y}`;
      areaD += ` L ${x} ${y}`;
    }
  }
  areaD += ` L ${padding + plotW} ${svgHeight - padding} Z`;

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-maroon-deep flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange"></span>
            Force-Time Graph &amp; Impulse Area Laboratory
          </h3>
          <p className="text-xs text-sand-subtext mt-0.5">
            Visualize Impulse as the shaded definite integral Area = ∫ F(t) dt = Δp = m Δv
          </p>
        </div>

        {/* Profile pills */}
        <div className="flex items-center bg-sand-muted p-1 rounded-xl gap-1 text-xs font-semibold">
          <button
            onClick={() => setProfile('tri')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              profile === 'tri' ? 'bg-orange text-white shadow-sm' : 'text-sand-text hover:text-orange-deep'
            }`}
          >
            Triangular Impact
          </button>
          <button
            onClick={() => setProfile('sine')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              profile === 'sine' ? 'bg-orange text-white shadow-sm' : 'text-sand-text hover:text-orange-deep'
            }`}
          >
            Half-Sine Impact
          </button>
          <button
            onClick={() => setProfile('rect')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              profile === 'rect' ? 'bg-orange text-white shadow-sm' : 'text-sand-text hover:text-orange-deep'
            }`}
          >
            Rectangular Pulse
          </button>
        </div>
      </div>

      {/* SVG Force-Time Plot */}
      <div className="relative bg-sand-bg rounded-xl border border-sand-border p-4 mb-5 flex flex-col items-center">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-xl h-auto">
          {/* Shaded Area */}
          <path d={areaD} fill="#FFD0A6" opacity="0.6" />

          {/* Curve */}
          <path d={pathD} fill="none" stroke="#E87524" strokeWidth="3" strokeLinecap="round" />

          {/* Axes */}
          <line
            x1={padding} y1={svgHeight - padding}
            x2={svgWidth - padding + 10} y2={svgHeight - padding}
            stroke="#6E6466" strokeWidth="1.5"
          />
          <line
            x1={padding} y1={svgHeight - padding}
            x2={padding} y2={padding - 10}
            stroke="#6E6466" strokeWidth="1.5"
          />

          {/* Axis Labels */}
          <text x={svgWidth - padding + 15} y={svgHeight - padding + 4} fontSize="11" fill="#6E6466">
            Time t (s)
          </text>
          <text x={padding - 28} y={padding - 12} fontSize="11" fill="#6E6466">
            Force F (N)
          </text>

          {/* Peak mark */}
          <text x={padding + 5} y={svgHeight - padding - (peakForce / 1000) * plotH - 6} fontSize="10" fill="#A63D12" fontWeight="bold">
            F₀ = {peakForce} N
          </text>
          <text x={padding + plotW - 20} y={svgHeight - padding + 15} fontSize="10" fill="#6E6466">
            {(duration * 1000).toFixed(0)} ms
          </text>

          {/* Area label in center of shaded region */}
          <text
            x={padding + plotW / 2}
            y={svgHeight - padding - (peakForce / 1000) * plotH * 0.4}
            textAnchor="middle"
            fontSize="12"
            fill="#781F3A"
            fontWeight="bold"
          >
            Area = Impulse J ({impulse.toFixed(2)} N·s)
          </text>
        </svg>

        {/* Live HUD Box */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 mt-2 text-center text-xs">
          <div className="bg-sand-surface p-2 rounded-xl border border-sand-border">
            <span className="text-sand-subtext block text-[11px]">Peak Force (F₀)</span>
            <span className="font-mono font-bold text-orange-deep">{peakForce} N</span>
          </div>
          <div className="bg-sand-surface p-2 rounded-xl border border-sand-border">
            <span className="text-sand-subtext block text-[11px]">Duration (Δt)</span>
            <span className="font-mono font-bold text-maroon-deep">{(duration * 1000).toFixed(0)} ms</span>
          </div>
          <div className="bg-sand-surface p-2 rounded-xl border border-sand-border">
            <span className="text-sand-subtext block text-[11px]">Impulse (J = ∫ F dt)</span>
            <span className="font-mono font-bold text-forest">{impulse.toFixed(2)} N·s</span>
          </div>
          <div className="bg-sand-surface p-2 rounded-xl border border-sand-border">
            <span className="text-sand-subtext block text-[11px]">Velocity Gain (Δv = J/m)</span>
            <span className="font-mono font-bold text-forest-fresh">{deltaV.toFixed(2)} m/s</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Peak Force */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Peak Impact Force (F₀)</span>
            <span className="text-orange-deep font-mono">{peakForce} N</span>
          </div>
          <input
            type="range" min="100" max="1000" step="50" value={peakForce}
            onChange={(e) => setPeakForce(parseFloat(e.target.value))}
            className="w-full accent-orange"
          />
        </div>

        {/* Duration */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Contact Duration (Δt)</span>
            <span className="text-maroon-deep font-mono">{(duration * 1000).toFixed(0)} ms</span>
          </div>
          <input
            type="range" min="0.01" max="0.10" step="0.005" value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="w-full accent-maroon"
          />
        </div>

        {/* Mass */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Object Mass (m)</span>
            <span className="text-forest font-mono">{mass} kg</span>
          </div>
          <input
            type="range" min="0.1" max="2.0" step="0.1" value={mass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
            className="w-full accent-forest"
          />
        </div>
      </div>

      {/* Explanatory note */}
      <div className="mt-2 p-3 bg-forest-pale rounded-xl border border-forest-light text-xs text-forest-deep flex items-start gap-2">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" />
        <div>
          <span className="font-bold">Calculus &amp; Board Exam Insight: </span>
          The area enclosed under ANY force-time curve between t₁ and t₂ is mathematically identical to the change in momentum:
          <em> J = ∫ F(t) dt = Δp = m Δv = {impulse.toFixed(2)} N·s</em>.
          For a {mass} kg ball initially at rest, this impulse accelerates it to a speed of {deltaV.toFixed(2)} m/s ({(deltaV * 3.6).toFixed(1)} km/h)!
        </div>
      </div>
    </div>
  );
}
