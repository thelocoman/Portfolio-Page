import React from 'react';
import { TECH_ICONS } from '../../../constants/techIcons';

interface TechMarqueeProps {
  tech: string[];
  localRotateY: number;
  localRotateZ: number;
}

/* Renders a continuously scrolling horizontal tech stack marquee transformed in 3D space to match orbit angles. */
export function TechMarquee({ tech, localRotateY, localRotateZ }: TechMarqueeProps) {
  return (
    <div
      className="relative w-full overflow-hidden mt-0 py-1 bg-slate-950/40 rounded-lg border border-white/5"
      style={{
        transform: `rotateY(${-localRotateY}deg) rotateZ(${-localRotateZ}deg)`,
        transformOrigin: 'left center',
      }}
    >
      {/* Side gradient masks for smooth fade-in/fade-out edge effects */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling track (duplicated array ensures seamless looping) */}
      <div
        className="animate-marquee flex items-center gap-2 w-max"
        style={{ animationDuration: `${tech.length * 2.5}s` }}
      >
        {[...tech, ...tech].map((t, idx) => (
          <span
            key={`${t}-${idx}`}
            className="inline-flex items-center gap-1.5 text-[10px] bg-white/5 h-[50px] border border-white/10 px-2 py-0.5 rounded-md text-slate-300 font-medium whitespace-nowrap hover:border-[#45daea]/50 transition-colors"
          >
            <i className={`${TECH_ICONS[t] || 'fas fa-code'} text-xs`} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}