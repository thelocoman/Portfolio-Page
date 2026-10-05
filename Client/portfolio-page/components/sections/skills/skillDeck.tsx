import React, { useEffect, useRef, useState } from 'react';
import { DeckItem } from '../../../types/skills.types';
import { calculateLeftOrbitMetrics } from '../../../utils/orbitGeometry';
import { SkillTitleCard } from './skillTitleCard';
import { SkillSubtitleCard } from './skillSubtitleCard';
import { SkillCard } from './skillCard';

interface SkillDeckProps {
  items: DeckItem[];
  scrollProgress: number;
  activeIndex: number;
  onWheel: (e: React.WheelEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onSelectProject: (index: number) => void;
}

/* Container component orchestrating mouse wheel, touch gestures, screen sizing, and rendering polymorphic deck cards along an orbital path. */
export function SkillDeck({
  items,
  scrollProgress,
  activeIndex,
  onWheel,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onSelectProject,
}: SkillDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  // Update deck boundaries when window resizes
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent parent scroll overflow while interacting with the deck wheel
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
      className="relative w-full md:w-[54%] h-[55%] md:h-full flex items-center justify-start z-10 cursor-grab active:cursor-grabbing overflow-hidden"
      style={{ perspective: '1200px' }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {items.map((item, index) => {
          // Render Main Title Card
          if (item.type === 'title') {
            const distance = Math.abs(index - scrollProgress);
            const scale = Math.max(0.7, 1 - distance * 0.08);
            const zIndex = 100 - Math.round(distance * 10);

            return (
              <SkillTitleCard
                key={item.id}
                item={item}
                distance={distance}
                scale={scale}
                zIndex={zIndex}
              />
            );
          }

          // Render Subtitle Header Card
          if (item.type === 'subtitle') {
            const metrics = calculateLeftOrbitMetrics(index, scrollProgress, activeIndex, isMobile);
            return (
              <SkillSubtitleCard
                key={item.id}
                item={item}
                angleDeg={metrics.angleDeg}
                opacity={metrics.opacity}
                scale={metrics.scale}
                zIndex={metrics.zIndex}
                localRotateZ={metrics.localRotateZ}
                localRotateY={metrics.localRotateY}
                radius={radius}
              />
            );
          }

          // Render Interactive Skill Card
          return (
            <SkillCard
              key={item.id}
              item={item}
              index={index}
              scrollProgress={scrollProgress}
              activeIndex={activeIndex}
              radius={radius}
              isMobile={isMobile}
              onSelect={onSelectProject}
            />
          );
        })}
      </div>
    </div>
  );
}