import type { RefObject } from 'react';

export interface AboutProps {
  readonly containerRef: RefObject<HTMLDivElement | null> ;
}

export interface VideoKeyPoint {
  readonly title: string;
  readonly description: string;
}

export interface VideoData {
  readonly id: string;
  readonly slideNumber: string;
  readonly summaryTitle: string;
  readonly summaryDescription: string;
  readonly keyPoints: readonly VideoKeyPoint[];
  readonly youtubeEmbedUrl: string;
  readonly transcriptTitle: string;
  readonly transcriptText: string;
}