'use client';

import { SKILLS_DECK_DATA } from '../../../data/skills-data';
import { useOrbitPhysics } from '../../../hooks/useOrbitPhysics';
import { SkillDeck } from './skillDeck';
import { SkillDetailPanel } from './skillDetail';

/* Section view integrating the interactive 3D skill orbit deck and the detail breakdown sidebar. */
export default function Skills() {
  const items = SKILLS_DECK_DATA;
  
  // Custom hook handling orbital calculations and scroll state
  const {
    activeIndex,
    scrollProgress,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    selectAndFocusProject,
  } = useOrbitPhysics(items.length);

  return (
    <section
      id="skills"
      className="relative w-full h-screen bg-[#45daea] text-slate-950 overflow-hidden flex !flex-col-reverse md:!flex-row !items-stretch !justify-start !p-0 select-none"
    >
      {/* Visual ambient lighting glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#45daea]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      {/* 3D Orbit Deck */}
      <SkillDeck
        items={items}
        scrollProgress={scrollProgress}
        activeIndex={activeIndex}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onSelectProject={selectAndFocusProject}
      />

      {/* Item Detail Inspector Panel */}
      <SkillDetailPanel activeItem={items[activeIndex]} />
    </section>
  );
}