import { SkillDeckItem } from '../../../types/skills.types';
import { calculateLeftOrbitMetrics } from '../../../utils/orbitGeometry';

interface SkillCardProps {
  item: SkillDeckItem;
  index: number;
  scrollProgress: number;
  activeIndex: number;
  radius: number;
  isMobile: boolean;
  onSelect: (index: number) => void;
}

/* Renders an individual interactive skill item card positioned along an orbital 3D curve. */
export function SkillCard({
  item,
  index,
  scrollProgress,
  activeIndex,
  radius,
  isMobile,
  onSelect,
}: SkillCardProps) {
  // Compute spatial trajectory, rotation, scale, and visibility metrics
  const metrics = calculateLeftOrbitMetrics(index, scrollProgress, activeIndex, isMobile);

  // Early return optimization for out-of-view items
  if (metrics.opacity <= 0.01) return null;

  return (
    <div
      className="absolute w-[260px] sm:w-[300px] md:w-[450px] h-[160px] pointer-events-none transition-all duration-300 ease-out"
      style={{
        left: '0px',
        top: 'calc(50% - 80px)',
        transformOrigin: `calc(0% - ${radius}px) 50%`,
        transform: `rotate(${metrics.angleDeg}deg)`,
        opacity: metrics.opacity,
        zIndex: metrics.zIndex,
      }}
    >
      {/* Interactive inner card element receiving selection events */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
        className={`w-full h-full p-5 md:p-6 rounded-r-2xl rounded-l-none cursor-pointer pointer-events-auto transition-all duration-300 ease-out flex flex-col border-y border-r select-none ${
          metrics.isSelected
            ? 'bg-slate-900/95 border-[#45daea] shadow-[15px_0_35px_rgba(69,218,234,0.25)] ring-1 ring-[#45daea]/30'
            : 'bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
        }`}
        style={{
          transformOrigin: 'left center',
          transform: `scale(${metrics.scale}) rotate(${metrics.localRotateZ}deg) rotateY(${metrics.localRotateY}deg)`,
        }}
      >
        {/* Highlight accent bar on selected active item */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-r transition-all duration-300 ${
            metrics.isSelected ? 'bg-[#45daea] shadow-[2px_0_10px_#45daea]' : 'bg-slate-800'
          }`}
        />

        <div className="flex items-center justify-between h-full">
          <h3 className={`text-lg font-bold ${metrics.isSelected ? 'text-white' : 'text-slate-300'}`}>
            {item.title}
          </h3>
          <i className={`text-4xl text-white ${item.icon}`} />
        </div>
      </div>
    </div>
  );
}