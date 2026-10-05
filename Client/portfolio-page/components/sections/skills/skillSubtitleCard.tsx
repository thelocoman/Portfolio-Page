import { SubtitleDeckItem } from '../../../types/skills.types';

interface SkillSubtitleCardProps {
  item: SubtitleDeckItem;
  angleDeg: number;
  opacity: number;
  scale: number;
  zIndex: number;
  localRotateZ: number;
  localRotateY: number;
  radius: number;
}

/* Renders category divider cards (subtitles) along the orbital 3D deck path. Features a category label and a fading horizontal rule divider. */
export function SkillSubtitleCard({
  item,
  angleDeg,
  opacity,
  scale,
  zIndex,
  localRotateZ,
  localRotateY,
  radius,
}: SkillSubtitleCardProps) {
  // Optimization: skip rendering off-screen or invisible cards
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute w-[320px] sm:w-[480px] md:w-[650px] h-[120px] pointer-events-none transition-all duration-300 ease-out flex items-center justify-start"
      style={{
        left: '0px',
        top: 'calc(50% - 60px)',
        transformOrigin: `calc(0% - ${radius}px) 50%`,
        transform: `rotate(${angleDeg}deg)`,
        opacity,
        zIndex,
      }}
    >
      {/* Outer 3D transform container matching the local orbit trajectory */}
      <div
        className="w-full flex items-center gap-4 pr-2"
        style={{
          transform: `scale(${scale}) rotate(${localRotateZ}deg) rotateY(${localRotateY}deg)`,
        }}
      >
        {/* Category section heading */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white uppercase tracking-wider whitespace-nowrap">
          {item.title}
        </h3>
        
        {/* Decorative horizontal gradient rule separating categories */}
        <div className="flex-1 h-[2px] bg-gradient-to-r from-white via-white/80 to-transparent rounded-full" />
      </div>
    </div>
  );
}