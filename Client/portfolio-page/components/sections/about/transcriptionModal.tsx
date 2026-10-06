'use client';

import { useEffect } from 'react';
import { createPortal as createReactDOMPortal } from 'react-dom';
import type { ContextWindowProps } from '@/types/modal.types';

/* Reusable modal overlay using React Portals to render content on `document.body`. Features backdrop dimming, ESC key handling, and background scroll locking. */
export default function ContextWindow({
  isOpen,
  onClose,
  title = 'Transcript',
  text,
  children,
}: ContextWindowProps) {
  // Bind ESC key listener and disable background scrolling while modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Dialog Content - stop propagation prevents backdrop clicks from firing */}
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl relative flex flex-col gap-4 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 id="modal-title" className="text-xl font-semibold text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors text-lg"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Main Body Area */}
        <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[60vh]">
          {text || children || 'No content available.'}
        </div>
      </div>
    </div>
  );

  // SSR check to ensure window exists before portaling
  if (typeof window === 'undefined') return null;
  return createReactDOMPortal(modalContent, document.body);
}