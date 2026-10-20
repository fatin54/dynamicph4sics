'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FlaskConical,
  Zap,
  Target,
  ArrowRight,
  Calculator,
  Compass,
  RotateCw,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

import NewtonLab from '@/components/simulations/NewtonLab';
import FootballLab from '@/components/simulations/FootballLab';
import CollisionLab from '@/components/simulations/CollisionLab';
import FrictionLab from '@/components/simulations/FrictionLab';
import PulleyLab from '@/components/simulations/PulleyLab';
import ImpulseLab from '@/components/simulations/ImpulseLab';
import ProjectileLab from '@/components/simulations/ProjectileLab';
import FallingBodyLab from '@/components/simulations/FallingBodyLab';
import MotionGraphsLab from '@/components/simulations/MotionGraphsLab';
import CircularMotionLab from '@/components/simulations/CircularMotionLab';

const LABS = [
  { id: 'projectile', title: 'Projectile (প্রাস) Lab', category: 'Chapter 3', icon: Target },
  { id: 'motion-graphs', title: 'Motion Graphs (s-t, v-t, a-t)', category: 'Chapter 3', icon: TrendingUp },
  { id: 'falling-bodies', title: 'Galileo Falling Bodies', category: 'Chapter 3', icon: ShieldCheck },
  { id: 'circular', title: 'Circular Motion & Centripetal', category: 'Chapter 3', icon: RotateCw },
  { id: 'newton', title: 'Newton\'s Laws & Inertia', category: 'Chapter 4 Bridge', icon: Zap },
  { id: 'football', title: 'Football Impulse & Momentum', category: 'Chapter 4 Bridge', icon: FlaskConical },
  { id: 'collision', title: 'Collision Lab (Elastic/Inelastic)', category: 'Chapter 4 Bridge', icon: Compass },
  { id: 'friction', title: 'Friction & Incline Plane', category: 'Chapter 4 Bridge', icon: Calculator },
  { id: 'pulley', title: 'Atwood Machine & Pulleys', category: 'Chapter 4 Bridge', icon: FlaskConical },
  { id: 'impulse', title: 'Force-Time Area Graph', category: 'Chapter 4 Bridge', icon: TrendingUp },
];

function LabContent() {
  const searchParams = useSearchParams();
  const initialSim = searchParams.get('sim') || 'projectile';
  const [activeLabId, setActiveLabId] = useState<string>(initialSim);

  const activeLab = LABS.find((l) => l.id === activeLabId) || LABS[0];

  const renderActiveLab = () => {
    switch (activeLabId) {
      case 'projectile':
        return <ProjectileLab />;
      case 'motion-graphs':
        return <MotionGraphsLab />;
      case 'falling-bodies':
        return <FallingBodyLab />;
      case 'circular':
        return <CircularMotionLab />;
      case 'newton':
        return <NewtonLab />;
      case 'football':
        return <FootballLab />;
      case 'collision':
        return <CollisionLab />;
      case 'friction':
        return <FrictionLab />;
      case 'pulley':
        return <PulleyLab />;
      case 'impulse':
        return <ImpulseLab />;
      default:
        return <ProjectileLab />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-pale text-orange-deep text-xs font-semibold mb-2 border border-orange-light">
            <FlaskConical size={14} />
            <span>Interactive Virtual Experiment Suite</span>
          </div>
          <h1 className="text-3xl font-black text-maroon-deep tracking-tight">
            Interactive Physics Laboratory
          </h1>
          <p className="text-xs sm:text-sm text-sand-subtext mt-1 max-w-2xl">
            Live browser-based physics experiments. Real mathematical calculations, live vector arrows, adjustable parameters, and direct physical feedback.
          </p>
        </div>
      </div>

      {/* Lab Selector Horizontal Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {LABS.map((lab) => {
          const Icon = lab.icon;
          const isSelected = lab.id === activeLabId;
          return (
            <button
              key={lab.id}
              onClick={() => setActiveLabId(lab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                isSelected
                  ? 'bg-orange text-white border-orange-deep shadow-sm'
                  : 'bg-sand-surface text-sand-text border-sand-border hover:border-orange hover:bg-sand-muted'
              }`}
            >
              <Icon size={14} className={isSelected ? 'text-white' : 'text-sand-subtext'} />
              <span>{lab.title}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-normal ${
                isSelected ? 'bg-orange-deep text-white' : 'bg-sand-muted text-sand-subtext'
              }`}>
                {lab.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Laboratory Container */}
      <div className="space-y-4">
        {renderActiveLab()}
      </div>
    </div>
  );
}

export default function LabPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-sand-subtext text-sm">Loading Physics Laboratory...</p>
      </div>
    }>
      <LabContent />
    </Suspense>
  );
}
