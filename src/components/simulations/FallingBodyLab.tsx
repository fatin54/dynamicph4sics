'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Info, Wind, ShieldCheck } from 'lucide-react';

export default function FallingBodyLab() {
  const [isVacuum, setIsVacuum] = useState<boolean>(true);
  const [tubeHeight, setTubeHeight] = useState<number>(45); // meters
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Position of Coin and Feather (0 = top, tubeHeight = bottom)
  const [coinY, setCoinY] = useState<number>(0);
  const [featherY, setFeatherY] = useState<number>(0);

  const g = 9.8;
  const theoreticalTime = Math.sqrt((2 * tubeHeight) / g);

  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const resetSim = () => {
    setIsRunning(false);
    setCoinY(0);
    setFeatherY(0);
    setElapsedTime(0);
    startTimeRef.current = undefined;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const updateFall = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const t = (timestamp - startTimeRef.current) / 1000;
    setElapsedTime(t);

    // Coin physics
    // Air resistance is minor for dense coin
    const coinDrag = isVacuum ? 0 : 0.05;
    const coinAcc = g - coinDrag * 5;
    const nextCoinY = Math.min(tubeHeight, 0.5 * coinAcc * t * t);
    setCoinY(nextCoinY);

    // Feather physics
    // Severe drag in air; terminal velocity ~ 2 m/s in air!
    let nextFeatherY = 0;
    if (isVacuum) {
      nextFeatherY = Math.min(tubeHeight, 0.5 * g * t * t);
    } else {
      // In air: terminal velocity ~ 4 m/s
      const vTerminal = 3.5;
      nextFeatherY = Math.min(tubeHeight, vTerminal * t);
    }
    setFeatherY(nextFeatherY);

    if (nextCoinY < tubeHeight || nextFeatherY < tubeHeight) {
      requestRef.current = requestAnimationFrame(updateFall);
    } else {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateFall);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, isVacuum, tubeHeight]);

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-maroon-deep flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange"></span>
            Galileo&apos;s Falling Bodies &amp; Vacuum Tube Lab
          </h3>
          <p className="text-xs text-sand-subtext mt-0.5">
            Test Galileo&apos;s famous discovery: all bodies fall at identical rates in a vacuum regardless of mass!
          </p>
        </div>

        {/* Vacuum Switch */}
        <div className="flex items-center gap-2 bg-sand-muted p-1 rounded-xl">
          <button
            onClick={() => { setIsVacuum(true); resetSim(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isVacuum ? 'bg-forest text-white shadow-sm' : 'text-sand-text hover:text-forest'
            }`}
          >
            <ShieldCheck size={14} />
            Vacuum (No Air)
          </button>
          <button
            onClick={() => { setIsVacuum(false); resetSim(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !isVacuum ? 'bg-maroon text-white shadow-sm' : 'text-sand-text hover:text-maroon'
            }`}
          >
            <Wind size={14} />
            Air-Filled Chamber
          </button>
        </div>
      </div>

      {/* Visual Vacuum Chamber */}
      <div className="relative bg-sand-bg rounded-xl border border-sand-border h-72 overflow-hidden mb-5 flex justify-center items-center">
        {/* The Glass Tube */}
        <div className="relative w-72 h-64 bg-white/70 border-2 border-sand-border rounded-3xl shadow-inner flex justify-around p-3">
          {/* Air particles indicator */}
          {!isVacuum && (
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(#241E20 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }} />
          )}

          {/* Left Lane: Lead Coin */}
          <div className="flex flex-col items-center h-full relative w-24 border-r border-sand-border/40">
            <span className="text-[10px] font-bold text-orange-deep mb-1">Lead Coin (50g)</span>
            <div
              className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-orange to-orange-deep border-2 border-orange-deep shadow-md flex items-center justify-center text-white text-[10px] font-bold transition-transform duration-75"
              style={{
                top: `${(coinY / tubeHeight) * 190 + 20}px`,
              }}
            >
              Coin
            </div>
          </div>

          {/* Right Lane: Feather */}
          <div className="flex flex-col items-center h-full relative w-24">
            <span className="text-[10px] font-bold text-maroon-deep mb-1">Feather (0.5g)</span>
            <div
              className="absolute w-9 h-9 rounded-full bg-maroon-pale border-2 border-maroon-light shadow-md flex items-center justify-center text-maroon-deep text-[10px] font-bold transition-transform duration-75"
              style={{
                top: `${(featherY / tubeHeight) * 190 + 20}px`,
              }}
            >
              Feather
            </div>
          </div>
        </div>

        {/* Live HUD Box */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-sand-border shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Chamber State:</span>
            <span className="font-bold text-maroon-deep">{isVacuum ? 'Vacuum (0.00 atm)' : 'Air (1.00 atm)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Drop Height (h):</span>
            <span className="font-mono font-bold text-forest">{tubeHeight} m</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Theoretical Time (t = √(2h/g)):</span>
            <span className="font-mono font-bold text-orange-deep">{theoreticalTime.toFixed(2)} s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Elapsed Time:</span>
            <span className="font-mono font-bold text-sand-text">{elapsedTime.toFixed(2)} s</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Chamber Height (h)</span>
            <span className="text-orange-deep font-mono">{tubeHeight} m</span>
          </div>
          <input
            type="range" min="10" max="100" step="5" value={tubeHeight}
            onChange={(e) => { setTubeHeight(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-orange"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { resetSim(); setIsRunning(true); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold text-white bg-orange hover:bg-orange-deep transition-all shadow-sm"
          >
            <Play size={14} />
            Drop Both Objects!
          </button>

          <button
            onClick={resetSim}
            className="px-4 py-3 rounded-xl text-xs font-semibold bg-sand-muted text-sand-text hover:bg-sand-border transition-colors border border-sand-border"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-2 p-3 bg-forest-pale rounded-xl border border-forest-light text-xs text-forest-deep flex items-start gap-2">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" />
        <div>
          <span className="font-bold">Galileo&apos;s 1st Law: </span>
          In a vacuum, the feather does NOT float—it drops with the exact same gravitational acceleration <em>g = 9.8 m/s²</em> as the 100-times heavier coin, hitting the bottom together at <em>t = {theoreticalTime.toFixed(2)} s</em>!
        </div>
      </div>
    </div>
  );
}
