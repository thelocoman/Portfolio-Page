import { RawSkill, DeckItem } from '../types/skills.types';


// Category-specific skill inventories
export const FRONTEND_SKILLS: RawSkill[] = [
  { name: 'HTML', icon: 'devicon-html5-plain colored', description: '4 years of hands-on experience writing clean, semantic markup. I build accessible, SEO-friendly structures instinctively, from simple landing pages to complex, component-driven layouts, and understand how HTML underpins everything else in a project.' },
  { name: 'CSS', icon: 'devicon-css3-plain colored', description: 'Confident styling complex, responsive interfaces with maintainable architecture. Comfortable with animations, transitions, and modern layout systems like Flexbox and Grid. I write CSS that scales across larger codebases without turning into spaghetti.' },
  { name: 'Next.js', icon: 'devicon-nextjs-original-wordmark', description: 'Solid grasp of the language beyond the basics. I understand async patterns, closures, performance considerations, and common design patterns. I write JavaScript that\'s both functional and maintainable, and I\'m comfortable debugging tricky, real-world edge cases.' },
];

export const BACKEND_SKILLS: RawSkill[] = [
  { name: 'NodeJS', icon: 'devicon-nodejs-plain colored', description: 'Comfortable building and structuring REST APIs with Node.js, handling middleware, authentication, and database integration. Still growing my depth on large-scale architecture, but confident shipping backend features independently.' },
  { name: 'NestJS', icon: 'devicon-nestjs-original colored', description: 'Familiar with structuring scalable backend applications using Nest.js, including modules, controllers, services, and dependency injection. Comfortable building and maintaining well-organized APIs following the framework\'s architectural patterns.' },
];

export const DATABASE_SKILLS: RawSkill[] = [
  { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', description: 'Experienced with CRUD operations and aggregation pipelines for working with document-based data. Comfortable integrating MongoDB into full-stack applications and structuring collections to fit real-world use cases.' },
  { name: 'PostgreSQL', icon: 'devicon-[#336791]-plain colored', description: 'Comfortable designing relational schemas, writing joins, and working with indexes for efficient queries. I understand how to structure data relationships properly and can troubleshoot common performance issues as they come up.' },
];

export const DEVOPS_SKILLS: RawSkill[] = [
  { name: 'AWS', icon: 'devicon-amazonwebservices-plain colored', description: 'Hands-on experience across Route 53, CloudFront, S3, EC2, Lambda, and EKS, covering DNS, CDN setup, compute, storage, serverless functions, and container orchestration. Comfortable deploying and managing real-world infrastructure, with growing depth in Kubernetes-based workflows.' },
];

export const ARCHITECTURE_SKILLS: RawSkill[] = [
  { name: 'Software Testing', icon: 'fas fa-vial', description: 'Experienced in writing Unit, Integration, and E2E tests using frameworks like Jest and Playwright to guarantee code reliability and safe refactoring.' },
  { name: 'SOLID Principles', icon: 'fas fa-cubes', description: 'Applying Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion to build modular, decoupled systems.' },
  { name: 'Design Patterns', icon: 'fas fa-sitemap', description: 'Implementing battle-tested creational, structural, and behavioral patterns (e.g., Factory, Singleton, Strategy, Observer) to solve recurrent software design challenges.' },
];


/* Aggregates category arrays and converts them into a polymorphic list (`DeckItem[]`) consumed by the 3D skill orbit section. */

export const SKILLS_DECK_DATA: DeckItem[] = [
  {
    id: 'title-main',
    type: 'title',
    title: 'MY FULL-STACK TECHNICAL SKILLS',
    description: "I believe software is the engine behind building something truly massive. That's why I've spent the last 4 years going deep across the full stack, from front-end to back-end, databases, and DevOps, all built on solid architecture and engineering principles. Wanting to also back that hands-on experience with formal proof, I'm now pursuing a Bachelor's of Science in Computer Science at the University of the People.",
  },
  { id: 'sub-frontend', type: 'subtitle', title: 'Frontend Skills' },
  ...FRONTEND_SKILLS.map((s, i): DeckItem => ({ id: `fe-skill-${i}`, type: 'skill', title: s.name, icon: s.icon, description: s.description })),

  { id: 'sub-backend', type: 'subtitle', title: 'Backend Skills' },
  ...BACKEND_SKILLS.map((s, i): DeckItem => ({ id: `be-skill-${i}`, type: 'skill', title: s.name, icon: s.icon, description: s.description })),

  { id: 'sub-db', type: 'subtitle', title: 'Database Skills' },
  ...DATABASE_SKILLS.map((s, i): DeckItem => ({ id: `db-skill-${i}`, type: 'skill', title: s.name, icon: s.icon, description: s.description })),

  { id: 'sub-devops', type: 'subtitle', title: 'DevOps & Cloud' },
  ...DEVOPS_SKILLS.map((s, i): DeckItem => ({ id: `devops-skill-${i}`, type: 'skill', title: s.name, icon: s.icon, description: s.description })),

  { id: 'sub-architecture', type: 'subtitle', title: 'Architecture & Engineering' },
  ...ARCHITECTURE_SKILLS.map((s, i): DeckItem => ({ id: `architecture-skill-${i}`, type: 'skill', title: s.name, icon: s.icon, description: s.description })),
];