import { ContactAction } from '@/types/contact.types';

interface CentralHubProps {
  action: ContactAction;
}

/*Central Hub Circle Component. Single Responsibility: Displays description and metadata for currently selected contact action. */
export function CentralHub({ action }: CentralHubProps) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${action.gradientStops.start}, ${action.gradientStops.end})`,
      }}
      className="z-30 border-[1px] border-black/40 rounded-full w-[220px] h-[220px] flex flex-col items-center justify-center shadow-2xl p-6 text-center transition-all duration-500 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      <div className="relative z-10 flex flex-col items-center justify-center text-white">
        <div className="mb-2 scale-125 drop-shadow-md">{action.icon}</div>
        <span className="text-sm font-black uppercase tracking-wider drop-shadow-sm">
          {action.label}
        </span>
        <span className="text-xs text-white/90 font-medium leading-tight px-2 my-2 drop-shadow-sm">
          {action.description}
        </span>
      </div>
    </div>
  );
}