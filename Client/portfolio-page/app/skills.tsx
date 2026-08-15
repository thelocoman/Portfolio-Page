'use client';

import React, { useState, useEffect, useRef } from 'react';

const skills = [
  { name: 'HTML', icon: 'devicon-html5-plain colored', description: 'Expertise in semantic HTML5 for accessible and SEO-friendly web structures.' },
  { name: 'CSS', icon: 'devicon-css3-plain colored', description: 'Expertise in semantic HTML5 for accessible and SEO-friendly web structures.' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored', description: 'Expertise in semantic HTML5 for accessible and SEO-friendly web structures.' },
  { name: 'NodeJS', icon: 'devicon-nodejs-plain colored', description: 'Expertise in semantic HTML5 for accessible and SEO-friendly web structures.' },
  { name: 'Express', icon: 'devicon-express-original', description: 'Expertise in semantic HTML5 for accessible and SEO-friendly web structures.' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', description: 'Expertise in semantic HTML5 for accessible and SEO-friendly web structures.' },
  { name: 'AWS', icon: 'devicon-amazonwebservices-plain colored', description: 'Expertise in semantic HTML5 for accessible and SEO-friendly web structures.' },
];

// High-quality mock projects to demonstrate the interaction instantly
const defaultProjectsData = [
  { id: 'title-1', type: 'title', title: 'Technical Skills' },
  ...skills.map((s, i) => ({ id: `skill-${i}`, type: 'skill', title: s.name, icon: s.icon, description: s.description}))
];

export default function Skills() {
  const projects = defaultProjectsData;
  const deckRef = useRef(null)

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
      
      if (Math.abs(diff) > 0.01) {
        currentProgressRef.current += diff * 0.25; // Lerp damping factor
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
      e.preventDefault();
    };

    element.addEventListener('wheel', preventGlobalScroll, { passive: false });
    return () => element.removeEventListener('wheel', preventGlobalScroll);
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

  // Wheel Event Handler on the Left Deck Card Area
  const handleWheel = (e) => {
    e.preventDefault();
    // Standard delta calculation: scrolling down is positive (moves index up)
    const delta = e.deltaY * 0.0015; 
    offsetTargetProgress(delta);

    // Debounce snapping mechanism
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    snapTimeoutRef.current = setTimeout(() => {
      snapToNearest();
    }, 50);
  };

  // Touch & Swipe Mechanics
  const handleTouchStart = (e) => {
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    touchStartYRef.current = e.touches[0].clientY;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartYRef.current - currentY;
    
    // Standard swipe direction
    const deltaProgress = deltaY * 0.007;
    offsetTargetProgress(deltaProgress);
    touchStartYRef.current = currentY;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    snapToNearest();
  };

  const selectAndFocusProject = (index) => {
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    targetProgressRef.current = index;
  };

  const isMobile = dimensions.width < 768;
  const radius = isMobile ? dimensions.width * 0.5 : Math.min(dimensions.width * 0.38, 480);

  return (
    <section 
  id="projects" 
  className="relative w-full h-screen bg-[#45daea] text-slate-950 overflow-hidden flex !flex-col-reverse md:!flex-row !items-stretch !justify-start !p-0 select-none"
>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#45daea]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      <div 
        ref={deckRef}
        className="relative w-full md:w-[55%] h-[55%] md:h-full flex items-center justify-start z-10 cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ perspective: '1200px' }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {projects.map((project, index) => {
            const relativeOffset = index - scrollProgress;
            const angularStepDeg = isMobile ? 24 : 18; 
            const angleDeg = relativeOffset * angularStepDeg;

            const distance = Math.abs(relativeOffset);
            const isSelected = activeIndex === index;
            
            const opacity = Math.max(0, 1 - distance * 0.4);
            const scale = Math.max(0.7, 1 - distance * 0.08);
            const zIndex = 100 - Math.round(distance * 10);

            const localRotateZ = -angleDeg * 0.15;
            const localRotateY = angleDeg * 0.75; 

            if (opacity <= 0.01) return null;

// --- UPDATED TITLE BLOCK FOR HORIZONTAL TEXT ---
            if (project.type === 'title') {
              return (
                <div
                  key={project.id}
                  className="absolute w-[400px] h-[160px] pointer-events-none transition-all duration-300 ease-out flex items-center justify-center"
                  style={{
                    left: '0px',
                    top: 'calc(50% - 80px)',
                    // Match the rotation origin of your project cards
                    transformOrigin: `calc(0% - ${radius}px) 50%`,
                    // Match the rotation and visual modifiers of the project cards
                    transform: `rotate(${angleDeg}deg)`,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                >
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    // This applies the same 'twist' and 'tilt' as the project cards
                    style={{
                      transform: `scale(${scale}) rotate(${localRotateZ}deg) rotateY(${localRotateY}deg)`,
                    }}
                  >
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter whitespace-nowrap">
                      {project.title}
                    </h2>
                  </div>
                </div>
              );
            }

// ... inside your projects.map function ...

return (
  <div
    key={project.id}
    className="absolute w-[260px] sm:w-[300px] md:w-[450px] h-[160px] pointer-events-none transition-all duration-300 ease-out"
    style={{
      left: '0px',
      top: 'calc(50% - 80px)',
      transformOrigin: `calc(0% - ${radius}px) 50%`,
      transform: `rotate(${angleDeg}deg)`,
      opacity: opacity,
      zIndex: zIndex,
    }}
  >
    <div
      onClick={(e) => {
        e.stopPropagation();
        selectAndFocusProject(index);
      }}
      className={`w-full h-full p-5 md:p-6 rounded-r-2xl rounded-l-none cursor-pointer pointer-events-auto transition-all duration-300 ease-out flex flex-col border-y border-r select-none ${
        isSelected 
          ? 'bg-slate-900/95 border-[#45daea] shadow-[15px_0_35px_rgba(69,218,234,0.25)] ring-1 ring-[#45daea]/30' 
          : 'bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
      }`}
      style={{
        transformOrigin: 'left center',
        transform: `scale(${scale}) rotate(${localRotateZ}deg) rotateY(${localRotateY}deg)`,
      }}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-r transition-all duration-300 ${isSelected ? 'bg-[#45daea] shadow-[2px_0_10px_#45daea]' : 'bg-slate-800'}`} />

      {/* DYNAMIC CONTENT SWITCH */}
      {project.type === 'skill' ? (
        // SKILL CARD: Text Left, Icon Right, Centered Vertically
        <div className="flex items-center justify-between h-full">
          <h3 className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
            {project.title}
          </h3>
          <i className={`text-4xl ${project.icon}`} />
        </div>
      ) : (
        // PROJECT CARD: Default Header/Number Layout
        <>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[9px] font-bold uppercase tracking-widest ${isSelected ? 'text-[#45daea]' : 'text-slate-500'}`}>
              0{index + 1} &mdash; Project
            </span>
          </div>
          <h3 className={`text-base md:text-lg font-bold transition-colors ${isSelected ? 'text-white' : 'text-slate-300'}`}>
            {project.title}
          </h3>
        </>
      )}
    </div>
  </div>
);
          })}
        </div>
      </div>

      <div className="w-full md:w-[45%] h-[45%] md:h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 z-10 py-6 md:py-0 overflow-y-auto border-b md:border-b-0 border-white/5 bg-slate-950/10 backdrop-blur-md">
        <div className="space-y-4 md:space-y-6 max-w-lg">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-2xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">{projects[activeIndex].title}</h2>
          </div>
          <p className="text-slate-300 text-xs md:text-base leading-relaxed">{projects[activeIndex].description}</p>
        </div>
      </div>
    </section>
  );
}