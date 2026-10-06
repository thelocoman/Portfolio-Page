'use client';

import { useState, useEffect } from 'react';
import type { HeroProps } from '@/types/hero.types';

/* Hero Section Component. Single Responsibility: Displays hero greeting card, animated brand title, interactive 3D rotation, typewriter tagline, and scroll direction cue. */
export default function HeroSection({
  firstName = 'TIBOR',
  lastName = 'LOVASZ',
  tagline = '- THE TRILLION-DOLLAR AMBITION EXECUTED THROUGH CLEAN CODE AND ENDURING BUSINESS PRINCIPLES -',
  backgroundImage = '/back-3.png',
  typingSpeedMs = 40,
}: HeroProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  
  const [spinFirst, setSpinFirst] = useState(false);
  const [spinLast, setSpinLast] = useState(false);
  const [spinTagline, setSpinTagline] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    let index = 0;
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < tagline.length) {
          setDisplayedText(tagline.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTypingDone(true);
        }
      }, typingSpeedMs);

      return () => clearInterval(interval);
    }, 900);

    return () => clearTimeout(initialDelay);
  }, [tagline, typingSpeedMs]);

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen bg-top bg-no-repeat bg-cover flex items-center justify-center [perspective:1200px] overflow-hidden"
      style={{ 
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: '100% 100%' 
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white min-w-[35%]">
        
        <h1 className="sr-only">
          {firstName} {lastName}
        </h1>

        {/* First Name Card */}
        <div 
          className="absolute [transform-style:preserve-3d] [perspective:1200px] pointer-events-auto top-[-160px] left-0 ml-[-90%] w-max mt-[-100px] rounded-[50px] cursor-pointer"
          onMouseEnter={() => setSpinFirst(true)}
        >
          <span 
            aria-hidden="true"
            onAnimationEnd={() => setSpinFirst(false)}
            className={`block backdrop-blur-[3px] rounded-[50px] px-[50px] rounded-full border-r border-b border-black/20 text-[clamp(2.5rem,7vw,6rem)] font-sans font-bold text-black tracking-normal select-none relative [backface-visibility:hidden] [transform-origin:center_center] [transform:rotateY(0deg)_translateZ(1px)] [transform-style:preserve-3d] ${
              spinFirst ? 'animate-spin-once' : ''
            }`}
            style={{ textShadow: '0 0 2px white, 0 0 2px white, 0 0 2px white' }}
          >
            {firstName}
          </span>
        </div>

        {/* Last Name Card */}
        <div 
          className="absolute [transform-style:preserve-3d] [perspective:1200px] pointer-events-auto top-0 left-0 ml-[-30%] w-max mt-[-100px] rounded-full cursor-pointer"
          onMouseEnter={() => setSpinLast(true)}
        >
          <span 
            aria-hidden="true"
            onAnimationEnd={() => setSpinLast(false)}
            className={`block backdrop-blur-[3px] rounded-[50px] px-[50px] border-r border-b border-black/20 text-[clamp(2.5rem,7vw,6rem)] rounded-full font-sans font-bold text-black tracking-normal select-none relative [backface-visibility:hidden] [transform-origin:center_center] [transform:rotateY(0deg)_translateZ(1px)] [transform-style:preserve-3d] ${
              spinLast ? 'animate-spin-once' : ''
            }`}
            style={{ textShadow: '0 0 2px white, 0 0 2px white, 0 0 2px white' }}
          >
            {lastName}
          </span>
        </div>

        {/* Typewriter Tagline Container */}
        <div 
          className="absolute [transform-style:preserve-3d] [perspective:1200px] pointer-events-auto top-[60px] left-[-80%] rounded-[50px] w-[200%] cursor-pointer"
          onMouseEnter={() => setSpinTagline(true)}
        >
          <p 
            id="typewriter" 
            onAnimationEnd={() => setSpinTagline(false)}
            className={`text-white text-center text-[clamp(0.75rem,1.5vw,1.1rem)] font-sans tracking-normal leading-[1.6] max-w-none font-medium whitespace-pre-line overflow-visible border-2 border-[#00000036] rounded-[50px] px-7 py-4  opacity-100 transition-all duration-300 block relative [backface-visibility:hidden] [transform-origin:center_center] [transform:rotateY(0deg)_translateZ(1px)] [transform-style:preserve-3d] ${
              spinTagline ? 'animate-spin-once' : ''
            }`}
            style={{ 
              wordSpacing: '5px',
              backdropFilter: 'blur(100px)',
              WebkitBackdropFilter: 'blur(100px)'
            }}
          >
            {displayedText}
          </p>
        </div>

        {/* Scroll Flow Cue Indicator */}
        <div 
          className={`absolute bottom-[-350px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 m-[40px_auto_0] transition-opacity duration-1000 ${
            isTypingDone ? 'opacity-100 animate-fade-in [animation-delay:2s]' : 'opacity-0'
          }`}
        >
          <div className="w-[30px] h-[30px] border-4 border-white rounded-full" />
          <div className="w-1 h-[60px] bg-white rounded-[2px] animate-scroll-flow" />
        </div>

      </div>
    </section>
  );
}