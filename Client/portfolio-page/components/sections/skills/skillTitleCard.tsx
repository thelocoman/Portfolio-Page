import { TitleDeckItem } from '../../../types/skills.types';

interface SkillTitleCardProps {
  item: TitleDeckItem;
  distance: number;
  scale: number;
  zIndex: number;
}

/* Renders the primary centerpiece title card for the skill deck. Applies a aggressive fade distance curve so it vanishes quickly as scrolling begins. */
export function SkillTitleCard({ item, distance, scale, zIndex }: SkillTitleCardProps) {
  // Accelerated opacity roll-off (fades out twice as fast as standard cards)
  const fastOpacity = Math.max(0, 1 - distance * 2.0);

  // Early return when completely faded out
  if (fastOpacity <= 0) return null;

  return (
    <div
      className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none transition-opacity duration-200 ease-out flex items-center justify-center px-6"
      style={{
        opacity: fastOpacity,
        zIndex,
      }}
    >
      {/* Scaled centerpiece text wrapper */}
      <div
        className="w-full flex items-center justify-center text-center"
        style={{ transform: `scale(${scale})` }}
      >
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-lg leading-tight text-center">
          {item.title}
        </h2>
      </div>
    </div>
  );
}