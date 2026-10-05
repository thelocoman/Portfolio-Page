import { Ripple } from '../../../hooks/useRippleEffect';

interface RippleBackgroundProps {
  ripples: Ripple[];
  onRippleEnd: (id: number) => void;
}

/* Renders expanding water-ripple animations in the background. Triggered dynamically via user actions or automated events. */
export function RippleBackground({ ripples, onRippleEnd }: RippleBackgroundProps) {
  return (
    <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
      {/* Injected CSS keyframe for radial wave expansion */}
      <style>{`
        @keyframes waveExpand {
          0% {
            width: 0px;
            height: 0px;
            transform: translate(-50%, -50%);
            opacity: 0.85;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            width: 2500px;
            height: 2500px;
            transform: translate(-50%, -50%);
            opacity: 0;
          }
        }
        .animate-wave-expand {
          animation: waveExpand 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
      
      {/* Map active ripple objects into expanding gradient circles */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            background: `radial-gradient(circle, ${ripple.colorStart} 0%, ${ripple.colorEnd} 100%)`,
          }}
          className="absolute top-1/2 left-1/2 rounded-full animate-wave-expand"
          onAnimationEnd={() => onRippleEnd(ripple.id)}
        />
      ))}
    </div>
  );
}