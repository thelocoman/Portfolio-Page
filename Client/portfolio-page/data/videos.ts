// data/videos.ts
import { VideoData } from '@/types/about.types';
import { video1Transcript } from './transcripts/Video_01_Transcript';
import { video2Transcript } from './transcripts/Video_02_Transcript';


/* Static dataset containing video documentation, key takeaways, YouTube embed URLs, and external transcript file bindings. */

export const VIDEO_DOCUMENTATION: VideoData[] = [
  {
    id: 'video-1',
    slideNumber: '1 / 2',
    summaryTitle: 'Video Summary',
    summaryDescription:
      'In this video, I share my personal journey and ultimate mission to build the world’s most valuable company. Along the way, I break down three core reasons why setting massive ambitions is essential for fulfilling your full potential:',
    keyPoints: [
      {
        title: 'Drives Innovation & Flexibility:',
        description:
          'Extreme goals force rapid self-refinement and adaptive thinking, which historically powers major breakthrough societal progress for future generations.',
      },
      {
        title: 'Forces Collaboration:',
        description:
          'Truly massive tasks can never be accomplished alone, compelling you to build strong organizations, delegate effectively, and leverage other people\'s brilliant ideas.',
      },
      {
        title: 'Fuel & Long-Term Thinking:',
        description:
          'High ambition provides endless energy, deep patience, and clarity, elevating your decision-making and quality of life across family, health, and finances.',
      },
    ],
    youtubeEmbedUrl: 'https://www.youtube.com/embed/gBMXYz55JHs',
    transcriptTitle: 'Transcript - Video 1',
    transcriptText: video1Transcript,
  },
  {
    id: 'video-2',
    slideNumber: '2 / 2',
    summaryTitle: 'Video Summary',
    summaryDescription:
      'In this video, I share my strategy for building the world’s most valuable company and becoming the richest person on Earth, breaking down a complex vision into four core execution pillars:',
    keyPoints: [
      {
        title: 'Time Constraints:',
        description:
          'We are mortal beings and have to execute the strategy within a limited time frame.',
      },
      {
        title: 'Physical Expansion:',
        description:
          'The direct, tangible layer of wealth creation that accounts for actual material assets and physical products.',
      },
      {
        title: 'Linguistic Expansion:',
        description:
          'The abstract layer needed to account for dynamic concepts like money, digital transactions, debt, and future commitments.',
      },
      {
        title: 'People & Systems:',
        description:
          'Real wealth requires connection; operating in isolation makes scaling impossible without aligning with other people.',
      },
    ],
    youtubeEmbedUrl: 'https://www.youtube.com/embed/7yX5TcguFIE',
    transcriptTitle: 'Transcript - Video 2',
    transcriptText: video2Transcript,
  },
];