import { Project } from '@/types/projects.types';

interface ProjectPreviewProps {
  project: Project;
}

/* Project Detail Preview Box. Single Responsibility: Displays active project video preview, title, description text, and external action links. */
export function ProjectPreview({ project }: ProjectPreviewProps) {
  return (
    <div className="w-full md:w-[45%] md:basis-[65%] h-[45%] md:h-full flex flex-col justify-between z-10 overflow-y-auto border-b md:border-b-0 border-black/5 bg-slate-950/10 backdrop-blur-sm md:backdrop-blur-none">
      <div className="border-none group relative w-full h-[50vh] flex-shrink-0 overflow-hidden border-2 border-black/60 ring-1 ring-[#45daea]/30 shadow-[0_0_25px_rgba(69,218,234,0.2)] bg-neutral-900 hidden sm:block">
        <video
          key={project.videoSrc}
          src={project.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="flex-1 min-h-0 w-full px-6 md:px-12 py-6 flex flex-col justify-between overflow-hidden">
        <div className="flex-shrink-0 pb-3">
          <h2 className="text-2xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            {project.title}
          </h2>
        </div>

        <div className="relative flex-1 min-h-0 my-2">
          <div className="h-full overflow-y-auto pr-3 pb-8 text-slate-300 text-xs md:text-sm leading-relaxed custom-scrollbar space-y-4">
            {project.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-3 h-8 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />
        </div>

        <div className="flex-shrink-0 pt-3 flex items-center gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 md:px-6 md:py-3 bg-[#45daea] text-slate-950 text-xs md:text-sm font-bold rounded-xl shadow-[0_4px_20px_rgba(69,218,234,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all inline-block text-center"
          >
            See Website
          </a>

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 md:px-5 md:py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs md:text-sm font-medium transition-all"
            >
              See Source Code
            </a>
          ) : (
            <span className="px-4 py-2.5 md:px-5 md:py-3 text-slate-500 text-xs md:text-sm italic border border-dashed border-white/5 rounded-xl">
              Proprietary Code
            </span>
          )}
        </div>
      </div>
    </div>
  );
}