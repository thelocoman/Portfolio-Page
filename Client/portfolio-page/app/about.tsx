'use client';

import { useEffect, useState, useRef, RefObject } from 'react';

interface AboutProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function About({ containerRef }: AboutProps) {
  const [transformX, setTransformX] = useState(100);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Extract the element directly inside the effect
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const containerHeight = scrollContainer.clientHeight;
      
      // Exact alignment math from original template
      const triggerPoint = containerHeight * 1;
      let progress = 1 - rect.top / triggerPoint;
      progress = progress / 0.923;
      progress = Math.min(Math.max(progress, 0), 1);
      
      const translateX = (1 - progress) * 100;
      setTransformX(translateX);
    };

    // Attach to the container
    scrollContainer.addEventListener('scroll', handleScroll);
    
    // Initial evaluation trigger
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
    // CRITICAL: Depend explicitly on the DOM element's existence, not the ref wrapper object
  }, [containerRef.current]);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="bg-[#1e40af] overflow-hidden !block !justify-unset !align-unset !flex-direction-unset py-20 px-6"
    >
      <div 
        className="bg-black p-12 rounded-[25px] max-w-4xl mx-auto transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translateX(${transformX}%)` }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-white">About Me</h2>
        <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          Hello! My name is Tibor Lovasz I’m a full-stack developer specializing in building and designing exceptional digital experiences. Currently, I’m focused on building accessible, human-centered products and expanding my skills in AI integration. My interest in web development started back when I decided to take control of my learning path, which led to the dynamic world of code. My journey in tech is fueled by a deep passion for learning and problem-solving. This path began with my achievement of a G.E.D. and is driven by my long-term aspiration to one day earn a Ph.D. in a field where technology and humanity intersect. I am a firm believer that the best products are built with a strong foundation. That's why I prioritize clean code, robust backend architecture, and a seamless user experience. I am always looking for opportunities to leverage my skills in a challenging and growth-oriented environment. My passion lies in building practical web applications, exploring AI, and deploying scalable solutions. I’m eager to contribute to real-world projects while growing my expertise as a developer.
        </p>
      </div>
    </section>
  );
}