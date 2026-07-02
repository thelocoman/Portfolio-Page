import React from 'react';

interface Skill {
  name: string;
  icon: string;
  hasHoverEffect?: boolean;
}

const skills: Skill[] = [
  { name: 'HTML', icon: 'devicon-html5-plain colored' },
  { name: 'CSS', icon: 'devicon-css3-plain colored' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { name: 'NodeJS', icon: 'devicon-nodejs-plain colored' },
  { name: 'Express', icon: 'devicon-express-original', hasHoverEffect: true },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
  { name: 'AWS', icon: 'devicon-amazonwebservices-plain colored' },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#1e40af] to-[#45daea] py-16 px-5">
      <h2 className="text-4xl font-bold mb-[30px] text-center text-white">Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-5 w-full max-w-[1000px]">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={`bg-black text-white rounded-[25px] p-5 text-center transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_6px_15px_rgba(255,255,255,0.5)] group`}
          >
            <i 
              className={`text-4xl mb-2 block transition-colors duration-300 ${skill.icon} ${
                skill.hasHoverEffect ? 'text-white group-hover:text-black group-hover:before:content-["\\e97d"] group-hover:before:color-gradient' : ''
              }`} 
            />
            <p className="font-medium group-hover:text-black transition-colors duration-300">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}