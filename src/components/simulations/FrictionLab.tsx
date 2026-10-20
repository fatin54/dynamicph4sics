'use client';

import React, { useState } from 'react';
import { Info, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function FrictionLab() {
  const [mass, setMass] = useState<number>(10); // kg
  const [appliedForce, setAppliedForce] = useState<number>(35); // N
  const [inclineAngle, setInclineAngle] = useState<number>(0); // deg
  const [muStatic, setMuStatic] = useState<number>(0.4);
  const [muKinetic, setMuKinetic] = useState<number>(0.25);

  const g = 9.8;
  const rad = (inclineAngle * Math.PI) / 180;

  // Weight & Components
  const totalWeight = mass * g;
  const normalForce = totalWeight * Math.cos(rad);
  const downSlopeGravity = totalWeight * Math.sin(rad);

  // Friction limits
  const maxStaticFriction = muStatic * normalForce;
  const kineticFriction = muKinetic * normalForce;

  // Net driving force trying to move the block up/down
  // Let appliedForce push UP the plane (+); downSlopeGravity pulls DOWN (-)
  const drivingForce = appliedForce - downSlopeGravity;

  // Physical State Determination
  let state: 'static' | 'impending' | 'kinetic_up' | 'kinetic_down' = 'static';
  let activeFriction = 0;
  let netForce = 0;
  let acceleration = 0;

  if (Math.abs(drivingForce) < maxStaticFriction - 0.05) {
    state = 'static';
    activeFriction = Math.abs(drivingForce);
    netForce = 0;
    acceleration = 0;
  } else if (Math.abs(Math.abs(drivingForce) - maxStaticFriction) <= 0.05) {
    state = 'impending';
    activeFriction = maxStaticFriction;
    netForce = 0;
    acceleration = 0;
  } else {
    // Sliding motion occurs
    if (drivingForce > 0) {
      state = 'kinetic_up';
      activeFriction = kineticFriction;
      netForce = drivingForce - kineticFriction;
    } else {
      state = 'kinetic_down';
      activeFriction = kineticFriction;
      netForce = Math.abs(drivingForce) - kineticFriction;
    }
    acceleration = netForce / mass;
  }

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-maroon-deep flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange"></span>
            Friction &amp; Inclined Plane Laboratory
          </h3>
          <p className="text-xs text-sand-subtext mt-0.5">
            Differentiate Static Friction (self-adjusting up to μ_s N) from Kinetic Friction (μ_k N)
          </p>
        </div>

        {/* State Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
          state === 'static'
            ? 'bg-sand-muted border-sand-border text-sand-text'
            : state === 'impending'
            ? 'bg-orange-pale border-orange-light text-orange-deep'
            : 'bg-forest-pale border-forest-light text-forest-deep'
        }`}>
          {state === 'static' && <span>State: Static Equilibrium (Stationary)</span>}
          {state === 'impending' && <span>State: Impending Motion (Breaking Point!)</span>}
          {state === 'kinetic_up' && <span>State: Accelerating Up Incline!</span>}
          {state === 'kinetic_down' && <span>State: Sliding Down Incline!</span>}
        </div>
      </div>

      {/* Free-Body Diagram Canvas */}
      <div className="relative bg-sand-bg rounded-xl border border-sand-border h-64 overflow-hidden mb-5 flex items-center justify-center">
        {/* Inclined Surface */}
        <div
          className="relative w-80 h-3 bg-sand-subtext/40 rounded-full border border-sand-border origin-center transition-transform duration-200"
          style={{ transform: `rotate(${-inclineAngle}deg)` }}
        >
          {/* Block on Plane */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-20 h-14 bg-gradient-to-br from-orange to-orange-deep rounded-lg border-2 border-orange-deep shadow-md flex flex-col items-center justify-center text-white text-xs font-bold">
            <span>{mass} kg</span>
            <span className="text-[10px] opacity-80">
              {state.includes('kinetic') ? `a = ${acceleration.toFixed(2)} m/s²` : 'a = 0'}
            </span>

            {/* Normal Force N (Perpendicular Up) */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 flex flex-col items-center mb-1 text-forest text-[10px] font-semibold whitespace-nowrap">
              <div className="w-1 h-6 bg-forest relative">
                <div className="absolute top-0 -left-1 w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-forest" />
              </div>
              <span>N = {normalForce.toFixed(1)} N</span>
            </div>

            {/* Friction Vector (Opposing motion) */}
            {activeFriction > 0.1 && (
              <div className={`absolute top-1/2 -translate-y-1/2 flex items-center text-maroon text-[10px] font-bold whitespace-nowrap ${
                drivingForce >= 0 ? 'right-full mr-1 flex-row-reverse' : 'left-full ml-1'
              }`}>
                <div className="h-1 bg-maroon" style={{ width: `${Math.min(60, activeFriction * 1.5)}px` }} />
                <span className="bg-maroon-pale px-1 rounded mx-1">f = {activeFriction.toFixed(1)} N</span>
              </div>
            )}

            {/* Applied Force Vector */}
            {appliedForce > 0 && (
              <div className="absolute top-1/2 -translate-y-1/2 left-full ml-1 flex items-center text-orange-deep text-[10px] font-bold whitespace-nowrap">
                <div className="h-1 bg-orange" style={{ width: `${Math.min(60, appliedForce * 1.5)}px` }} />
                <span className="bg-orange-pale px-1 rounded ml-1">F = {appliedForce} N</span>
              </div>
            )}
          </div>
        </div>

        {/* Live HUD Breakdown */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl border border-sand-border shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Normal Reaction (N = mg cos θ):</span>
            <span className="font-mono font-bold text-forest">{normalForce.toFixed(1)} N</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Max Static Friction (f_s,max = μ_s N):</span>
            <span className="font-mono font-bold text-maroon-deep">{maxStaticFriction.toFixed(1)} N</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Kinetic Friction (f_k = μ_k N):</span>
            <span className="font-mono font-bold text-sand-text">{kineticFriction.toFixed(1)} N</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Net Force (F_net):</span>
            <span className="font-mono font-bold text-orange-deep">{netForce.toFixed(1)} N</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
        {/* Mass */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Mass (m)</span>
            <span className="text-orange-deep font-mono">{mass} kg</span>
          </div>
          <input
            type="range" min="1" max="30" value={mass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
            className="w-full accent-orange"
          />
        </div>

        {/* Applied Force */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Applied Force (F)</span>
            <span className="text-orange-deep font-mono">{appliedForce} N</span>
          </div>
          <input
            type="range" min="0" max="150" step="5" value={appliedForce}
            onChange={(e) => setAppliedForce(parseFloat(e.target.value))}
            className="w-full accent-orange"
          />
        </div>

        {/* Incline Angle */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Incline Angle (θ)</span>
            <span className="text-maroon-deep font-mono">{inclineAngle}°</span>
          </div>
          <input
            type="range" min="0" max="45" step="1" value={inclineAngle}
            onChange={(e) => setInclineAngle(parseFloat(e.target.value))}
            className="w-full accent-maroon"
          />
        </div>

        {/* Static Mu */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Static Coeff (μ_s)</span>
            <span className="text-forest font-mono">{muStatic.toFixed(2)}</span>
          </div>
          <input
            type="range" min="0.1" max="0.8" step="0.05" value={muStatic}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setMuStatic(val);
              if (muKinetic > val) setMuKinetic(val - 0.05);
            }}
            className="w-full accent-forest"
          />
        </div>

        {/* Kinetic Mu */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Kinetic Coeff (μ_k)</span>
            <span className="text-forest font-mono">{muKinetic.toFixed(2)}</span>
          </div>
          <input
            type="range" min="0.05" max={muStatic} step="0.05" value={muKinetic}
            onChange={(e) => setMuKinetic(parseFloat(e.target.value))}
            className="w-full accent-forest"
          />
        </div>
      </div>

      {/* Scientific Note */}
      <div className="mt-2 p-3 bg-forest-pale rounded-xl border border-forest-light text-xs text-forest-deep flex items-start gap-2">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" />
        <div>
          <span className="font-bold">Crucial HSC Distinction: </span>
          When applied force is {appliedForce} N (&lt; {maxStaticFriction.toFixed(1)} N), the static friction is exactly {activeFriction.toFixed(1)} N, <strong>NOT {maxStaticFriction.toFixed(1)} N</strong>. Static friction self-adjusts to match the push up to its maximum threshold! Once moving, friction immediately drops to kinetic friction ({kineticFriction.toFixed(1)} N).
        </div>
      </div>
    </div>
  );
}
