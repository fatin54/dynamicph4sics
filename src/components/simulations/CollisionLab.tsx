'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function CollisionLab() {
  const [m1, setM1] = useState<number>(3); // kg
  const [m2, setM2] = useState<number>(2); // kg
  const [u1, setU1] = useState<number>(4); // m/s (moves right)
  const [u2, setU2] = useState<number>(-2); // m/s (moves left)
  const [restitution, setRestitution] = useState<number>(1.0); // e = 1 for elastic, 0 for inelastic

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasCollided, setHasCollided] = useState<boolean>(false);

  // Position state (pixels)
  const [pos1, setPos1] = useState<number>(120);
  const [pos2, setPos2] = useState<number>(480);
  const [currV1, setCurrV1] = useState<number>(u1);
  const [currV2, setCurrV2] = useState<number>(u2);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // 1D Collision formulas with coefficient of restitution e
  const sumM = m1 + m2;
  const v1Final = ((m1 - restitution * m2) / sumM) * u1 + (((1 + restitution) * m2) / sumM) * u2;
  const v2Final = (((1 + restitution) * m1) / sumM) * u1 + ((m2 - restitution * m1) / sumM) * u2;

  // Energy & Momentum metrics
  const pInitial = m1 * u1 + m2 * u2;
  const pFinal = m1 * v1Final + m2 * v2Final;
  const keInitial = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2;
  const keFinal = 0.5 * m1 * v1Final * v1Final + 0.5 * m2 * v2Final * v2Final;
  const keLoss = Math.max(0, keInitial - keFinal);
  const keLossPct = keInitial > 0 ? (keLoss / keInitial) * 100 : 0;

  const resetSim = () => {
    setIsRunning(false);
    setHasCollided(false);
    setPos1(120);
    setPos2(480);
    setCurrV1(u1);
    setCurrV2(u2);
    lastTimeRef.current = undefined;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const updatePositions = (timestamp: number) => {
    if (lastTimeRef.current !== undefined) {
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);

      setPos1((prevX1) => {
        setPos2((prevX2) => {
          const cartWidth = 60;
          let nextX1 = prevX1 + currV1 * dt * 40;
          let nextX2 = prevX2 + currV2 * dt * 40;

          // Check collision condition
          if (!hasCollided && nextX1 + cartWidth >= nextX2) {
            setHasCollided(true);
            setCurrV1(v1Final);
            setCurrV2(v2Final);
            // Snap together at contact boundary
            const midpoint = (nextX1 + cartWidth + nextX2) / 2;
            nextX1 = midpoint - cartWidth;
            nextX2 = midpoint;
          }

          // Boundary walls
          if (nextX1 < 20) { nextX1 = 20; setCurrV1((v) => -v * 0.9); }
          if (nextX2 > 600) { nextX2 = 600; setCurrV2((v) => -v * 0.9); }

          return nextX2;
        });
        return prevX1 + currV1 * dt * 40;
      });
    }
    lastTimeRef.current = timestamp;
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updatePositions);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updatePositions);
    } else {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, currV1, currV2, hasCollided, v1Final, v2Final]);

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-maroon-deep flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange"></span>
            Collision Laboratory: Elastic vs Inelastic
          </h3>
          <p className="text-xs text-sand-subtext mt-0.5">
            Test conservation of momentum and energy loss across different coefficients of restitution (e)
          </p>
        </div>

        {/* Momentum conservation indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-pale border border-forest-light text-forest-deep text-xs font-semibold">
          <CheckCircle2 size={15} className="text-forest" />
          <span>Momentum Conserved: Δp = 0.00</span>
        </div>
      </div>

      {/* Air-Track Visual Arena */}
      <div className="relative bg-sand-bg rounded-xl border border-sand-border h-60 overflow-hidden mb-5">
        {/* Air track rail */}
        <div className="absolute bottom-10 left-4 right-4 h-3 bg-gradient-to-r from-sand-subtext/30 via-sand-subtext/10 to-sand-subtext/30 rounded-full border-t border-sand-border flex items-center justify-between px-3">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-sand-subtext/40" />
          ))}
        </div>

        {/* Cart 1 (Orange) */}
        <div
          className="absolute bottom-12 transition-transform duration-75"
          style={{ transform: `translateX(${pos1}px)` }}
        >
          <div className="relative w-16 h-14 bg-gradient-to-br from-orange to-orange-deep rounded-lg border-2 border-orange-deep shadow-md flex flex-col items-center justify-center text-white text-xs font-bold">
            <span>Cart 1</span>
            <span className="text-[10px]">{m1} kg</span>
            <span className="text-[9px] opacity-80">{currV1.toFixed(1)} m/s</span>

            {/* Velocity vector arrow */}
            <div
              className={`absolute -top-6 flex items-center ${
                currV1 >= 0 ? 'left-1/2 text-orange' : 'right-1/2 flex-row-reverse text-orange-deep'
              }`}
            >
              <div className="h-1 bg-orange" style={{ width: `${Math.min(50, Math.abs(currV1) * 10)}px` }} />
              <div
                className={`w-0 h-0 border-t-3 border-b-3 border-transparent ${
                  currV1 >= 0 ? 'border-l-5 border-l-orange' : 'border-r-5 border-r-orange-deep'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Cart 2 (Maroon) */}
        <div
          className="absolute bottom-12 transition-transform duration-75"
          style={{ transform: `translateX(${pos2}px)` }}
        >
          <div className="relative w-16 h-14 bg-gradient-to-br from-maroon-rich to-maroon-deep rounded-lg border-2 border-maroon-deep shadow-md flex flex-col items-center justify-center text-white text-xs font-bold">
            <span>Cart 2</span>
            <span className="text-[10px]">{m2} kg</span>
            <span className="text-[9px] opacity-80">{currV2.toFixed(1)} m/s</span>

            {/* Velocity vector arrow */}
            <div
              className={`absolute -top-6 flex items-center ${
                currV2 >= 0 ? 'left-1/2 text-maroon' : 'right-1/2 flex-row-reverse text-maroon-deep'
              }`}
            >
              <div className="h-1 bg-maroon" style={{ width: `${Math.min(50, Math.abs(currV2) * 10)}px` }} />
              <div
                className={`w-0 h-0 border-t-3 border-b-3 border-transparent ${
                  currV2 >= 0 ? 'border-l-5 border-l-maroon' : 'border-r-5 border-r-maroon-deep'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Live HUD */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl border border-sand-border shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Total Momentum (P):</span>
            <span className="font-mono font-bold text-maroon-deep">{pInitial.toFixed(1)} kg·m/s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Initial Kinetic Energy (K_i):</span>
            <span className="font-mono font-bold text-forest">{keInitial.toFixed(1)} J</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Final Kinetic Energy (K_f):</span>
            <span className="font-mono font-bold text-forest">{keFinal.toFixed(1)} J</span>
          </div>
          {keLoss > 0.01 && (
            <div className="flex items-center gap-2 text-orange-deep font-semibold">
              <span>Energy Dissipated:</span>
              <span>{keLoss.toFixed(1)} J ({keLossPct.toFixed(1)}%)</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
        {/* m1 */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Cart 1 Mass (m₁)</span>
            <span className="text-orange-deep font-mono">{m1} kg</span>
          </div>
          <input
            type="range" min="1" max="10" step="0.5" value={m1}
            onChange={(e) => { setM1(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-orange"
          />
        </div>

        {/* u1 */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Cart 1 Vel (u₁)</span>
            <span className="text-orange-deep font-mono">{u1} m/s</span>
          </div>
          <input
            type="range" min="-5" max="8" step="1" value={u1}
            onChange={(e) => { setU1(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-orange"
          />
        </div>

        {/* m2 */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Cart 2 Mass (m₂)</span>
            <span className="text-maroon-deep font-mono">{m2} kg</span>
          </div>
          <input
            type="range" min="1" max="10" step="0.5" value={m2}
            onChange={(e) => { setM2(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-maroon"
          />
        </div>

        {/* u2 */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Cart 2 Vel (u₂)</span>
            <span className="text-maroon-deep font-mono">{u2} m/s</span>
          </div>
          <input
            type="range" min="-8" max="5" step="1" value={u2}
            onChange={(e) => { setU2(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-maroon"
          />
        </div>

        {/* Restitution (e) */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Elasticity (e)</span>
            <span className="text-forest font-mono">{restitution.toFixed(2)}</span>
          </div>
          <input
            type="range" min="0" max="1" step="0.1" value={restitution}
            onChange={(e) => { setRestitution(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-forest"
          />
          <span className="text-[10px] text-sand-subtext">
            {restitution === 1 ? 'Perfect Elastic' : restitution === 0 ? 'Stick Together' : 'Inelastic'}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange hover:bg-orange-deep transition-all shadow-sm"
        >
          <Play size={14} />
          {isRunning ? 'Pause' : 'Collide Carts!'}
        </button>

        <button
          onClick={resetSim}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-sand-muted text-sand-text hover:bg-sand-border transition-colors border border-sand-border"
        >
          <RotateCcw size={13} />
          Reset Carts
        </button>
      </div>

      {/* Observation */}
      <div className="mt-4 p-3 bg-forest-pale rounded-xl border border-forest-light text-xs text-forest-deep flex items-start gap-2">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" />
        <div>
          <span className="font-bold">Physics Principle: </span>
          Notice that whether e = 1.0 (elastic) or e = 0.0 (stick together), the total vector momentum before ({pInitial.toFixed(1)} kg·m/s) equals total momentum after ({pFinal.toFixed(1)} kg·m/s). But in the inelastic case (e = 0), {keLoss.toFixed(1)} Joules of kinetic energy is permanently transformed into heat and deformation!
        </div>
      </div>
    </div>
  );
}
