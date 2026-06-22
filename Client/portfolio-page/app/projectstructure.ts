export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  repoUrl: string | null;
  imagesrc: string;
}

export const projectsData: Project[] = [
  {
    id: 0,
    title: "Personal Finance Tool",
    description: "A personal development financial tool, that helps users to set goals, plan financial transactions, collaborate all in one comprehensive and intuitive space",
    tech: ["HTML", "CSS", "JS", "AWS", "Express", "NodeJS", "PostgreSQL"],
    liveUrl: "https://www.billionairelife.online/?v=0.0.2",
    repoUrl: null,
    imagesrc: "/BillionaireLife.png",
  },    
  {
    id: 1,
    title: "Authentication",
    description: "A full-stack application demonstrating secure user authentication and session management using OAuth 2.0.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "OAuth 2.0"],
    liveUrl: "https://peopleflow.online/",
    repoUrl: "https://github.com/thelocoman/People-Flow",
    imagesrc: "/Authentication.png",
  },
  {
    id: 2,
    title: "Minimalistic Portfolio",
    description: "This minimalistic portfolio website, built with HTML, CSS and JavaScript. Deployed with Amazon S3 static hosting, migrated domain to AWS Route 53, set up CloudFront distribution, and configured IAM for secure access.",
    tech: ["HTML", "CSS", "JS", "AWS"],
    liveUrl: "#",
    repoUrl: "https://github.com/thelocoman/Portfolio-Page",
    imagesrc: "/Portfolio_Page.png",
  },
  {
    id: 3,
    title: "AI-Powered Content Summarizer (In-Progress)",
    description: "An intelligent web app that uses an external AI API to summarize long articles or text inputs.",
    tech: ["JavaScript", "Node.js", "EJS", "AI API"],
    liveUrl: "#",
    repoUrl: "https://github.com/thelocoman/Portfolio-Page",
    imagesrc: "/In_Progress.png",
    
  },
  {
    id: 4,
    title: "E-commerce Backend (In-Progress)",
    description: "A RESTful API for an e-commerce platform with endpoints for products, users, and orders.",
    tech: ["Node.js", "Express", "PostgreSQL", "REST API"],
    liveUrl: "#",
    repoUrl: "https://github.com/thelocoman/Portfolio-Page",
    imagesrc: "/In_Progress.png",
  },
];