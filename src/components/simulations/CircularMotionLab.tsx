'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Info, Scissors } from 'lucide-react';

export default function CircularMotionLab() {
  const [radius, setRadius] = useState<number>(1.0); // meters
  const [rpm, setRpm] = useState<number>(45); // revolutions per minute
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isSnapped, setIsSnapped] = useState<boolean>(false);

  // Angular kinematics
  const omega = (2 * Math.PI * rpm) / 60; // rad/s
  const linearSpeed = omega * radius; // m/s
  const centripetalAcc = omega * omega * radius; // m/s²
  const period = omega > 0 ? (2 * Math.PI) / omega : 0; // s
  const frequency = 1 / period;

  // Particle position
  const [angle, setAngle] = useState<number>(0); // radians
  const [tangentPos, setTangentPos] = useState<{ x: number; y: number; vx: number; vy: number }>({ x: 0, y: 0, vx: 0, vy: 0 });

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const resetSim = () => {
    setIsSnapped(false);
    setAngle(0);
    setIsRunning(true);
    lastTimeRef.current = undefined;
  };

  const snapString = () => {
    if (!isSnapped) {
      setIsSnapped(true);
      // Tangent velocity vector at current angle
      // r(t) = (r cos θ, r sin θ); v(t) = (-v sin θ, v cos θ)
      const pxX = centerX + radius * scale * Math.cos(angle);
      const pxY = centerY + radius * scale * Math.sin(angle);
      const vx = -linearSpeed * Math.sin(angle);
      const vy = linearSpeed * Math.cos(angle);
      setTangentPos({ x: pxX, y: pxY, vx, vy });
    }
  };

  const updateOrbit = (timestamp: number) => {
    if (lastTimeRef.current !== undefined) {
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);

      if (!isSnapped) {
        setAngle((prev) => (prev + omega * dt) % (2 * Math.PI));
      } else {
        // Fly straight along tangent
        setTangentPos((p) => ({
          ...p,
          x: p.x + p.vx * dt * 30,
          y: p.y + p.vy * dt * 30,
        }));
      }
    }
    lastTimeRef.current = timestamp;
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateOrbit);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateOrbit);
    } else {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, omega, isSnapped]);

  // Visual layout
  const centerX = 200;
  const centerY = 130;
  const scale = 75; // px per meter

  const particleX = !isSnapped ? centerX + radius * scale * Math.cos(angle) : tangentPos.x;
  const particleY = !isSnapped ? centerY + radius * scale * Math.sin(angle) : tangentPos.y;

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-maroon-deep flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange"></span>
            Uniform Circular Motion &amp; Centripetal Acceleration Lab
          </h3>
          <p className="text-xs text-sand-subtext mt-0.5">
            Understand why circular motion at constant speed is accelerated motion (v ⊥ a_c)
          </p>
        </div>

        {/* Snap string action */}
        <button
          onClick={snapString}
          disabled={isSnapped}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-maroon-pale border border-maroon-light text-maroon-deep hover:bg-maroon hover:text-white transition-all disabled:opacity-40"
        >
          <Scissors size={14} />
          {isSnapped ? 'String Snapped!' : 'Cut String (Newton 1st Law Test)'}
        </button>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative bg-sand-bg rounded-xl border border-sand-border h-68 overflow-hidden mb-5 flex justify-center items-center">
        <svg viewBox="0 0 400 260" className="w-full max-w-lg h-auto">
          {/* Circular Orbit Path */}
          <circle
            cx={centerX} cy={centerY}
            r={radius * scale}
            fill="none" stroke="#E5DDD8" strokeWidth="2" strokeDasharray="4,4"
          />

          {/* Central Pivot Axis */}
          <circle cx={centerX} cy={centerY} r="6" fill="#781F3A" />
          <text x={centerX - 15} y={centerY - 10} fontSize="10" fill="#781F3A" fontWeight="bold">Center O</text>

          {/* String to particle if not snapped */}
          {!isSnapped && (
            <line
              x1={centerX} y1={centerY}
              x2={particleX} y2={particleY}
              stroke="#6E6466" strokeWidth="1.5"
            />
          )}

          {/* The Revolving Particle */}
          <circle
            cx={particleX} cy={particleY}
            r="8" fill="#E87524" stroke="#A63D12" strokeWidth="2"
          />

          {/* Vectors (only when attached to circle) */}
          {!isSnapped && (
            <g>
              {/* Tangent Velocity Vector (Green Arrow) */}
              <line
                x1={particleX} y1={particleY}
                x2={particleX - Math.sin(angle) * 35}
                y2={particleY + Math.cos(angle) * 35}
                stroke="#26734D" strokeWidth="2.5"
              />
              <text
                x={particleX - Math.sin(angle) * 42}
                y={particleY + Math.cos(angle) * 42}
                fontSize="10" fill="#26734D" fontWeight="bold"
              >
                v ({linearSpeed.toFixed(1)} m/s)
              </text>

              {/* Centripetal Acceleration Vector (Maroon Arrow pointing to center) */}
              <line
                x1={particleX} y1={particleY}
                x2={particleX - Math.cos(angle) * 35}
                y2={particleY - Math.sin(angle) * 35}
                stroke="#781F3A" strokeWidth="2.5"
              />
              <text
                x={particleX - Math.cos(angle) * 45}
                y={particleY - Math.sin(angle) * 45}
                fontSize="10" fill="#781F3A" fontWeight="bold"
              >
                a_c ({centripetalAcc.toFixed(1)} m/s²)
              </text>
            </g>
          )}
        </svg>

        {/* Live HUD Box */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-sand-border shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Angular Speed (ω):</span>
            <span className="font-mono font-bold text-orange-deep">{omega.toFixed(2)} rad/s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Linear Speed (v = ω r):</span>
            <span className="font-mono font-bold text-forest">{linearSpeed.toFixed(2)} m/s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Centripetal Accel (a_c = v²/r):</span>
            <span className="font-mono font-bold text-maroon-deep">{centripetalAcc.toFixed(2)} m/s²</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Period (T = 2π/ω):</span>
            <span className="font-mono text-sand-text">{period.toFixed(2)} s ({frequency.toFixed(2)} Hz)</span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Radius */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Radius of Circle (r)</span>
            <span className="text-orange-deep font-mono">{radius.toFixed(2)} m</span>
          </div>
          <input
            type="range" min="0.4" max="1.5" step="0.1" value={radius}
            onChange={(e) => setRadius(parseFloat(e.target.value))}
            className="w-full accent-orange"
          />
        </div>

        {/* RPM */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Rotation Speed (RPM)</span>
            <span className="text-maroon-deep font-mono">{rpm} rpm</span>
          </div>
          <input
            type="range" min="10" max="120" step="5" value={rpm}
            onChange={(e) => setRpm(parseFloat(e.target.value))}
            className="w-full accent-maroon"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange hover:bg-orange-deep transition-all shadow-sm"
        >
          {isRunning ? <Pause size={14} /> : <Play size={14} />}
          {isRunning ? 'Pause' : 'Resume'}
        </button>

        <button
          onClick={resetSim}
          className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-sand-muted text-sand-text hover:bg-sand-border transition-colors border border-sand-border"
        >
          <RotateCcw size={13} />
          Reset Orbit
        </button>
      </div>

      {/* Insight */}
      <div className="mt-3 p-3 bg-forest-pale rounded-xl border border-forest-light text-xs text-forest-deep flex items-start gap-2">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" />
        <div>
          <span className="font-bold">What happens when the string snaps? </span>
          Click &ldquo;Cut String&rdquo;! The stone does NOT fly radially outward; it flies along the <strong>straight tangent line</strong> with its instantaneous velocity <em>v = {linearSpeed.toFixed(1)} m/s</em>, obeying Newton&apos;s First Law of Motion!
        </div>
      </div>
    </div>
  );
}
