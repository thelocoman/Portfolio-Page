import React from 'react';
import { DeckItem } from '../../types/skills.types';

interface SkillDetailPanelProps {
  activeItem?: DeckItem;
}

/* Side panel displaying titles and extended descriptions for the currently focused item in the skill deck. */
export function SkillDetailPanel({ activeItem }: SkillDetailPanelProps) {
  if (!activeItem) return null;

  return (
    <div className="w-full md:w-[46%] h-[45%] md:h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 z-10 py-6 md:py-0 overflow-y-auto border-b md:border-b-0 border-white/5 bg-slate-950/10 backdrop-blur-md">
      <div className="space-y-4 md:space-y-6 max-w-lg">
        <div className="space-y-1 md:space-y-2">
          <h2 className="text-2xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            {activeItem.title}
          </h2>
        </div>
        <p className="text-slate-300 text-xs md:text-base leading-relaxed">
          {activeItem.description}
        </p>
      </div>
    </div>
  );
}