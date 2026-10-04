'use client';

import { VideoData } from '@/types/about.types';

interface VideoSlideProps {
  video: VideoData;
  onOpenTranscript: (title: string, text: string) => void;
}

/* Displays a single video item within a section, featuring textual bullet points on the left and an embedded YouTube iframe on the right. */
export default function VideoSlide({ video, onOpenTranscript }: VideoSlideProps) {
  return (
    <div className="w-full shrink-0 flex flex-col items-center justify-center">
      {/* Slide index/number display */}
      <h3 className="text-4xl font-bold mb-8 text-center text-white">
        {video.slideNumber}
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-5xl mx-auto">
        
        {/* Left Column: Video Summary and Key Bullet Points */}
        <div className="w-full md:w-1/2 text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h4 className="text-2xl font-semibold text-blue-400 whitespace-nowrap">
              {video.summaryTitle}
            </h4>
            {/* Modal trigger button for video transcript */}
            <button
              onClick={() => onOpenTranscript(video.transcriptTitle, video.transcriptText)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Open Video Transcript
            </button>
          </div>

          <p className="text-gray-300 text-base leading-relaxed">
            {video.summaryDescription}
          </p>

          <ul className="list-disc list-inside text-gray-300 space-y-2 text-base pl-2">
            {video.keyPoints.map((point, index) => (
              <li key={index}>
                <span className="font-semibold text-white">{point.title} </span>
                {point.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Embedded YouTube Video Player */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <iframe
              className="w-full h-full"
              src={video.youtubeEmbedUrl}
              title={`${video.summaryTitle} Player`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </div>
  );
}