'use client';

import React from 'react';
import { PROJECTS_DATA } from '@/data/projectsData';
import { useOrbitPhysics } from '@/hooks/useOrbitPhysics';
import { ProjectPreview } from './projectPreview';
import { ProjectCardDeck } from './projectCardDeck';

/* Projects Section Orchestrator. Single Responsibility: Integrates 3D orbital physics calculations with preview and card deck views. */
export default function ProjectsSection() {
  const projects = PROJECTS_DATA;
  const {
    activeIndex,
    scrollProgress,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    selectAndFocusProject,
  } = useOrbitPhysics(projects.length);

  return (
    <section
      id="projects"
      className="relative w-full h-screen bg-gradient-to-b from-[#45daea] to-black text-white overflow-hidden flex !flex-col md:!flex-row select-none !p-0"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#45daea]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      <ProjectPreview project={projects[activeIndex]} />

      <ProjectCardDeck
        projects={projects}
        scrollProgress={scrollProgress}
        activeIndex={activeIndex}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onSelectProject={selectAndFocusProject}
      />
    </section>
  );
}