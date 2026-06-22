'use client';

import { useState } from 'react';
import { projectsData, Project } from './projectstructure';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="w-full min-h-screen bg-[#45daea] flex flex-col justify-center items-center py-16 px-5">
      <h2 className="text-4xl font-bold mb-[30px] text-center text-black">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1000px]">
        {projectsData.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-black text-white rounded-[25px] p-[25px] flex flex-col cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:bg-white group"
          >
            {/* Image Container */}
            <div className="h-[180px] mb-5 border border-[#1d2d50] rounded-[4px] flex items-center justify-center overflow-hidden bg-neutral-900">
              <img 
                src={project.imagesrc} 
                alt={project.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if local image doesn't exist yet
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            
            <h3 className="text-xl font-bold mb-2.5 text-white group-hover:text-black transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="text-white group-hover:text-black text-[15px] line-clamp-4 flex-grow text-left leading-[1.5] transition-colors duration-300">
              {project.description}
            </p>
            
            <ul className="flex flex-wrap gap-x-[15px] gap-y-[5px] mt-5 mb-2.5 text-xs text-white group-hover:text-black list-none p-0 transition-colors duration-300">
              {project.tech.map((techItem) => (
                <li key={techItem} className="font-medium">
                  {techItem}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Reconstructed Modal System Layer */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-[#1f2937] text-white p-[30px] rounded-xl max-w-[500px] w-full relative text-center scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()} // Stop modal closure when clicking inner container
          >
            <button 
              className="absolute top-2.5 right-[15px] bg-none border-none text-xl text-[#9ca3af] hover:text-white cursor-pointer"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
            <p className="text-[#e5e7eb] text-sm leading-relaxed mb-6 text-center">{selectedProject.description}</p>
            
            <div className="flex justify-center gap-[10px]">
              <a 
                href={selectedProject.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-black text-white px-5 py-2.5 rounded-md no-underline font-medium hover:bg-white hover:text-black hover:shadow-[0_6px_15px_rgba(255,255,255,0.5)] transition-all duration-300"
              >
                Demo
              </a>
              {selectedProject.repoUrl ? (
                <a 
                  href={selectedProject.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-black text-white px-5 py-2.5 rounded-md no-underline font-medium hover:bg-white hover:text-black hover:shadow-[0_6px_15px_rgba(255,255,255,0.5)] transition-all duration-300"
                >
                  Code
                </a>
              ) : (
                <span className="inline-block bg-black text-white/40 px-5 py-2.5 rounded-md font-medium pointer-events-none select-none border border-white/10">
                  Proprietary Code
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}