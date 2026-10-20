'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Info } from 'lucide-react';

export default function PulleyLab() {
  const [m1, setM1] = useState<number>(3); // kg (left)
  const [m2, setM2] = useState<number>(5); // kg (right)
  const [g, setG] = useState<number>(9.8); // m/s²
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Motion coordinates (vertical offset in pixels from neutral)
  const [offsetY, setOffsetY] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // Classical Atwood Machine Formulas
  const sumM = m1 + m2;
  const diffM = m2 - m1;
  const acceleration = sumM > 0 ? (diffM / sumM) * g : 0;
  const tension = sumM > 0 ? ((2 * m1 * m2) / sumM) * g : 0;

  const resetSim = () => {
    setIsRunning(false);
    setOffsetY(0);
    setVelocity(0);
    lastTimeRef.current = undefined;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const updateMotion = (timestamp: number) => {
    if (lastTimeRef.current !== undefined) {
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);

      setVelocity((v) => v + acceleration * dt);
      setOffsetY((y) => {
        const nextY = y + velocity * dt * 25; // 25 px/m
        if (Math.abs(nextY) > 75) {
          // Reached physical pulley limit or floor
          setIsRunning(false);
          return Math.sign(nextY) * 75;
        }
        return nextY;
      });
    }
    lastTimeRef.current = timestamp;
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateMotion);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateMotion);
    } else {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, acceleration, velocity]);

  // Position of blocks
  // If m2 > m1, m2 descends (+offsetY) and m1 ascends (-offsetY)
  const y1 = 90 - offsetY; // Left block m1
  const y2 = 90 + offsetY; // Right block m2

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-maroon-deep flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange"></span>
            Connected Bodies &amp; Atwood Machine Lab
          </h3>
          <p className="text-xs text-sand-subtext mt-0.5">
            Visualize cord tension T and acceleration a = ((m₂ - m₁) / (m₁ + m₂)) g with Free-Body Diagrams
          </p>
        </div>
      </div>

      {/* Visual Pulley Stage */}
      <div className="relative bg-sand-bg rounded-xl border border-sand-border h-72 overflow-hidden mb-5 flex justify-center">
        {/* Overhead beam */}
        <div className="absolute top-2 w-48 h-3 bg-sand-subtext/40 rounded-full border border-sand-border" />
        <div className="absolute top-5 w-2 h-6 bg-sand-subtext/60" />

        {/* Pulley Wheel */}
        <div className="absolute top-10 w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-600 shadow-md flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-sand-border" />
        </div>

        {/* Cord Left (to m1) */}
        <div
          className="absolute top-18 w-0.5 bg-slate-700"
          style={{
            left: 'calc(50% - 32px)',
            height: `${y1}px`,
          }}
        />

        {/* Cord Right (to m2) */}
        <div
          className="absolute top-18 w-0.5 bg-slate-700"
          style={{
            left: 'calc(50% + 31px)',
            height: `${y2}px`,
          }}
        />

        {/* Left Block (m1) */}
        <div
          className="absolute flex flex-col items-center transition-transform duration-75"
          style={{
            left: 'calc(50% - 56px)',
            top: `${18 + y1}px`,
          }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-orange to-orange-deep rounded-lg border-2 border-orange-deep shadow-md flex flex-col items-center justify-center text-white text-[10px] font-bold">
            <span>m₁</span>
            <span>{m1} kg</span>
          </div>

          {/* Tension vector arrow UP */}
          <div className="absolute -top-7 flex flex-col items-center text-forest text-[9px] font-bold">
            <span>T</span>
            <div className="w-0.5 h-4 bg-forest relative">
              <div className="absolute top-0 -left-0.5 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-forest" />
            </div>
          </div>

          {/* Weight vector arrow DOWN */}
          <div className="absolute top-full mt-1 flex flex-col items-center text-maroon text-[9px] font-bold">
            <div className="w-0.5 h-4 bg-maroon relative">
              <div className="absolute bottom-0 -left-0.5 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-maroon" />
            </div>
            <span>m₁g</span>
          </div>
        </div>

        {/* Right Block (m2) */}
        <div
          className="absolute flex flex-col items-center transition-transform duration-75"
          style={{
            left: 'calc(50% + 8px)',
            top: `${18 + y2}px`,
          }}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-maroon-rich to-maroon-deep rounded-lg border-2 border-maroon-deep shadow-md flex flex-col items-center justify-center text-white text-[10px] font-bold">
            <span>m₂</span>
            <span>{m2} kg</span>
          </div>

          {/* Tension vector arrow UP */}
          <div className="absolute -top-7 flex flex-col items-center text-forest text-[9px] font-bold">
            <span>T</span>
            <div className="w-0.5 h-4 bg-forest relative">
              <div className="absolute top-0 -left-0.5 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-forest" />
            </div>
          </div>

          {/* Weight vector arrow DOWN */}
          <div className="absolute top-full mt-1 flex flex-col items-center text-maroon-deep text-[9px] font-bold">
            <div className="w-0.5 h-6 bg-maroon-deep relative">
              <div className="absolute bottom-0 -left-0.5 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-maroon-deep" />
            </div>
            <span>m₂g</span>
          </div>
        </div>

        {/* Live HUD Box */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl border border-sand-border shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Acceleration (a):</span>
            <span className="font-mono font-bold text-orange-deep">{acceleration.toFixed(2)} m/s²</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Cord Tension (T):</span>
            <span className="font-mono font-bold text-forest">{tension.toFixed(2)} N</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Weight m₁g:</span>
            <span className="font-mono text-sand-text">{(m1 * g).toFixed(1)} N</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Weight m₂g:</span>
            <span className="font-mono text-sand-text">{(m2 * g).toFixed(1)} N</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Mass 1 */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Mass 1 (Left m₁)</span>
            <span className="text-orange-deep font-mono">{m1} kg</span>
          </div>
          <input
            type="range" min="1" max="15" step="0.5" value={m1}
            onChange={(e) => { setM1(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-orange"
          />
        </div>

        {/* Mass 2 */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Mass 2 (Right m₂)</span>
            <span className="text-maroon-deep font-mono">{m2} kg</span>
          </div>
          <input
            type="range" min="1" max="15" step="0.5" value={m2}
            onChange={(e) => { setM2(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-maroon"
          />
        </div>

        {/* Gravity g */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Gravitational Accel. (g)</span>
            <span className="text-forest font-mono">{g.toFixed(1)} m/s²</span>
          </div>
          <input
            type="range" min="1.6" max="25" step="0.2" value={g}
            onChange={(e) => { setG(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-forest"
          />
          <span className="text-[10px] text-sand-subtext">Earth: 9.8 | Moon: 1.6 | Jupiter: 24.8</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange hover:bg-orange-deep transition-all shadow-sm"
        >
          <Play size={14} />
          {isRunning ? 'Pause' : 'Release Masses'}
        </button>

        <button
          onClick={resetSim}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-sand-muted text-sand-text hover:bg-sand-border transition-colors border border-sand-border"
        >
          <RotateCcw size={13} />
          Reset Position
        </button>
      </div>

      {/* Mathematical Proof Card */}
      <div className="mt-4 p-3 bg-forest-pale rounded-xl border border-forest-light text-xs text-forest-deep flex items-start gap-2">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" />
        <div>
          <span className="font-bold">FBD Derivation: </span>
          Block m₁ moves up: <em>T - m₁g = m₁a</em>. Block m₂ moves down: <em>m₂g - T = m₂a</em>.
          Adding both equations cancels T: <em>(m₂ - m₁)g = (m₁ + m₂)a ⟹ a = {acceleration.toFixed(2)} m/s²</em>.
          Notice cord tension T ({tension.toFixed(1)} N) is strictly between m₁g ({(m1 * g).toFixed(1)} N) and m₂g ({(m2 * g).toFixed(1)} N)!
        </div>
      </div>
    </div>
  );
}
