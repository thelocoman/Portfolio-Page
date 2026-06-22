'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [text, setText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  
  const fullText = `- THE TRILLION-DOLLAR AMBITION EXECUTED THROUGH\n<u>CLEAN CODE</u> AND ENDURING <u>BUSINESS PRINCIPLES</u> -`;

  useEffect(() => {
    let currentIndex = 0;
    let buildText = '';

    const typingTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          if (fullText.charAt(currentIndex) === '<') {
            const closingBracketIndex = fullText.indexOf('>', currentIndex);
            if (closingBracketIndex !== -1) {
              buildText += fullText.substring(currentIndex, closingBracketIndex + 1);
              currentIndex = closingBracketIndex + 1;
            }
          } else {
            buildText += fullText.charAt(currentIndex);
            currentIndex++;
          }
          setText(buildText);
        } else {
          clearInterval(interval);
          setIsTypingDone(true);
        }
      }, 40);
      
      return () => clearInterval(interval);
    }, 900);

    return () => clearTimeout(typingTimeout);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const innerElement = e.currentTarget.firstElementChild;
    if (innerElement && !innerElement.classList.contains('animate-spin-once')) {
      innerElement.classList.add('animate-spin-once');
    }
  };

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
    e.currentTarget.classList.remove('animate-spin-once');
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen bg-[url('/back-3.png')] bg-top bg-no-repeat bg-cover flex items-center justify-center [perspective:1200px] overflow-hidden"
      style={{ backgroundSize: '100% 100%' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white min-w-[500px]">
        
        {/* FIRST NAME WRAPPER BOX (TIBOR) */}
        <div 
          className="absolute [transform-style:preserve-3d] [perspective:1200px] pointer-events-auto top-[-160px] left-0 ml-[-90%] w-[600px] mt-[-100px] rounded-[50px] cursor-pointer"
          onMouseEnter={handleMouseEnter}
        >
          <h1 
            className="block backdrop-blur-[3px] rounded-[50px] px-[50px] border-r border-b border-black/20 text-8xl font-sans font-bold text-black tracking-normal select-none relative [backface-visibility:hidden] [transform-origin:center_center] [transform:rotateY(0deg)_translateZ(1px)] [transform-style:preserve-3d]"
            style={{ textShadow: '0 0 2px white, 0 0 2px white, 0 0 2px white' }}
            onAnimationEnd={handleAnimationEnd}
          >
            TIBOR
          </h1>
        </div>

        {/* LAST NAME WRAPPER BOX (LOVASZ) */}
        <div 
          className="absolute [transform-style:preserve-3d] [perspective:1200px] pointer-events-auto top-0 left-0 ml-[-30%] w-[650px] mt-[-100px] rounded-[50px] cursor-pointer"
          onMouseEnter={handleMouseEnter}
        >
          <h1 
            className="block backdrop-blur-[3px] rounded-[50px] px-[50px] border-r border-b border-black/20 text-8xl font-sans font-bold text-black tracking-normal select-none relative [backface-visibility:hidden] [transform-origin:center_center] [transform:rotateY(0deg)_translateZ(1px)] [transform-style:preserve-3d]"
            style={{ textShadow: '0 0 2px white, 0 0 2px white, 0 0 2px white' }}
            onAnimationEnd={handleAnimationEnd}
          >
            LOVASZ
          </h1>
        </div>

        {/* TYPEWRITER TEXT CONTENT FRAME CONTAINER */}
<div 
  className="absolute [transform-style:preserve-3d] [perspective:1200px] pointer-events-auto top-[60px] left-[-400px] rounded-[50px] w-[950px] cursor-pointer"
  onMouseEnter={handleMouseEnter}
>
  <p 
    id="typewriter" 
    className="text-white text-center text-xl font-sans tracking-normal leading-[1.6] max-w-none font-medium whitespace-pre-line overflow-visible border-2 border-[#00000036] rounded-[50px] px-7 pt-0 pb-[65px] h-[1.7rem] opacity-100 transition-all duration-300 block relative [backface-visibility:hidden] [transform-origin:center_center] [transform:rotateY(0deg)_translateZ(1px)] [transform-style:preserve-3d]"
    style={{ 
      wordSpacing: '5px',
      backdropFilter: 'blur(100px)', // Restores the original deep translucent frosted glass effect
      WebkitBackdropFilter: 'blur(100px)' // Direct compatibility fallback for Safari browsers
    }}
    onAnimationEnd={handleAnimationEnd}
    dangerouslySetInnerHTML={{ __html: text }}
  />
</div>

        {/* SCROLL FLOW INDICATOR */}
        <div 
          className={`absolute bottom-[-350px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 m-[40px_auto_0] opacity-0 ${
            isTypingDone ? 'animate-fade-in [animation-delay:2s]' : ''
          }`}
        >
          <div className="w-[30px] h-[30px] border-4 border-white rounded-full" />
          <div className="w-1 h-[60px] bg-white rounded-[2px] animate-scroll-flow" />
        </div>

      </div>
    </section>
  );
}