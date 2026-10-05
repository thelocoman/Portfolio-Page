'use client';

import { useRef } from 'react';
import Hero from '../components/sections/hero/hero';
import About from '../components/sections/about/about';
import Contact from '../components/sections/contact/contact';
import Skills from '../components/sections/skills/skills';
import Projects from '../components/sections/projects/projects';
import Footer from '../components/layouts/footer';

/* Primary Home Page Entry Point. Single Responsibility: Assembles individual portfolio section components into a single vertical scroll-snap container view. */
export default function Home() {
  // Reference to the main scrollable viewport container for scroll-aware children for the about page
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory"
    >
      <Hero />
      <About containerRef={scrollContainerRef} />
      <Contact />
      <Skills />
      <Projects />
      <Footer />
    </div>
  );
}