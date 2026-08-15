'use client';

import React, { useState, useEffect, useRef } from 'react';

// High-quality mock projects to demonstrate the interaction instantly
const defaultProjectsData = [
  {
    id: 0,
    title: "Personal Finance Tool",
    description: "A personal development financial tool, that helps users to set goals, plan financial transactions, collaborate all in one comprehensive and intuitive space",
    tech: ["HTML", "CSS", "JS", "AWS", "Express", "NodeJS", "PostgreSQL"],
    liveUrl: "https://www.billionairelife.online/?v=0.0.2",
    repoUrl: null,
    imagesrc: "/BillionaireLife.png",
  },    
  {
    id: 1,
    title: "Authentication",
    description: "A full-stack application demonstrating secure user authentication and session management using OAuth 2.0.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "OAuth 2.0"],
    liveUrl: "https://peopleflow.online/",
    repoUrl: "https://github.com/thelocoman/People-Flow",
    imagesrc: "/Authentication.png",
  },
  {
    id: 2,
    title: "Minimalistic Portfolio",
    description: "This minimalistic portfolio website, built with HTML, CSS and JavaScript. Deployed with Amazon S3 static hosting, migrated domain to AWS Route 53, set up CloudFront distribution, and configured IAM for secure access.",
    tech: ["HTML", "CSS", "JS", "AWS"],
    liveUrl: "#",
    repoUrl: "https://github.com/thelocoman/Portfolio-Page",
    imagesrc: "/Portfolio_Page.png",
  },
];

export default function Projects() {
  const projects = defaultProjectsData;
  const deckRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Custom Smooth Scroll States (Lerped for inertial ease)
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameRef = useRef(null);

  // Snapping timer reference
  const snapTimeoutRef = useRef(null);

  // Touch and Drag tracking state
  const touchStartYRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Handle window/viewport dimensions
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, []);

  // Butter-Smooth Lerp Animation Loop
  useEffect(() => {
    const updatePhysics = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.12; // Lerp damping factor
        setScrollProgress(currentProgressRef.current);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        setScrollProgress(targetProgressRef.current);
      }

      // Sync closest index to update the preview panel
      const nextActiveIndex = Math.min(
        projects.length - 1,
        Math.max(0, Math.round(currentProgressRef.current))
      );
      
      setActiveIndex((prev) => (prev !== nextActiveIndex ? nextActiveIndex : prev));

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [projects.length]);

  useEffect(() => {
  const element = deckRef.current;
  if (!element) return;

  const preventGlobalScroll = (e) => {
    // This fully locks the browser viewport from moving while hovering over this div
    e.preventDefault();
  };

  // { passive: false } allows e.preventDefault() to actually stop main page scroll
  element.addEventListener('wheel', preventGlobalScroll, { passive: false });
  
  return () => {
    element.removeEventListener('wheel', preventGlobalScroll);
  };
  }, []);

  // Smooth Scroll Step Function
  const offsetTargetProgress = (delta) => {
    const maxVal = projects.length - 1;
    targetProgressRef.current = Math.min(maxVal, Math.max(0, targetProgressRef.current + delta));
  };

  // Triggers the smooth elastic lock-in to the closest integer
  const snapToNearest = () => {
    targetProgressRef.current = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(targetProgressRef.current))
    );
  };

  // Wheel Event Handler on the Right Deck Card Area
  const handleWheel = (e) => {
    e.preventDefault();
    // Inverted delta calculation to reverse the scroll orientation
    const delta = -e.deltaY * 0.0035; 
    offsetTargetProgress(delta);

    // Debounce snapping mechanism: once user stops scrolling for 150ms, lock-in target
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    snapTimeoutRef.current = setTimeout(() => {
      snapToNearest();
    }, 150);
  };

  // Touch & Swipe Mechanics for Mobile / Trackpad Emulation
  const handleTouchStart = (e) => {
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    touchStartYRef.current = e.touches[0].clientY;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartYRef.current - currentY;
    
    // Inverted delta swipe movement to coordinate with inverted progress
    const deltaProgress = -deltaY * 0.007;
    offsetTargetProgress(deltaProgress);
    touchStartYRef.current = currentY;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    // Snap cleanly on release
    snapToNearest();
  };

  // Move target cleanly to the clicked project index
  const selectAndFocusProject = (index) => {
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    targetProgressRef.current = index;
  };

  // Orbit Positioning Metrics
  const isMobile = dimensions.width < 768;
  
  // Radius of the imaginary circle guide (how deep off-screen the pivot is)
  const radius = isMobile ? dimensions.width * 0.5 : Math.min(dimensions.width * 0.38, 480);

  return (
    <section 
      id="projects" 
      className="relative w-full h-screen bg-gradient-to-b from-[#45daea] to-black text-white overflow-hidden flex !flex-col md:!flex-row select-none !p-0"
    >
      {/* Ambient Sci-Fi Glowing Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#45daea]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />

      </div>

      {/* LEFT PANEL: Dynamic Active Project Preview */}
      <div className="w-full md:w-[45%] md:basis-[65%] h-[45%] h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 z-10 py-6 md:py-0 overflow-y-auto border-b md:border-b-0 border-white/5 bg-slate-950/10 backdrop-blur-sm md:backdrop-blur-none">
        <div className="space-y-4 md:space-y-6 max-w-lg">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-2xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              {projects[activeIndex].title}
            </h2>
          </div>

          {/* Active Image Showcase Box */}
          <div className="group relative aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 hidden sm:block">
            <img 
              src={projects[activeIndex].imagesrc} 
              alt={projects[activeIndex].title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>

          <p className="text-slate-300 text-xs md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
            {projects[activeIndex].description}
          </p>

          {/* Call to Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button 
              onClick={() => setSelectedProject(projects[activeIndex])}
              className="px-5 py-2.5 md:px-6 md:py-3 bg-[#45daea] text-slate-950 text-xs md:text-sm font-bold rounded-xl shadow-[0_4px_20px_rgba(69,218,234,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              Explore Details
            </button>
            
            {projects[activeIndex].repoUrl ? (
              <a 
                href={projects[activeIndex].repoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 md:px-5 md:py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs md:text-sm font-medium transition-all"
              >
                Source
              </a>
            ) : (
              <span className="px-4 py-2.5 md:px-5 md:py-3 text-slate-500 text-xs md:text-sm italic border border-dashed border-white/5 rounded-xl">
                Proprietary
              </span>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: True Physical Wheel Card Deck */}
      <div 
        ref={deckRef}
        className="relative w-full md:w-[55%] h-[55%] md:h-full flex items-center justify-end z-10 cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ perspective: '1200px' }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >


        {/* The Card Deck orbiting physically around the off-screen pivot point */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {projects.map((project, index) => {
            const relativeOffset = index - scrollProgress;
            
            // Angular step in degrees (spacing out the wheel paddles)
            const angularStepDeg = isMobile ? 24 : 18; 
            const angleDeg = relativeOffset * angularStepDeg;

            // Compute physics modifiers based on proximity to active lock-in point
            const distance = Math.abs(relativeOffset);
            const isSelected = activeIndex === index;
            
            // Blend opacity and scale off-focus
            const opacity = Math.max(0, 1 - distance * 0.4);
            const scale = Math.max(0.7, 1 - distance * 0.08);
            const zIndex = 100 - Math.round(distance * 10);

            // Compute additional rotational "twist" and swivelling depth.
            const localRotateZ = -angleDeg * 0.15;
            const localRotateY = -angleDeg * 0.75;

            // Don't render cards that rotate completely off-screen
            if (opacity <= 0.01) return null;

            return (
              <div
                key={project.id}
                className="absolute w-[260px] sm:w-[300px] md:w-[340px] h-[160px] pointer-events-none transition-all duration-300 ease-out"
                style={{
                  right: '0px', 
                  top: 'calc(50% - 80px)', 
                  
                  // Move the rotation origin to the right, exactly matching the circle radius
                  transformOrigin: `calc(100% + ${radius}px) 50%`,
                  
                  // Rotate the container as a single physical spoke on the offscreen wheel
                  transform: `rotate(${angleDeg}deg)`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
              >
                {/* Inner Card executing local turning mechanics */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    selectAndFocusProject(index);
                  }}
                  className={`w-full h-full p-5 md:p-6 rounded-l-2xl rounded-r-none cursor-pointer pointer-events-auto transition-all duration-300 ease-out flex flex-col border-y border-l select-none ${
                    isSelected 
                      ? 'bg-slate-900/95 border-[#45daea] shadow-[-15px_0_35px_rgba(69,218,234,0.25)] ring-1 ring-[#45daea]/30' 
                      : 'bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                  }`}
                  style={{
                    transformOrigin: 'right center', // Attached precisely to the right side
                    transform: `scale(${scale}) rotate(${localRotateZ}deg) rotateY(${localRotateY}deg)`,
                  }}
                >
                  {/* Mechanical hinge clip on the invisible circle edge */}
                  <div className={`absolute right-0 top-0 bottom-0 w-1.5 rounded-l transition-all duration-300 ${
                    isSelected ? 'bg-[#45daea] shadow-[-2px_0_10px_#45daea]' : 'bg-slate-800'
                  }`} />

                  {/* Left side active select glow pin */}
                  {isSelected && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#45daea] rounded-l-md blur-[2px]" />
                  )}

                  <h3 className={`text-base md:text-lg font-bold transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}>
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-[11px] md:text-xs mt-2 line-clamp-2 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Technology Badges Container */}
<div 
  className="flex flex-wrap gap-1 mt-2"
  style={{
    // Counter-rotate the badges to keep them visually "flat" relative to the screen
    transform: `rotateY(${-localRotateY}deg) rotateZ(${-localRotateZ}deg)`,
    transformOrigin: 'left center'
  }}
>
  {project.tech.map((t) => (
    <span 
      key={t} 
      className="text-[8px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-slate-400 font-medium"
    >
      {t}
    </span>
  ))}
</div>


                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PORTFOLIO DETAIL MODAL LAYER */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center z-50 p-4 transition-all duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-800 text-white p-6 md:p-8 rounded-2xl max-w-xl w-full relative shadow-2xl scale-100 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
              onClick={() => setSelectedProject(null)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <span className="text-xs font-bold text-[#45daea] tracking-widest uppercase block mb-1">Project Portfolio</span>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">{selectedProject.title}</h3>
            
            <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 border border-slate-800 bg-neutral-950">
              <img 
                src={selectedProject.imagesrc} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Technologies Employed</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((techItem) => (
                  <span key={techItem} className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-md text-slate-300 font-medium">
                    {techItem}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              {selectedProject.repoUrl ? (
                <a 
                  href={selectedProject.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold border border-slate-700 transition-all"
                >
                  Source Code
                </a>
              ) : (
                <span className="px-5 py-2.5 bg-slate-800/40 text-slate-500 border border-dashed border-slate-800 rounded-xl text-xs flex items-center">
                  Proprietary Repository
                </span>
              )}
              
              <a 
                href={selectedProject.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-2.5 bg-[#45daea] text-slate-950 font-bold rounded-xl text-sm shadow-[0_4px_15px_rgba(69,218,234,0.25)] hover:scale-[1.02] transition-all"
              >
                Launch Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}