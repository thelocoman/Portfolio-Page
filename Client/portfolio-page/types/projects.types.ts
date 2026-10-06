export interface Project {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly tech: readonly string[];
  readonly liveUrl?: string;
  readonly domain?: string;
  readonly repoUrl: string | null;
  readonly videoSrc?: string;
}

export interface OrbitCardMetrics {
  readonly angleDeg: number;
  readonly opacity: number;
  readonly scale: number;
  readonly zIndex: number;
  readonly localRotateZ: number;
  readonly localRotateY: number;
  readonly isSelected: boolean;
}