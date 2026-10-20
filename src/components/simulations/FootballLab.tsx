'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Info, Sparkles } from 'lucide-react';

export default function FootballLab() {
  const [ballMass, setBallMass] = useState<number>(0.45); // kg (standard FIFA match ball)
  const [kickForce, setKickForce] = useState<number>(450); // N
  const [contactTime, setContactTime] = useState<number>(0.025); // seconds (10 to 50 ms)
  const [launchAngle, setLaunchAngle] = useState<number>(30); // degrees
  const [isKicking, setIsKicking] = useState<boolean>(false);

  // Calculated Impulse & Physics
  const impulse = kickForce * contactTime; // N·s or kg·m/s
  const launchSpeed = impulse / ballMass; // m/s
  const g = 9.8;
  const rad = (launchAngle * Math.PI) / 180;
  const maxHeight = (launchSpeed * launchSpeed * Math.sin(rad) * Math.sin(rad)) / (2 * g);
  const flightTime = (2 * launchSpeed * Math.sin(rad)) / g;
  const range = (launchSpeed * launchSpeed * Math.sin(2 * rad)) / g;

  // Ball animation state
  const [ballX, setBallX] = useState<number>(40);
  const [ballY, setBallY] = useState<number>(20);
  const [simTime, setSimTime] = useState<number>(0);
  const [scored, setScored] = useState<boolean>(false);

  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const resetKick = () => {
    setIsKicking(false);
    setBallX(40);
    setBallY(20);
    setSimTime(0);
    setScored(false);
    startTimeRef.current = undefined;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const startKick = () => {
    resetKick();
    setIsKicking(true);
  };

  const animateBall = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current) / 1000; // actual elapsed seconds
    const t = elapsed * 1.5; // slight speedup factor

    if (t <= flightTime && flightTime > 0) {
      setSimTime(t);
      // Kinematics trajectory coordinates
      const xMeter = launchSpeed * Math.cos(rad) * t;
      const yMeter = launchSpeed * Math.sin(rad) * t - 0.5 * g * t * t;

      // Scale to canvas (scale: 12 px per meter)
      const pxX = 40 + xMeter * 11;
      const pxY = 20 + Math.max(0, yMeter) * 9;
      setBallX(pxX);
      setBallY(pxY);

      // Check if entering goal net (positioned at ~520px)
      if (pxX >= 480 && pxX <= 540 && pxY >= 10 && pxY <= 90) {
        setScored(true);
      }

      requestRef.current = requestAnimationFrame(animateBall);
    } else {
      // Hit ground
      setIsKicking(false);
      setBallY(20);
      setBallX(40 + Math.min(range, 50) * 11);
    }
  };

  useEffect(() => {
    if (isKicking) {
      requestRef.current = requestAnimationFrame(animateBall);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isKicking]);

  return (
    <div className="bg-sand-surface rounded-2xl border border-sand-border p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-border pb-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-maroon-deep flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange"></span>
            Football Physics: Impulse &amp; Momentum Lab
          </h3>
          <p className="text-xs text-sand-subtext mt-0.5">
            Discover how contact duration and kick force create launch momentum (J = F Δt = Δp = mv)
          </p>
        </div>
      </div>

      {/* Football Pitch Visual Scene */}
      <div className="relative bg-gradient-to-b from-[#1C4E35] to-[#153D2B] rounded-xl border border-sand-border h-64 overflow-hidden mb-5">
        {/* Grass field stripes */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #FFFFFF 0px, #FFFFFF 2px, transparent 2px, transparent 40px)',
        }} />

        {/* Goal Post (Right edge) */}
        <div className="absolute bottom-5 right-12 w-14 h-28 border-4 border-white/80 border-b-0 rounded-t-sm flex items-center justify-center bg-white/5">
          <div className="w-full h-full opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #FFF 0, #FFF 1px, transparent 0, transparent 8px), repeating-linear-gradient(-45deg, #FFF 0, #FFF 1px, transparent 0, transparent 8px)',
          }} />
          <span className="absolute -top-5 text-[10px] text-white font-bold bg-maroon-deep/80 px-1.5 py-0.5 rounded">
            GOAL
          </span>
        </div>

        {/* The Football */}
        <div
          className="absolute transition-transform duration-75"
          style={{
            left: `${ballX}px`,
            bottom: `${ballY}px`,
          }}
        >
          <div className="relative w-7 h-7 bg-white rounded-full border-2 border-slate-900 shadow-lg flex items-center justify-center">
            {/* Soccer pentagon details */}
            <div className="w-2.5 h-2.5 bg-slate-900 rotate-45 rounded-[2px]" />
          </div>
        </div>

        {/* Kicker representation at left */}
        <div className="absolute bottom-5 left-4 flex flex-col items-center">
          <div className="text-xs font-bold text-orange-light mb-1">Kicker</div>
          <div className="w-6 h-12 bg-orange-deep rounded-t-md" />
        </div>

        {/* Goal celebration banner */}
        {scored && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-forest px-4 py-2 rounded-xl text-white font-extrabold text-sm shadow-lg flex items-center gap-2 animate-bounce">
            <Sparkles size={16} />
            GOAL! Shot entered the target net!
          </div>
        )}

        {/* Real-time calculated HUD */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-sand-border shadow-sm text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Impulse (J = F Δt):</span>
            <span className="font-mono font-bold text-orange-deep">{impulse.toFixed(2)} N·s</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Launch Speed (v = J/m):</span>
            <span className="font-mono font-bold text-forest">{launchSpeed.toFixed(2)} m/s ({ (launchSpeed * 3.6).toFixed(1) } km/h)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Estimated Range (R):</span>
            <span className="font-mono font-bold text-maroon-deep">{range.toFixed(2)} m</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sand-subtext">Peak Elevation (H):</span>
            <span className="font-mono font-bold text-sand-text">{maxHeight.toFixed(2)} m</span>
          </div>
        </div>
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Force Slider */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-sand-text">Kicking Force (F)</span>
            <span className="text-orange-deep font-mono">{kickForce} N</span>
          </div>
          <input
            type="range"
            min="100"
            max="1200"
            step="50"
            value={kickForce}
            onChange={(e) => setKickForce(parseFloat(e.target.value))}
            className="w-full accent-orange"
          />
          <p className="text-[10px] text-sand-subtext mt-1">Average muscular leg impact force</p>
        </div>

        {/* Contact Duration Slider (Follow-through) */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-sand-text">Contact Duration (Δt)</span>
            <span className="text-orange-deep font-mono">{(contactTime * 1000).toFixed(0)} ms</span>
          </div>
          <input
            type="range"
            min="0.010"
            max="0.050"
            step="0.005"
            value={contactTime}
            onChange={(e) => setContactTime(parseFloat(e.target.value))}
            className="w-full accent-orange"
          />
          <p className="text-[10px] text-sand-subtext mt-1">Extended by good follow-through</p>
        </div>

        {/* Launch Angle */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-sand-text">Elevation Angle (θ)</span>
            <span className="text-maroon-deep font-mono">{launchAngle}°</span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={launchAngle}
            onChange={(e) => setLaunchAngle(parseFloat(e.target.value))}
            className="w-full accent-maroon"
          />
          <p className="text-[10px] text-sand-subtext mt-1">Angle above horizontal turf</p>
        </div>

        {/* Ball Mass */}
        <div className="bg-sand-muted p-3 rounded-xl border border-sand-border">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-sand-text">Ball Mass (m)</span>
            <span className="text-forest font-mono">{ballMass.toFixed(2)} kg</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="0.8"
            step="0.05"
            value={ballMass}
            onChange={(e) => setBallMass(parseFloat(e.target.value))}
            className="w-full accent-forest"
          />
          <p className="text-[10px] text-sand-subtext mt-1">FIFA match ball is ~0.45 kg</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={startKick}
          disabled={isKicking}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-orange hover:bg-orange-deep transition-all shadow-sm disabled:opacity-50"
        >
          <Play size={14} />
          Kick the Ball!
        </button>

        <button
          onClick={resetKick}
          className="flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold bg-sand-muted text-sand-text hover:bg-sand-border transition-colors border border-sand-border"
        >
          <RotateCcw size={13} />
          Reset Position
        </button>
      </div>

      {/* Physics Insight */}
      <div className="mt-4 p-3 bg-forest-pale rounded-xl border border-forest-light text-xs text-forest-deep flex items-start gap-2">
        <Info size={16} className="mt-0.5 shrink-0 text-forest" />
        <div>
          <span className="font-bold">Sports Physics Secret: </span>
          Notice that keeping the force constant at {kickForce} N while doubling contact time from 15 ms to 30 ms doubles the Impulse from {(kickForce * 0.015).toFixed(1)} N·s to {(kickForce * 0.030).toFixed(1)} N·s! That is why football coaches always insist: <em>&ldquo;Follow through with your kicking leg!&rdquo;</em>
        </div>
      </div>
    </div>
  );
}
