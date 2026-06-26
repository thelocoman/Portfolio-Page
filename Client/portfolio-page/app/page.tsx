'use client';

import { useRef } from 'react';
import Hero from './hero';
import About from './about';
import Skills from './skills';
import Projects from './projects';
import Contact from './contact';
import Footer from './footer';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={scrollContainerRef} 
      className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory"
    >
      <Hero />
      <About containerRef={scrollContainerRef} />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}