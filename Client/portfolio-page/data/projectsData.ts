import { Project } from '../types/projects.types';

/* Static dataset containing portfolio project details, technical stack, live links, repository URLs, and preview video assets. */

export const PROJECTS_DATA: Project[] = [
    {
    id: 1,
    title: "Personal Portfolio",
    description: "This website serves as a living index of my current work: a summary of what I do and a showcase of the skills and projects behind it. Built with Next.js, it combines HTML and CSS for custom animations with JavaScript for interactive behavior. The site is deployed via AWS CloudFront, with DNS managed through Route 53, and ships through an automated CI/CD pipeline in GitHub Actions that pushes changes directly to an S3 bucket. Under the hood, it follows SOLID principles and proper design patterns, and is fully typed with TypeScript and linted with ESLint. It's also backed by automated unit and integration tests using Vitest and Playwright, which run as part of the same CI/CD pipeline.",
    tech: ["HTML", "CSS", "JS", "AWS"],
    liveUrl: "#",
    repoUrl: "https://github.com/thelocoman/Portfolio-Page",
    domain: "www.tiborlovasz.com",
    videoSrc: "/Portfolio_Video.mp4",
  },
  {
    id: 0,
    title: "Personal Resource Manager",
    description: "The Personal Resource Manager is built around a bigger vision: managing the time, resources, and information needed to build a trillion-dollar company. At its core, it tracks time allocation alongside income and expenses, assets and liabilities, projecting both forward and backward across custom time frames. It also manages \"information nodes,\" reusable concepts like a country, a company, or a currency, that connect and contextualize the data across the system. Together, these pieces are designed to help maximize asset and income building while giving structure to the information needed to actually build things. \n\nTechnically, it shares its foundation with my portfolio site: built with Next.js, combining HTML and CSS for custom animations with JavaScript for interactive behavior, and written entirely in TypeScript. It follows SOLID principles and proper design patterns, with automated unit and integration tests using Vitest and Playwright integrated into the CI/CD pipeline. It's deployed via AWS CloudFront, with DNS managed through Route 53, and ships through GitHub Actions to an S3 bucket. Beyond that shared base, it extends into a full backend architecture, using API Gateway and Lambda for serverless compute, DSQL on AWS for data persistence, Cognito for authentication and user management, and Stripe for payment integration.",
    tech: ["HTML", "CSS", "JS", "AWS", "Express", "NodeJS", "PostgreSQL"],
    liveUrl: "https://www.billionairelife.online/?v=0.0.2",
    domain: "www.billionairelife.online",
    repoUrl: null,
    videoSrc: "/TrillionFlow_Video.mp4",
  },    
];