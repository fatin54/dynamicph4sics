'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Info, Target, CheckCircle2, XCircle } from 'lucide-react';

export default function ProjectileLab() {
  const [speed, setSpeed] = useState<number>(30); // m/s
  const [angle, setAngle] = useState<number>(45); // degrees
  const [launchHeight, setLaunchHeight] = useState<number>(0); // m
  const [wallDist, setWallDist] = useState<number>(65); // m
  const [wallHeight, setWallHeight] = useState<number>(10); // m

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simTime, setSimTime] = useState<number>(0);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);

  const g = 9.8;
  const rad = (angle * Math.PI) / 180;
  const vx = speed * Math.cos(rad);
  const vy0 = speed * Math.sin(rad);

  // Time of flight (roots of 0 = h0 + vy0 t - 0.5 g t^2)
  const flightTime = (vy0 + Math.sqrt(vy0 * vy0 + 2 * g * launchHeight)) / g;
  const maxHeight = launchHeight + (vy0 * vy0) / (2 * g);
  const range = vx * flightTime;

  // Obstacle clearance calculation
  const tAtWall = vx > 0 ? wallDist / vx : 0;
  const heightAtWall = tAtWall <= flightTime ? launchHeight + vy0 * tAtWall - 0.5 * g * tAtWall * tAtWall : -1;
  const clearsWall = heightAtWall > wallHeight;

  // Animated projectile coordinates
  const [projX, setProjX] = useState<number>(0);
  const [projY, setProjY] = useState<number>(launchHeight);
  const [curVx, setCurVx] = useState<number>(vx);
  const [curVy, setCurVy] = useState<number>(vy0);

  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const resetSim = () => {
    setIsRunning(false);
    setSimTime(0);
    setProjX(0);
    setProjY(launchHeight);
    setCurVx(vx);
    setCurVy(vy0);
    setTrail([]);
    startTimeRef.current = undefined;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const updateFlight = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = ((timestamp - startTimeRef.current) / 1000) * 1.2; // slight speedup

    if (elapsed <= flightTime) {
      setSimTime(elapsed);
      const x = vx * elapsed;
      const y = Math.max(0, launchHeight + vy0 * elapsed - 0.5 * g * elapsed * elapsed);
      const curV_y = vy0 - g * elapsed;

      setProjX(x);
      setProjY(y);
      setCurVx(vx);
      setCurVy(curV_y);
      setTrail((prev) => [...prev.slice(-40), { x, y }]);

      requestRef.current = requestAnimationFrame(updateFlight);
    } else {
      setIsRunning(false);
      setProjX(range);
      setProjY(0);
      setCurVy(vy0 - g * flightTime);
    }
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(updateFlight);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, speed, angle, launchHeight]);

  // Scaled coordinates for canvas viewBox (800 x 300)
  // Max range display scale: 100 m = ~700 px (scale = 7 px/m)
  const scale = 6.2;
  const originX = 50;
  const originY = 260;

  const toPxX = (xMeter: number) => originX + xMeter * scale;
  const toPxY = (yMeter: number) => originY - yMeter * scale;

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-maroon-deep flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange"></span>
            Projectile Motion (প্রাস) Laboratory
          </h3>
          <p className="text-xs text-sand-subtext mt-0.5">
            Explore 2D trajectory parabolas, velocity vector decomposition, and obstacle clearance
          </p>
        </div>

        {/* Clearance Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
          clearsWall
            ? 'bg-forest-pale border-forest-light text-forest-deep'
            : 'bg-maroon-pale border-maroon-light text-maroon-deep'
        }`}>
          {clearsWall ? <CheckCircle2 size={15} className="text-forest" /> : <XCircle size={15} className="text-maroon" />}
          <span>
            {clearsWall
              ? `Clears Wall! (Height at wall: ${heightAtWall.toFixed(1)} m > ${wallHeight} m)`
              : `Hits Wall! (Height at wall: ${heightAtWall.toFixed(1)} m ≤ ${wallHeight} m)`}
          </span>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative bg-sand-bg rounded-xl border border-sand-border p-2 mb-5">
        <svg viewBox="0 0 800 300" className="w-full h-auto">
          {/* Ground level */}
          <line x1="20" y1={originY} x2="780" y2={originY} stroke="#6E6466" strokeWidth="2" />
          <text x="740" y={originY + 18} fontSize="11" fill="#6E6466" fontWeight="bold">Ground (y = 0)</text>

          {/* Launch Tower if launchHeight > 0 */}
          {launchHeight > 0 && (
            <rect
              x={originX - 16}
              y={toPxY(launchHeight)}
              width="20"
              height={launchHeight * scale}
              fill="#E5DDD8"
              stroke="#6E6466"
              strokeWidth="1.5"
            />
          )}

          {/* Obstacle Wall */}
          <rect
            x={toPxX(wallDist) - 5}
            y={toPxY(wallHeight)}
            width="10"
            height={wallHeight * scale}
            fill="#781F3A"
            rx="2"
            opacity="0.85"
          />
          <text
            x={toPxX(wallDist) - 15}
            y={toPxY(wallHeight) - 8}
            fontSize="10"
            fill="#781F3A"
            fontWeight="bold"
          >
            Wall ({wallHeight}m @ {wallDist}m)
          </text>

          {/* Parabolic Trajectory Guide Arc */}
          {Array.from({ length: 60 }).map((_, i) => {
            const frac = i / 60;
            const t = frac * flightTime;
            const x = vx * t;
            const y = Math.max(0, launchHeight + vy0 * t - 0.5 * g * t * t);
            return (
              <circle
                key={i}
                cx={toPxX(x)}
                cy={toPxY(y)}
                r="1.5"
                fill="#F7943D"
                opacity="0.4"
              />
            );
          })}

          {/* Live Trail */}
          {trail.map((p, idx) => (
            <circle
              key={idx}
              cx={toPxX(p.x)}
              cy={toPxY(p.y)}
              r="2"
              fill="#E87524"
              opacity={(idx + 1) / trail.length}
            />
          ))}

          {/* The Flying Projectile */}
          <circle
            cx={toPxX(projX)}
            cy={toPxY(projY)}
            r="6"
            fill="#E87524"
            stroke="#A63D12"
            strokeWidth="2"
          />

          {/* Velocity Vector Components from Projectile */}
          {isRunning && (
            <g>
              {/* Horizontal velocity vx arrow (Green) */}
              <line
                x1={toPxX(projX)}
                y1={toPxY(projY)}
                x2={toPxX(projX) + curVx * 1.5}
                y2={toPxY(projY)}
                stroke="#26734D"
                strokeWidth="2"
              />
              {/* Vertical velocity vy arrow (Orange if up, Maroon if down) */}
              <line
                x1={toPxX(projX)}
                y1={toPxY(projY)}
                x2={toPxX(projX)}
                y2={toPxY(projY) - curVy * 1.5}
                stroke={curVy >= 0 ? '#E87524' : '#781F3A'}
                strokeWidth="2"
              />
            </g>
          )}

          {/* Apex Marker */}
          <line
            x1={toPxX(range / 2)}
            y1={toPxY(maxHeight)}
            x2={toPxX(range / 2)}
            y2={originY}
            stroke="#9AC9A7"
            strokeDasharray="3,3"
          />
          <text
            x={toPxX(range / 2) - 30}
            y={toPxY(maxHeight) - 8}
            fontSize="10"
            fill="#26734D"
            fontWeight="bold"
          >
            H_max = {maxHeight.toFixed(1)} m (v_y = 0)
          </text>
        </svg>

        {/* Live HUD Dashboard */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-sand-border shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-sand-subtext">Flight Time (T):</span>
            <span className="font-mono font-bold text-maroon-deep">{flightTime.toFixed(2)} s</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sand-subtext">Horizontal Range (R):</span>
            <span className="font-mono font-bold text-forest">{range.toFixed(2)} m</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sand-subtext">Max Peak Height (H):</span>
            <span className="font-mono font-bold text-orange-deep">{maxHeight.toFixed(2)} m</span>
          </div>
          <div className="flex items-center gap-3 pt-1 border-t border-sand-border">
            <span className="text-sand-subtext">Current v_x:</span>
            <span className="font-mono font-bold text-forest">{curVx.toFixed(1)} m/s (Constant)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sand-subtext">Current v_y:</span>
            <span className={`font-mono font-bold ${curVy >= 0 ? 'text-orange-deep' : 'text-maroon-deep'}`}>
              {curVy.toFixed(1)} m/s {curVy >= 0 ? '↑' : '↓'}
            </span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
        {/* Speed */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Launch Speed (V₀)</span>
            <span className="text-orange-deep font-mono">{speed} m/s</span>
          </div>
          <input
            type="range" min="10" max="50" step="1" value={speed}
            onChange={(e) => { setSpeed(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-orange"
          />
        </div>

        {/* Angle */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Elevation Angle (θ₀)</span>
            <span className="text-maroon-deep font-mono">{angle}°</span>
          </div>
          <input
            type="range" min="15" max="80" step="1" value={angle}
            onChange={(e) => { setAngle(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-maroon"
          />
          <span className="text-[10px] text-sand-subtext">Max range occurs at 45°</span>
        </div>

        {/* Launch Height */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Launch Elevation (h₀)</span>
            <span className="text-sand-text font-mono">{launchHeight} m</span>
          </div>
          <input
            type="range" min="0" max="25" step="1" value={launchHeight}
            onChange={(e) => { setLaunchHeight(parseFloat(e.target.value)); resetSim(); }}
            className="w-full accent-sand-text"
          />
          <span className="text-[10px] text-sand-subtext">Rooftop / Cliff drop</span>
        </div>

        {/* Obstacle Distance */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Wall Distance</span>
            <span className="text-forest font-mono">{wallDist} m</span>
          </div>
          <input
            type="range" min="20" max="95" step="5" value={wallDist}
            onChange={(e) => setWallDist(parseFloat(e.target.value))}
            className="w-full accent-forest"
          />
        </div>

        {/* Obstacle Height */}
        <div className="bg-sand-muted p-2.5 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span>Wall Height</span>
            <span className="text-forest font-mono">{wallHeight} m</span>
          </div>
          <input
            type="range" min="2" max="25" step="1" value={wallHeight}
            onChange={(e) => setWallHeight(parseFloat(e.target.value))}
            className="w-full accent-forest"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { resetSim(); setIsRunning(true); }}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-orange hover:bg-orange-deep transition-all shadow-sm"
        >
          <Play size={14} />
          Fire Projectile!
        </button>

        <button
          onClick={resetSim}
          className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold bg-sand-muted text-sand-text hover:bg-sand-border transition-colors border border-sand-border"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      {/* Board Exam Note */}
      <div className="mt-4 p-3 bg-forest-pale rounded-xl border border-forest-light text-xs text-forest-deep flex items-start gap-2">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" />
        <div>
          <span className="font-bold">Board Exam Focus: </span>
          Notice that the green horizontal velocity arrow <em>v_x = {vx.toFixed(1)} m/s</em> remains 100% constant the entire journey. At the highest apex ({maxHeight.toFixed(1)} m), the vertical velocity arrow shrinks to zero, so the resultant speed is simply <em>v_x = {vx.toFixed(1)} m/s</em>.
        </div>
      </div>
    </div>
  );
}
