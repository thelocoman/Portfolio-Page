'use client';

import { useEffect, useState, useRef, RefObject } from 'react';
import ContextWindow from './box_popup';
import {video1Transcript} from '../Video_01 Transcript.ts'
import {video2Transcript} from '../Video_02 Transcript.ts'

interface AboutProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

// Define distinct text data for each slide
const TRANSCRIPTS = [
  {
    title: 'Transcript - Video 1',
    text: video1Transcript,
  },
  {
    title: 'Transcript - Video 2',
    text: video2Transcript,
  },
];

export default function About({ containerRef }: AboutProps) {
  const [transformX, setTransformX] = useState(100);
  const [currentSlide, setCurrentSlide] = useState(0); // 0 = Video 1, 1 = Video 2

  // State to manage modal content and visibility
  const [activeTranscript, setActiveTranscript] = useState<{
    title: string;
    text: string;
  } | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const containerHeight = scrollContainer.clientHeight;

      const triggerPoint = containerHeight * 1;
      let progress = 1 - rect.top / triggerPoint;
      progress = progress / 0.923;
      progress = Math.min(Math.max(progress, 0), 1);

      const translateX = (1 - progress) * 100;
      setTransformX(translateX);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef.current]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#1e40af] overflow-hidden !block !justify-unset !align-unset !flex-direction-unset py-20 px-6"
    >
      <div
        className="min-w-full bg-black bg-slate-950/60 h-full p-8 md:p-12 rounded-[25px] max-w-4xl mx-auto transition-transform duration-100 ease-out will-change-transform relative group"
        style={{ transform: `translateX(${transformX}%)` }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-white">
          The Trillion Dollar Journey Video Documentation
        </h2>

        {/* Carousel Window */}
        <div className="overflow-hidden relative w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Page 1 (Slide index 0) */}
            <div className="w-full shrink-0 px-4 flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold mb-8 text-center text-white">1 / 2</h2>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-5xl mx-auto">
                <div className="w-full md:w-1/2 text-left space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-semibold text-blue-400 whitespace-nowrap"> Video Summary</h3>
                    <button onClick={() => setActiveTranscript(TRANSCRIPTS[0])} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0">Open Video Transcript</button>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed">
                    In this video document, I lay down the foundational philosophy behind my long-term vision.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 text-base pl-2">
                    <li><span className="font-semibold text-white">Flexibility:</span> Massively ambitious targets force rapid mental and structural innovation.</li>
                    <li><span className="font-semibold text-white">Collaboration:</span> Grand goals make isolation impossible, forcing unity and delegating complex parts.</li>
                    <li><span className="font-semibold text-white">Unlimited Fuel:</span> Playing the long-term game breeds immense patience and absolute focus.</li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-full max-w-xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/gBMXYz55JHs"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Page 2 (Slide index 1) */}
            <div className="w-full shrink-0 px-4 flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold mb-8 text-center text-white">2 / 2</h2>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-5xl mx-auto">
                <div className="w-full md:w-1/2 text-left space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-semibold text-blue-400 whitespace-nowrap"> Video Summary</h3>
                    <button onClick={() => setActiveTranscript(TRANSCRIPTS[1])} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0" > Open Video Transcript</button>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed">
                    In this second video document, I discuss scaling architecture and milestones.
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 text-base pl-2">
                    <li><span className="font-semibold text-white">Execution:</span> Turning abstract ambitions into clean, deployable full-stack tools.</li>
                    <li><span className="font-semibold text-white">Projections:</span> Tracking technical metrics alongside systemic platform growth.</li>
                    <li><span className="font-semibold text-white">Consistency:</span> Maintaining execution speed across multi-year cycles.</li>
                  </ul>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-full max-w-xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/gBMXYz55JHs"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm hidden group-hover:block"
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm hidden group-hover:block"
          aria-label="Next slide"
        >
          &#10095;
        </button>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-6">
          <button
            onClick={() => setCurrentSlide(0)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === 0 ? 'w-8 bg-blue-500' : 'w-3 bg-gray-600'
            }`}
            aria-label="Go to slide 1"
          />
          <button
            onClick={() => setCurrentSlide(1)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === 1 ? 'w-8 bg-blue-500' : 'w-3 bg-gray-600'
            }`}
            aria-label="Go to slide 2"
          />
        </div>

        {/* Shared Context Window Modal rendered at root level of section component */}
        <ContextWindow
          isOpen={!!activeTranscript}
          onClose={() => setActiveTranscript(null)}
          title={activeTranscript?.title}
          text={activeTranscript?.text}
        />
      </div>
    </section>
  );
}