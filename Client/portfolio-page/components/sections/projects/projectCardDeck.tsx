import React, { useEffect, useRef, useState } from 'react';
import { Project } from '@/types/projects.types';
import { ProjectCard } from './projectCard';

interface ProjectCardDeckProps {
  projects: Project[];
  scrollProgress: number;
  activeIndex: number;
  onWheel: (e: React.WheelEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onSelectProject: (index: number) => void;
}

/* Project Card Deck Wrapper. Single Responsibility: Encapsulates the revolving orbital deck wrapper, touch events, and viewport measurements. */
export function ProjectCardDeck({
  projects,
  scrollProgress,
  activeIndex,
  onWheel,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onSelectProject,
}: ProjectCardDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const element = deckRef.current;
    if (!element) return;

    const preventGlobalScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    element.addEventListener('wheel', preventGlobalScroll, { passive: false });
    return () => element.removeEventListener('wheel', preventGlobalScroll);
  }, []);

  const isMobile = dimensions.width < 768;
  const radius = isMobile ? dimensions.width * 0.5 : Math.min(dimensions.width * 0.38, 480);

  return (
    <div
      ref={deckRef}
      className="relative w-full md:w-[55%] h-[55%] md:h-full flex items-center justify-end z-10 cursor-grab active:cursor-grabbing overflow-hidden"
      style={{ perspective: '1200px' }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            scrollProgress={scrollProgress}
            activeIndex={activeIndex}
            radius={radius}
            isMobile={isMobile}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </div>
  );
}