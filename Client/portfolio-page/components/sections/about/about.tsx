'use client';

import { useEffect, useState, useRef } from 'react';
import ContextWindow from '@/components/sections/about/transcriptionModal';
import VideoSlide from './videoSlide';
import { AboutProps } from '@/types/about.types';
import { VIDEO_DOCUMENTATION } from '@/data/videos';

/* About Section Component. Single Responsibility: Manages horizontal slide animation based on vertical parent scroll, renders video documentation carousel, and handles transcript modal state. */
export default function AboutSection({ containerRef }: AboutProps) {
  const [transformX, setTransformX] = useState(100);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [activeTranscript, setActiveTranscript] = useState<{
    title: string;
    text: string;
  } | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const totalSlides = VIDEO_DOCUMENTATION.length;

  // Calculates entry slide animation progress based on parent container scroll position
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
  }, [containerRef]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#1e40af] overflow-hidden !block py-20 px-6"
    >
      <div
        className="min-w-full bg-slate-950/60 h-full p-8 md:p-12 rounded-[25px] overflow-auto max-w-4xl mx-auto transition-transform duration-100 ease-out will-change-transform relative group"
        style={{ transform: `translateX(${transformX}%)` }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-white">
          The Trillion Dollar Journey Video Documentation
        </h2>

        {/* Carousel Viewport Container */}
        <div className="overflow-hidden relative w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {VIDEO_DOCUMENTATION.map((video) => (
              <VideoSlide
                key={video.id}
                video={video}
                onOpenTranscript={(title, text) =>
                  setActiveTranscript({ title, text })
                }
              />
            ))}
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm hidden group-hover:block"
              aria-label="Previous slide"
            >
              &#10094;
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm hidden group-hover:block"
              aria-label="Next slide"
            >
              &#10095;
            </button>
          </>
        )}

        {/* Carousel Navigation Indicator Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center space-x-3 mt-6">
            {VIDEO_DOCUMENTATION.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'w-8 bg-blue-500' : 'w-3 bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Video Transcript Modal */}
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