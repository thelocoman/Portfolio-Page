import { ContactAction, WheelDimensions } from '@/types/contact.types';
import { calculateSlicePath, calculateSliceCenterCoordinates } from '@/utils/geometry';

interface ActionWheelProps {
  actions: ContactAction[];
  chosenItem: ContactAction;
  dimensions: WheelDimensions;
  onSelectAction: (action: ContactAction) => void;
}

/* Action Wheel SVG Component. Single Responsibility: Renders interactive SVG pie slices for available social & contact channels. */
export function ActionWheel({
  actions,
  chosenItem,
  dimensions,
  onSelectAction,
}: ActionWheelProps) {
  const total = actions.length;

  return (
    <div className="relative w-[510px] h-[510px] flex items-center justify-center filter drop-shadow-2xl">
      <svg
        width={dimensions.wheelSize}
        height={dimensions.wheelSize}
        className="absolute inset-0 z-10 overflow-visible"
      >
        <defs>
          {actions.map((item) => (
            <linearGradient
              key={`grad-${item.id}`}
              id={`slice-grad-${item.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={item.gradientStops.start} />
              <stop offset="100%" stopColor={item.gradientStops.end} />
            </linearGradient>
          ))}
        </defs>

        {actions.map((item, index) => {
          const isChosen = chosenItem.id === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              target={item.href.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onMouseEnter={() => onSelectAction(item)}
              onFocus={() => onSelectAction(item)}
              aria-label={item.label}
              className="focus:outline-none"
            >
              <path
                d={calculateSlicePath(index, total, dimensions)}
                fill={`url(#slice-grad-${item.id})`}
                className={`transition-all duration-200 cursor-pointer ${
                  isChosen
                    ? 'stroke-white stroke-[2.5px] opacity-100 z-20'
                    : 'stroke-black/40 stroke-[1px] opacity-90 hover:opacity-100 hover:stroke-white hover:stroke-[2px]'
                }`}
              />
            </a>
          );
        })}
      </svg>

      {/* Slices Overlay Icons & Labels */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {actions.map((item, index) => {
          const { x, y } = calculateSliceCenterCoordinates(index, total, dimensions);
          const isChosen = chosenItem.id === item.id;

          return (
            <div
              key={item.id}
              style={{ left: `${x}px`, top: `${y}px` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-200 ${
                isChosen
                  ? 'text-white font-bold drop-shadow-lg scale-110'
                  : 'text-white/90'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-black uppercase tracking-wider mt-0.5 drop-shadow-md">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}