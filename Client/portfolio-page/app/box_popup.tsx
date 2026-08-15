'use client';

import { ReactNode } from 'react';

interface ContextWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  children?: ReactNode;
}

export default function ContextWindow({
  isOpen,
  onClose,
  title = 'Transcript',
  text,
  children,
}: ContextWindowProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Main Modal Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-[90%] p-6 shadow-2xl relative flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors text-lg"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content Area */}
        <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-96">
          {text || children || 'The text will be displayed here'}
        </div>
      </div>
    </div>
  );
}