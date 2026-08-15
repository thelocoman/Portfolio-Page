'use client';

import { useRef } from 'react';
import Hero from './hero';
import About from './about';
import Skills from './skills';
import Contact from './contact';
import Footer from './footer';
import Projects from './projects'

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollContainerRef} className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory"
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