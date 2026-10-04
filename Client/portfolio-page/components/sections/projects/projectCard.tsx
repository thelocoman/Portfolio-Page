import React from 'react';
import { Project } from '@/types/projects.types';
import { calculateRightOrbitMetrics } from '@/utils/orbitGeometry';
import { TechMarquee } from './techMarquee';

interface ProjectCardProps {
  project: Project;
  index: number;
  scrollProgress: number;
  activeIndex: number;
  radius: number;
  isMobile: boolean;
  onSelect: (index: number) => void;
}

/* Project Orbit Card. Single Responsibility: Renders a single orbiting project card, computing trigonometric 3D rotation and scale. */
export function ProjectCard({
  project,
  index,
  scrollProgress,
  activeIndex,
  radius,
  isMobile,
  onSelect,
}: ProjectCardProps) {
  const metrics = calculateRightOrbitMetrics(index, scrollProgress, activeIndex, isMobile);

  if (metrics.opacity <= 0.01) return null;

  return (
    <div
      className="absolute w-[260px] sm:w-[300px] md:w-[340px] h-[160px] pointer-events-none transition-all duration-300 ease-out"
      style={{
        right: '0px',
        top: 'calc(50% - 80px)',
        transformOrigin: `calc(100% + ${radius}px) 50%`,
        transform: `rotate(${metrics.angleDeg}deg)`,
        opacity: metrics.opacity,
        zIndex: metrics.zIndex,
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
        className={`w-full h-full p-5 md:p-6 rounded-l-2xl rounded-r-none cursor-pointer pointer-events-auto transition-all duration-300 ease-out flex flex-col border-y border-l select-none ${
          metrics.isSelected
            ? 'bg-slate-900/95 border-[#45daea] shadow-[-15px_0_35px_rgba(69,218,234,0.25)] ring-1 ring-[#45daea]/30'
            : 'bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
        }`}
        style={{
          transformOrigin: 'right center',
          transform: `scale(${metrics.scale}) rotate(${metrics.localRotateZ}deg) rotateY(${metrics.localRotateY}deg)`,
        }}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-1.5 rounded-l transition-all duration-300 ${
            metrics.isSelected ? 'bg-[#45daea] shadow-[-2px_0_10px_#45daea]' : 'bg-slate-800'
          }`}
        />

        {metrics.isSelected && (
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#45daea] rounded-l-md blur-[2px]" />
        )}

        <h3 className={`text-base md:text-lg font-bold transition-colors ${
          metrics.isSelected ? 'text-white' : 'text-slate-300'
        }`}>
          {project.domain}
        </h3>

        <p className="text-xs">Technologies Used:</p>
        <TechMarquee
          tech={project.tech}
          localRotateY={metrics.localRotateY}
          localRotateZ={metrics.localRotateZ}
        />
      </div>
    </div>
  );
}