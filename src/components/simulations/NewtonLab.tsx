'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Info, ArrowRight } from 'lucide-react';

export default function NewtonLab() {
  const [mode, setMode] = useState<'second' | 'first' | 'third'>('second');
  const [mass, setMass] = useState<number>(5); // kg
  const [appliedForce, setAppliedForce] = useState<number>(25); // N
  const [frictionCoeff, setFrictionCoeff] = useState<number>(0.1); // mu
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simSpeed, setSimSpeed] = useState<number>(1);

  // Third law mode masses
  const [massA, setMassA] = useState<number>(3);
  const [massB, setMassB] = useState<number>(6);
  const [contactForce, setContactForce] = useState<number>(30);

  // Motion state
  const [pos, setPos] = useState<number>(50); // pixels
  const [vel, setVel] = useState<number>(0); // m/s
  const [time, setTime] = useState<number>(0); // s

  // Third law motion state
  const [posA, setPosA] = useState<number>(200);
  const [posB, setPosB] = useState<number>(260);
  const [velA, setVelA] = useState<number>(0);
  const [velB, setVelB] = useState<number>(0);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const g = 9.8;
  const normalForce = mass * g;
  const maxFriction = frictionCoeff * normalForce;
  
  // Calculate net force and acceleration for Mode 2
  let actualFriction = 0;
  if (Math.abs(vel) > 0.001) {
    actualFriction = Math.sign(vel) * maxFriction;
  } else {
    actualFriction = Math.min(Math.abs(appliedForce), maxFriction) * Math.sign(appliedForce);
  }
  
  const netForce = appliedForce - actualFriction;
  const acceleration = mass > 0 ? netForce / mass : 0;

  // Third law accelerations
  const accA = -contactForce / massA; // pushes left
  const accB = contactForce / massB;  // pushes right

  const resetSim = () => {
    setIsRunning(false);
    setPos(50);
    setVel(0);
    setTime(0);
    setPosA(200);
    setPosB(260);
    setVelA(0);
    setVelB(0);
    lastTimeRef.current = undefined;
  };

  const updateSimulation = (timestamp: number) => {
    if (lastTimeRef.current !== undefined) {
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1) * simSpeed;
      setTime((prev) => prev + dt);

      if (mode === 'second' || mode === 'first') {
        setVel((prevV) => {
          let newV = prevV + acceleration * dt;
          if (appliedForce === 0 && Math.abs(prevV) > 0 && Math.sign(newV) !== Math.sign(prevV)) {
            newV = 0; // stopped by friction
          }
          return newV;
        });
        setPos((prevX) => {
          const next = prevX + vel * dt * 25; // 25 px per meter
          if (next > 650) return 50; // loop track
          if (next < 20) return 20;
          return next;
        });
      } else if (mode === 'third') {
        // Blocks push off each other
        setVelA((v) => v + accA * dt);
        setVelB((v) => v + accB * dt);
        setPosA((x) => Math.max(20, x + velA * dt * 25));
        setPosB((x) => Math.min(650, x + velB * dt * 25));
      }
    }
    lastTimeRef.current = timestamp;
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateSimulation);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateSimulation);
    } else {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, mode, mass, appliedForce, frictionCoeff, vel, acceleration, simSpeed, contactForce, massA, massB]);

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-5 shadow-sm">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-maroon-deep flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange"></span>
            Newton&apos;s Laws Laboratory
          </h3>
          <p className="text-xs text-sand-subtext mt-0.5">
            Interactively explore Inertia, F = ma, and Action-Reaction force pairs
          </p>
        </div>

        <div className="flex items-center bg-sand-muted p-1 rounded-xl gap-1 text-xs font-semibold">
          <button
            onClick={() => { setMode('second'); resetSim(); }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mode === 'second'
                ? 'bg-orange text-white shadow-sm'
                : 'text-sand-text hover:text-orange-deep'
            }`}
          >
            2nd Law (F = ma)
          </button>
          <button
            onClick={() => { setMode('first'); setAppliedForce(0); resetSim(); }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mode === 'first'
                ? 'bg-orange text-white shadow-sm'
                : 'text-sand-text hover:text-orange-deep'
            }`}
          >
            1st Law (Inertia)
          </button>
          <button
            onClick={() => { setMode('third'); resetSim(); }}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mode === 'third'
                ? 'bg-orange text-white shadow-sm'
                : 'text-sand-text hover:text-orange-deep'
            }`}
          >
            3rd Law (Action-Reaction)
          </button>
        </div>
      </div>

      {/* Canvas / Visual Arena */}
      <div className="relative bg-sand-bg rounded-xl border border-sand-border h-64 overflow-hidden mb-5">
        {/* Sky / Grid markings */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#6E6466 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        {/* Track / Ground surface */}
        <div className="absolute bottom-10 left-0 right-0 h-2 bg-maroon-deep/20 border-t border-maroon-deep/40">
          <div className="flex justify-between px-4 text-[10px] text-sand-subtext pt-2">
            <span>0 m</span>
            <span>5 m</span>
            <span>10 m</span>
            <span>15 m</span>
            <span>20 m</span>
            <span>25 m</span>
          </div>
        </div>

        {/* MODE 1 & 2: Single Block Motion */}
        {(mode === 'second' || mode === 'first') && (
          <div
            className="absolute bottom-12 transition-transform duration-75"
            style={{ transform: `translateX(${pos}px)` }}
          >
            {/* The Block */}
            <div className="relative w-20 h-16 bg-gradient-to-br from-orange to-orange-deep rounded-lg shadow-md border-2 border-orange-deep flex flex-col items-center justify-center text-white font-bold text-xs">
              <span>{mass} kg</span>
              <span className="text-[10px] opacity-80">v = {vel.toFixed(1)} m/s</span>

              {/* Force Vectors */}
              {/* Applied Force Vector (Orange Arrow pointing Right) */}
              {appliedForce > 0 && (
                <div
                  className="absolute left-full top-1/2 -translate-y-1/2 flex items-center ml-1 text-orange-deep font-bold text-[11px] whitespace-nowrap"
                  style={{ width: `${Math.min(120, appliedForce * 2)}px` }}
                >
                  <div className="h-1 bg-orange flex-1 relative">
                    <div className="absolute right-0 -top-1 w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-orange" />
                  </div>
                  <span className="ml-1 bg-orange-pale px-1 rounded text-[10px] border border-orange-light">
                    F = {appliedForce} N
                  </span>
                </div>
              )}

              {/* Opposing Friction Vector (Maroon Arrow pointing Left) */}
              {frictionCoeff > 0 && Math.abs(actualFriction) > 0.1 && (
                <div
                  className="absolute right-full top-1/2 -translate-y-1/2 flex items-center mr-1 text-maroon font-bold text-[11px] flex-row-reverse whitespace-nowrap"
                  style={{ width: `${Math.min(80, Math.abs(actualFriction) * 2)}px` }}
                >
                  <div className="h-1 bg-maroon flex-1 relative">
                    <div className="absolute left-0 -top-1 w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-maroon" />
                  </div>
                  <span className="mr-1 bg-maroon-pale px-1 rounded text-[10px] border border-maroon-light">
                    f = {actualFriction.toFixed(1)} N
                  </span>
                </div>
              )}

              {/* Normal Force Vector (Up) */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 flex flex-col items-center mb-1 text-forest font-semibold text-[10px]">
                <div className="w-1 h-6 bg-forest relative">
                  <div className="absolute top-0 -left-1 w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-forest" />
                </div>
                <span>N = {normalForce.toFixed(0)} N</span>
              </div>

              {/* Gravity Vector (Down) */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center mt-1 text-maroon font-semibold text-[10px]">
                <span>mg = {normalForce.toFixed(0)} N</span>
                <div className="w-1 h-6 bg-maroon relative">
                  <div className="absolute bottom-0 -left-1 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-maroon" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: Action-Reaction Blocks */}
        {mode === 'third' && (
          <>
            {/* Block A (Pushed Left) */}
            <div
              className="absolute bottom-12 transition-transform duration-75"
              style={{ transform: `translateX(${posA}px)` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange to-orange-deep rounded-lg border-2 border-orange-deep flex flex-col items-center justify-center text-white font-bold text-xs shadow-md">
                <span>Block A</span>
                <span>{massA} kg</span>
                <span className="text-[10px]">v = {velA.toFixed(1)}</span>

                {/* Reaction Force on A (Left Arrow) */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center mr-1 flex-row-reverse text-orange font-bold text-[10px] whitespace-nowrap">
                  <div className="h-1 w-12 bg-orange relative">
                    <div className="absolute left-0 -top-1 w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-orange" />
                  </div>
                  <span className="mr-1 bg-orange-pale px-1 rounded text-orange-deep">F_BA = -{contactForce} N</span>
                </div>
              </div>
            </div>

            {/* Block B (Pushed Right) */}
            <div
              className="absolute bottom-12 transition-transform duration-75"
              style={{ transform: `translateX(${posB}px)` }}
            >
              <div className="w-20 h-16 bg-gradient-to-br from-maroon-rich to-maroon-deep rounded-lg border-2 border-maroon-deep flex flex-col items-center justify-center text-white font-bold text-xs shadow-md">
                <span>Block B</span>
                <span>{massB} kg</span>
                <span className="text-[10px]">v = {velB.toFixed(1)}</span>

                {/* Action Force on B (Right Arrow) */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center ml-1 text-maroon font-bold text-[10px] whitespace-nowrap">
                  <div className="h-1 w-12 bg-maroon relative">
                    <div className="absolute right-0 -top-1 w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-maroon" />
                  </div>
                  <span className="ml-1 bg-maroon-pale px-1 rounded text-maroon-deep">F_AB = +{contactForce} N</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Live HUD Dashboard */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-sand-border shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-sand-subtext">Elapsed Time:</span>
            <span className="font-mono font-bold text-maroon-deep">{time.toFixed(2)} s</span>
          </div>
          {mode !== 'third' ? (
            <>
              <div className="flex items-center gap-3">
                <span className="text-sand-subtext">Net Force (F_net):</span>
                <span className="font-mono font-bold text-forest">{netForce.toFixed(1)} N</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sand-subtext">Acceleration (a):</span>
                <span className="font-mono font-bold text-orange-deep">{acceleration.toFixed(2)} m/s²</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sand-subtext">Velocity (v):</span>
                <span className="font-mono font-bold text-forest-fresh">{vel.toFixed(2)} m/s</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sand-subtext">acc(A) = F/m_A:</span>
                <span className="font-mono font-bold text-orange-deep">{accA.toFixed(2)} m/s²</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sand-subtext">acc(B) = F/m_B:</span>
                <span className="font-mono font-bold text-maroon-deep">{accB.toFixed(2)} m/s²</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {mode !== 'third' ? (
          <>
            {/* Mass Slider */}
            <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-sand-text">Object Mass (m)</span>
                <span className="text-orange-deep font-mono">{mass} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={mass}
                onChange={(e) => setMass(parseFloat(e.target.value))}
                className="w-full accent-orange"
              />
              <p className="text-[10px] text-sand-subtext mt-1">Larger mass resists acceleration (Inertia)</p>
            </div>

            {/* Applied Force Slider */}
            <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-sand-text">Applied Force (F)</span>
                <span className="text-orange-deep font-mono">{appliedForce} N</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={appliedForce}
                onChange={(e) => setAppliedForce(parseFloat(e.target.value))}
                className="w-full accent-orange"
              />
              <p className="text-[10px] text-sand-subtext mt-1">External push acting to the right</p>
            </div>

            {/* Friction Coefficient */}
            <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-sand-text">Surface Friction (μ)</span>
                <span className="text-maroon-deep font-mono">{frictionCoeff.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.05"
                value={frictionCoeff}
                onChange={(e) => setFrictionCoeff(parseFloat(e.target.value))}
                className="w-full accent-maroon"
              />
              <p className="text-[10px] text-sand-subtext mt-1">Set to 0.00 for a frictionless floor</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-sand-text">Block A Mass</span>
                <span className="text-orange-deep font-mono">{massA} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={massA}
                onChange={(e) => setMassA(parseFloat(e.target.value))}
                className="w-full accent-orange"
              />
            </div>

            <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-sand-text">Block B Mass</span>
                <span className="text-maroon-deep font-mono">{massB} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={massB}
                onChange={(e) => setMassB(parseFloat(e.target.value))}
                className="w-full accent-maroon"
              />
            </div>

            <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-sand-text">Separation Force (F)</span>
                <span className="text-forest font-mono">{contactForce} N</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={contactForce}
                onChange={(e) => setContactForce(parseFloat(e.target.value))}
                className="w-full accent-forest"
              />
            </div>
          </>
        )}
      </div>

      {/* Primary Action Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
              isRunning ? 'bg-maroon hover:bg-maroon-deep' : 'bg-orange hover:bg-orange-deep'
            }`}
          >
            {isRunning ? <Pause size={14} /> : <Play size={14} />}
            {isRunning ? 'Pause Simulation' : 'Start Simulation'}
          </button>

          <button
            onClick={resetSim}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-sand-muted text-sand-text hover:bg-sand-border transition-colors border border-sand-border"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>

        {/* Speed toggle */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-sand-subtext text-[11px]">Speed:</span>
          {[0.5, 1, 2].map((spd) => (
            <button
              key={spd}
              onClick={() => setSimSpeed(spd)}
              className={`px-2 py-1 rounded text-[11px] font-mono ${
                simSpeed === spd
                  ? 'bg-maroon-deep text-white font-bold'
                  : 'bg-sand-muted text-sand-subtext hover:bg-sand-border'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Physics Insight Box */}
      <div className="mt-4 p-3 bg-forest-pale rounded-xl border border-forest-light text-xs text-forest-deep flex items-start gap-2">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" />
        <div>
          <span className="font-bold">Observation: </span>
          {mode === 'first' && (
            <span>
              When applied force F = 0, notice that if friction μ = 0, the block never slows down—it preserves its velocity indefinitely due to <strong>Inertia of Motion</strong>!
            </span>
          )}
          {mode === 'second' && (
            <span>
              Doubling the mass ({mass} kg) cuts the acceleration in half for the same net force ({netForce.toFixed(1)} N). This verifies <strong>a = F_net / m</strong>.
            </span>
          )}
          {mode === 'third' && (
            <span>
              Notice both blocks experience the exact same force magnitude ({contactForce} N) in opposite directions, but the lighter block ({massA} kg) gains a much higher acceleration ({Math.abs(accA).toFixed(1)} m/s²) than the heavy block ({massB} kg).
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
